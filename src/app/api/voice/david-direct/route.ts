import { VoiceResponse, isConfigured, ringTimeout, fallbackToAI, xmlResponse, actionUrl } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// David's direct line: David only, then straight to AI (never the adjuster).
export async function POST() {
  const twiml = new VoiceResponse()

  if (!isConfigured(process.env.DAVID_CELL)) {
    fallbackToAI(twiml)
  } else {
    twiml.dial(
      { timeout: ringTimeout(), action: actionUrl('/api/voice/david-direct/status'), method: 'POST' },
      process.env.DAVID_CELL
    )
  }

  return xmlResponse(twiml)
}
