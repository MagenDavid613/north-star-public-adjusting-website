// Receives the raw payload() JSON from /field-intake.html on submit and
// creates the matching Contact + Property + Claim records in GHL, linked
// via the same Claimant and Claim History associations used elsewhere.
// The full nested buildings/rooms/components breakdown has no flat home in
// GHL's custom-object fields, so it's stored verbatim (unmodified) in the
// claims object's field_intake_raw_json field.
export const runtime = 'nodejs'

const LOCATION_ID = 'HoTo8e52hgzu8LPoSWxj'
const CLAIMANT_ASSOCIATION_ID = '6aa83fd646c9f1a6b8d3735e' // Contact <-> Claims
const CLAIM_HISTORY_ASSOCIATION_ID = '6aa223c2b2156b05ad5a5981' // Claims <-> Properties
const GHL_BASE = 'https://services.leadconnectorhq.com'

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  }
}

// Claims.peril_type is a fixed SINGLE_OPTIONS field (wind/water/fire/mold/roof/other) —
// confirmed via the object schema — but the form's loss_type is free text from a
// datalist, so it needs mapping rather than a direct pass-through.
function mapPerilType(lossType: string | undefined): string {
  const v = (lossType ?? '').toLowerCase()
  if (v.includes('wind') || v.includes('hurricane')) return 'wind'
  if (v.includes('water') || v.includes('plumbing') || v.includes('flood')) return 'water'
  if (v.includes('fire') || v.includes('smoke')) return 'fire'
  if (v.includes('mold')) return 'mold'
  if (v.includes('roof')) return 'roof'
  return 'other'
}

function splitName(full: string | undefined): { firstName: string; lastName: string } {
  const parts = (full ?? '').trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return { firstName: 'Unknown', lastName: '' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body?.intake) {
    return Response.json({ success: false, error: 'missing intake payload' }, { status: 400 })
  }
  const { intake, buildings = [], prior_repairs_locations = [], contents_damage_locations = [] } = body

  try {
    // 1) Contact — upsert by phone/email so re-submits don't create duplicates
    const { firstName, lastName } = splitName(intake.insured1)
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        firstName,
        lastName,
        phone: intake.insured1_cell || undefined,
        email: intake.insured1_email || undefined,
      }),
    })
    const contactJson = await contactRes.json()
    if (!contactRes.ok) throw new Error(`contact upsert failed: ${JSON.stringify(contactJson)}`)
    const contactId = contactJson.contact.id

    // 2) Property — address is unique in GHL, so a repeat client/second claim
    // at the same address must reuse the existing record, not fail. GHL's own
    // conflict error hands back the existing record's id, so use that instead
    // of a separate search round-trip.
    const propertyRes = await fetch(`${GHL_BASE}/objects/custom_objects.properties/records`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        properties: {
          property_address: intake.damage_address || '',
        },
      }),
    })
    const propertyJson = await propertyRes.json()
    let propertyId: string
    if (propertyRes.ok) {
      propertyId = propertyJson.record.id
    } else if (propertyJson?.errors?.[0]?.errorCode === 'primary_property_conflict') {
      propertyId = propertyJson.errors[0].conflictingRecordId
    } else {
      throw new Error(`property create failed: ${JSON.stringify(propertyJson)}`)
    }

    // 3) Claim — claim_number is required+unique; the form allows it blank
    // (carrier hasn't assigned one at intake), so fall back to a traceable placeholder.
    const claimNumber = intake.claim_number?.trim() || `INTAKE-${Date.now()}`
    const claimRes = await fetch(`${GHL_BASE}/objects/custom_objects.claims/records`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        properties: {
          claim_number: claimNumber,
          date_of_loss: intake.date_loss || undefined,
          insurance_carrier: intake.insurance_company || undefined,
          policy_number: intake.policy_number || undefined,
          property_address: intake.damage_address || undefined,
          peril_type: mapPerilType(intake.loss_type),
          field_intake_raw_json: JSON.stringify(body),
        },
      }),
    })
    const claimJson = await claimRes.json()
    if (!claimRes.ok) throw new Error(`claim create failed: ${JSON.stringify(claimJson)}`)
    const claimId = claimJson.record.id

    // 4) Associations — link Contact<->Claim and Claim<->Property
    await fetch(`${GHL_BASE}/associations/relations`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        associationId: CLAIMANT_ASSOCIATION_ID,
        firstRecordId: contactId,
        secondRecordId: claimId,
      }),
    })
    await fetch(`${GHL_BASE}/associations/relations`, {
      method: 'POST',
      headers: ghlHeaders(),
      body: JSON.stringify({
        locationId: LOCATION_ID,
        associationId: CLAIM_HISTORY_ASSOCIATION_ID,
        firstRecordId: claimId,
        secondRecordId: propertyId,
      }),
    })

    return Response.json({ success: true, contactId, propertyId, claimId, claimNumber })
  } catch (err) {
    console.error('intake submit failed:', err)
    return Response.json({ success: false, error: String(err) }, { status: 500 })
  }
}
