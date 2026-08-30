import { VoiceResponse, isConfigured, ringTimeout, fallbackToAI, xmlResponse, actionUrl } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// Adjuster's direct line: adjuster -> David -> AI.
export async function POST() {
  const twiml = new VoiceResponse()
  const davidCell = process.env.DAVID_CELL
  const adjusterCell = process.env.ADJUSTER_CELL

  if (!isConfigured(adjusterCell)) {
    // Nothing to ring for the adjuster leg — treat as "adjuster didn't answer".
    if (isConfigured(davidCell)) {
      twiml.dial(
        { timeout: ringTimeout(), action: actionUrl('/api/voice/adjuster-direct/status-2'), method: 'POST' },
        davidCell
      )
    } else {
      fallbackToAI(twiml)
    }
  } else {
    twiml.dial(
      { timeout: ringTimeout(), action: actionUrl('/api/voice/adjuster-direct/status'), method: 'POST' },
      adjusterCell
    )
  }

  return xmlResponse(twiml)
}
