import { VoiceResponse, xmlResponse, actionUrl } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// Local test IVR for the 866 main line — 3-digit extension dialing, per
// David's request (business-card style: "1-866-xxx-xxxx, extension 301").
// Extension numbers below are placeholders (301 = David, 302 = Ari) until he
// confirms his preferred scheme — see EXTENSIONS in ./select/route.ts.
// Not wired to any live Twilio number yet; testing locally via curl against
// the dev server before this replaces /api/voice/main.
export async function POST() {
  const twiml = new VoiceResponse()

  const gather = twiml.gather({
    numDigits: 3,
    timeout: 6,
    action: actionUrl('/api/voice/ivr/select'),
    method: 'POST',
  })
  gather.say(
    'Thanks for calling Northstar Public Adjusting. If you know your party\'s extension, you can dial it now. For David, dial 3-0-1. For Ari, dial 3-0-2. To speak with our assistant, please stay on the line.'
  )

  // No key pressed within the timeout — fall through to the assistant.
  twiml.redirect({ method: 'POST' }, actionUrl('/api/voice/ivr/select'))

  return xmlResponse(twiml)
}
