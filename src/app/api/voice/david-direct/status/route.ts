import { VoiceResponse, wasAnswered, fallbackToAI, xmlResponse } from '@/lib/voice-routing'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const formData = new URLSearchParams(await req.text())
  const twiml = new VoiceResponse()
  if (!wasAnswered(formData)) fallbackToAI(twiml)
  return xmlResponse(twiml)
}
