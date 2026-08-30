// Shared helpers for the /api/voice/* call-routing routes.
// Ported from northstar-call-routing/src/twilioVoice.js — same logic, now
// running as Next.js API routes on the same Vercel deployment as the site,
// instead of a separate Express app that depended on a laptop staying on.
//
// Routing rules (confirmed with David):
// 1) 866 main line: ring David's cell + adjuster's cell SIMULTANEOUSLY.
//    If neither answers -> fall back to the Retell AI agent.
// 2) David's direct line: ring David's cell only.
//    If he doesn't answer -> fall back DIRECTLY to the AI (never the adjuster).
// 3) Adjuster's direct line: ring the adjuster's cell.
//    If he doesn't answer -> ring David's cell.
//    If David also doesn't answer -> fall back to the AI.
//
// DAVID_CELL / ADJUSTER_CELL are deliberately not configured yet (deferred).
// Every route below detects that and skips straight to the next step in its
// own sequence rather than dialing an empty/placeholder value.

import twilio from 'twilio'

const { VoiceResponse } = twilio.twiml

export function isConfigured(value: string | undefined): value is string {
  return Boolean(value) && !value!.includes('REPLACE_ME') && !value!.includes('XXXXXXXXXX') && value!.trim() !== ''
}

export function ringTimeout(): number {
  return Number(process.env.RING_TIMEOUT_SECONDS ?? '15')
}

/** Twilio fetches `action` URLs from its own infrastructure — they must be absolute. */
export function actionUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.northstarpublicadjusting.com'
  return `${base.replace(/\/$/, '')}${path}`
}

/** Appends a <Dial> leg to the Retell AI as the final fallback. */
export function fallbackToAI(twiml: InstanceType<typeof VoiceResponse>) {
  const destination = process.env.RETELL_FALLBACK_DESTINATION
  const dial = twiml.dial()
  if (!destination) {
    console.error('RETELL_FALLBACK_DESTINATION not set — cannot fall back to AI')
    return
  }
  if (destination.startsWith('sip:')) {
    dial.sip(destination)
  } else {
    dial.number(destination)
  }
}

export function wasAnswered(formData: URLSearchParams): boolean {
  // Twilio posts DialCallStatus to the <Dial action> URL: "completed" means someone answered.
  return formData.get('DialCallStatus') === 'completed'
}

export function xmlResponse(twiml: InstanceType<typeof VoiceResponse>) {
  return new Response(twiml.toString(), { headers: { 'Content-Type': 'text/xml' } })
}

export { VoiceResponse }

