// Called by Sara (Retell voice agent) as a mid-call tool once she's gathered
// enough from a caller to alert the team. Sends an SMS from the main 866
// number to David's and Ari's 786 numbers — both GHL-owned business lines,
// never a personal cell, per the standing no-personal-numbers rule.
import twilio from 'twilio'

export const runtime = 'nodejs'

const TEAM_NUMBERS = ['+17869472631', '+17869980905'] // David, Ari — GHL-owned, not personal
const FROM_NUMBER = '+18667827577'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const {
    caller_name,
    caller_phone,
    caller_email,
    summary,
    urgent,
  }: {
    caller_name?: string
    caller_phone?: string
    caller_email?: string
    summary?: string
    urgent?: boolean
  } = body?.args ?? body

  const lines = [
    urgent ? 'URGENT — new caller via Sara' : 'New caller via Sara',
    caller_name ? `Name: ${caller_name}` : null,
    caller_phone ? `Phone: ${caller_phone}` : null,
    caller_email ? `Email: ${caller_email}` : null,
    summary ? `What they need: ${summary}` : null,
  ].filter(Boolean)
  const message = lines.join('\n')

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (!accountSid || !authToken) {
    console.error('notify-team: missing Twilio credentials')
    return Response.json({ success: false, error: 'not configured' }, { status: 500 })
  }
  const client = twilio(accountSid, authToken)

  const results = await Promise.allSettled(
    TEAM_NUMBERS.map((to) => client.messages.create({ from: FROM_NUMBER, to, body: message }))
  )
  const failures = results.filter((r) => r.status === 'rejected')
  if (failures.length > 0) {
    console.error('notify-team: some SMS sends failed', failures)
  }

  return Response.json({ success: failures.length < results.length })
}
