// POSTs leads to the GoHighLevel Premium Inbound Webhook.
// Source-aware so the same endpoint can receive chatbot AND voice agent leads.
// The webhook URL lives in GHL_WEBHOOK_URL (server-only, never NEXT_PUBLIC_).

export type LeadSource = 'chatbot' | 'voice_agent' | 'intake_form' | 'website_form'

export interface GHLLeadPayload {
  source: LeadSource

  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  email?: string | null

  ai_summary?: string
  full_transcript?: string

  property_type?: string | null
  damage_type?: string | null
  property_location?: string | null
  claim_stage?: string | null
  is_urgent?: boolean

  form_location?: string
  session_id?: string
  page_url?: string
  user_agent?: string
  submitted_at: string
}

export interface GHLSendResult {
  ok: boolean
  status: number
  body: string
  skipped?: boolean
}

export async function sendToGHL(payload: GHLLeadPayload): Promise<GHLSendResult> {
  const url = process.env.GHL_WEBHOOK_URL

  if (!url) {
    console.warn('GHL_WEBHOOK_URL not set — skipping GHL send')
    return { ok: false, status: 0, body: 'GHL_WEBHOOK_URL not configured', skipped: true }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const body = await res.text().catch(() => '')

    if (!res.ok) {
      console.error(`GHL webhook returned ${res.status}:`, body)
    } else {
      console.log(`GHL webhook OK [${payload.source}] for ${payload.email || payload.phone || 'unknown'}`)
    }

    return { ok: res.ok, status: res.status, body }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('GHL webhook fetch failed:', message)
    return { ok: false, status: 0, body: message }
  }
}
