// Receives Retell webhook events for the Northstar voice agent and logs
// call_analyzed events (the ones that carry the full transcript + custom
// analysis fields) to the Calling Agent tab of the leads sheet.
//
// NOT YET WIRED LIVE: the Retell agent's webhook_url must be pointed at this
// route's deployed URL (Retell Dashboard > Phone Numbers > agent > Edit, or
// via the Retell API) before any events will actually arrive here. It was
// deliberately left unset when the agent was created to avoid misrouting
// into another account's GHL — see project history.
//
// TODO: verify the `x-retell-signature` header before trusting the payload.
// Skipped for now to get the write-path testable quickly; do not treat this
// route as trusted until that's added.

import { appendCallLog } from '@/lib/leads-sheet'

export const runtime = 'nodejs'
export const maxDuration = 30

interface RetellCallAnalysis {
  custom_analysis_data?: {
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
    urgentcallback?: boolean
  }
  call_summary?: string
  call_successful?: boolean
  user_sentiment?: string
}

interface RetellCall {
  call_id?: string
  from_number?: string
  to_number?: string
  call_status?: string
  disconnection_reason?: string
  start_timestamp?: number
  end_timestamp?: number
  transcript?: string
  call_analysis?: RetellCallAnalysis
}

interface RetellWebhookBody {
  event?: 'call_started' | 'call_ended' | 'call_analyzed'
  call?: RetellCall
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RetellWebhookBody

    // Only call_analyzed carries the transcript + custom analysis fields —
    // call_started/call_ended fire earlier without them.
    if (body.event !== 'call_analyzed' || !body.call) {
      return Response.json({ ok: true, reason: `ignored event: ${body.event ?? 'unknown'}` })
    }

    const call = body.call
    const analysis = call.call_analysis
    const custom = analysis?.custom_analysis_data ?? {}

    const durationSec =
      call.start_timestamp && call.end_timestamp
        ? Math.round((call.end_timestamp - call.start_timestamp) / 1000)
        : null

    const result = await appendCallLog({
      timestamp: call.start_timestamp ? new Date(call.start_timestamp).toISOString() : undefined,
      callId: call.call_id,
      firstName: custom.firstName,
      lastName: custom.lastName,
      fromNumber: call.from_number,
      toNumber: call.to_number,
      email: custom.email,
      urgentCallback: custom.urgentcallback,
      callStatus: call.call_status,
      disconnectionReason: call.disconnection_reason,
      callSummary: analysis?.call_summary,
      callSuccessful: analysis?.call_successful,
      userSentiment: analysis?.user_sentiment,
      callDurationSec: durationSec,
      callLog: call.transcript,
    })

    return Response.json({ ok: result.ok, reason: result.reason })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('retell-webhook error:', message)
    return Response.json({ ok: false, error: message }, { status: 500 })
  }
}
