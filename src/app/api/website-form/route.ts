// Shared submit endpoint for both InspectionForm.tsx (hero widget) and
// ClaimIntake.tsx (/intake). Logs the lead to the Web Form tab of the leads
// sheet. Swap in GHL/a real CRM here later without touching either form.

import { appendWebFormLead, type WebFormLead } from '@/lib/leads-sheet'

export const runtime = 'nodejs'
export const maxDuration = 30

interface WebFormRequestBody extends Omit<WebFormLead, 'consent'> {
  consent?: boolean
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WebFormRequestBody

    if (!body.sourceWidget) {
      return Response.json({ ok: false, reason: 'missing sourceWidget' }, { status: 400 })
    }
    if (!body.phone && !body.email) {
      return Response.json({ ok: false, reason: 'no phone or email provided' }, { status: 400 })
    }

    const result = await appendWebFormLead({ ...body, consent: Boolean(body.consent) })

    return Response.json({ ok: result.ok, reason: result.reason })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('website-form error:', message)
    return Response.json({ ok: false, error: message }, { status: 500 })
  }
}
