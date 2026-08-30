import { VoiceResponse, isConfigured, ringTimeout, wasAnswered, fallbackToAI, xmlResponse, actionUrl } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// Fires when the adjuster leg finishes ringing. If not answered, ring David next.
export async function POST(req: Request) {
  const formData = new URLSearchParams(await req.text())
  const twiml = new VoiceResponse()

  if (!wasAnswered(formData)) {
    const davidCell = process.env.DAVID_CELL
    if (isConfigured(davidCell)) {
      twiml.dial(
        { timeout: ringTimeout(), action: actionUrl('/api/voice/adjuster-direct/status-2'), method: 'POST' },
        davidCell
      )
    } else {
      fallbackToAI(twiml)
    }
  }

  return xmlResponse(twiml)
}
