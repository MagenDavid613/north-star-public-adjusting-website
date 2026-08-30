import { VoiceResponse, isConfigured, ringTimeout, fallbackToAI, xmlResponse, actionUrl } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// 866 main line: ring David + adjuster simultaneously, fall back to AI.
export async function POST() {
  const twiml = new VoiceResponse()
  const targets = [process.env.DAVID_CELL, process.env.ADJUSTER_CELL].filter(isConfigured)

  if (targets.length === 0) {
    fallbackToAI(twiml)
  } else {
    const dial = twiml.dial({
      timeout: ringTimeout(),
      action: actionUrl('/api/voice/main/status'),
      method: 'POST',
    })
    targets.forEach((t) => dial.number(t))
  }

  return xmlResponse(twiml)
}
