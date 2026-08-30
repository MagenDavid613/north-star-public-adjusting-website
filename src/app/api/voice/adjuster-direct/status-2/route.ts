import { VoiceResponse, wasAnswered, fallbackToAI, xmlResponse } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// Fires when David's fallback leg (rung after the adjuster missed) finishes.
// If he also didn't answer, this is the final fallback to the AI.
export async function POST(req: Request) {
  const formData = new URLSearchParams(await req.text())
  const twiml = new VoiceResponse()
  if (!wasAnswered(formData)) fallbackToAI(twiml)
  return xmlResponse(twiml)
}
