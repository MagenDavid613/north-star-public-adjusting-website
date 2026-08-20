// Called by ChatWidget.tsx when the chat closes (button click or tab unload).
// Runs lead extraction on the full transcript, then fires the lead to GHL.
//
// Accepts JSON body OR text/plain body (navigator.sendBeacon sometimes
// downgrades the content-type — we handle both transparently).

import { extractLead, type ChatMessage } from '@/lib/lead-extractor'
import { sendToGHL } from '@/lib/ghl'

export const runtime = 'nodejs'
export const maxDuration = 30

// Best-effort in-memory dedup so a near-simultaneous close-button + beforeunload
// pair doesn't double-fire. Resets on cold start; GHL itself dedupes by
// phone/email via Update Contact, so duplicates are safe — this is just polite.
const recentlySent = new Map<string, number>()
const DEDUP_WINDOW_MS = 15_000

function isRecentlySent(sessionId: string): boolean {
  const at = recentlySent.get(sessionId)
  if (!at) return false
  if (Date.now() - at > DEDUP_WINDOW_MS) {
    recentlySent.delete(sessionId)
    return false
  }
  return true
}

interface CloseRequestBody {
  sessionId?: string
  messages?: ChatMessage[]
  pageUrl?: string
  userAgent?: string
}

async function readBody(req: Request): Promise<CloseRequestBody> {
  const raw = await req.text()
  if (!raw) return {}
  try {
    return JSON.parse(raw) as CloseRequestBody
  } catch {
    return {}
  }
}

export async function POST(req: Request) {
  try {
    const { sessionId, messages, pageUrl, userAgent } = await readBody(req)

    if (!sessionId) {
      return Response.json({ ok: false, reason: 'missing sessionId' })
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ ok: false, reason: 'no messages' })
    }

    if (isRecentlySent(sessionId)) {
      return Response.json({ ok: true, reason: 'already sent in dedup window' })
    }

    const cleanMessages: ChatMessage[] = messages
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .map((m) => ({ role: m.role, content: m.content.trim() }))

    const hasUserMessages = cleanMessages.some((m) => m.role === 'user')
    if (!hasUserMessages) {
      return Response.json({ ok: false, reason: 'no user input' })
    }

    const lead = await extractLead(cleanMessages)

    if (!lead.hasContactInfo) {
      return Response.json({
        ok: false,
        reason: 'no contact info captured — lead not sent',
        summary: lead.ai_summary,
      })
    }

    const transcript = cleanMessages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
      .join('\n\n')

    recentlySent.set(sessionId, Date.now())

    const result = await sendToGHL({
      source: 'chatbot',
      firstName: lead.firstName,
      lastName: lead.lastName,
      phone: lead.phone,
      email: lead.email,
      ai_summary: lead.ai_summary,
      full_transcript: transcript,
      property_type: lead.property_type,
      damage_type: lead.damage_type,
      property_location: lead.property_location,
      claim_stage: lead.claim_stage,
      is_urgent: lead.is_urgent,
      session_id: sessionId,
      page_url: pageUrl,
      user_agent: userAgent,
      submitted_at: new Date().toISOString(),
    })

    if (!result.ok && !result.skipped) {
      recentlySent.delete(sessionId)
    }

    return Response.json({
      ok: result.ok,
      status: result.status,
      reason: result.ok ? 'sent to GHL' : 'GHL send failed',
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('chat/close error:', message)
    return Response.json({ ok: false, error: message }, { status: 500 })
  }
}
