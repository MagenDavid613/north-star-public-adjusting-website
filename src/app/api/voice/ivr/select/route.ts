import { VoiceResponse, ringTimeout, fallbackToAI, xmlResponse } from '@/lib/voice-routing'

export const runtime = 'nodejs'

// Extension -> destination map for the 866 main line.
// Placeholders (301 = David, 302 = Ari) pending David's confirmed numbering
// scheme — swapping these is a one-line edit per extension once he sends it.
// Destinations are David's and Ari's real 786 Twilio direct lines — dialing
// these hands the call to whatever those numbers are already configured to
// do (currently: ring their cell if set, else fall back to the AI).
const EXTENSIONS: Record<string, string> = {
  '301': '+17869472631', // David — confirmed 2026-10-08, do not swap
  '302': '+17869980905', // Ari — confirmed 2026-10-08, do not swap
  // '303': '',           // sales — add once a destination exists
  // '304': '',           // support — add once a destination exists
}

export async function POST(req: Request) {
  const formData = new URLSearchParams(await req.text())
  const digits = formData.get('Digits')
  const twiml = new VoiceResponse()

  const destination = digits ? EXTENSIONS[digits] : undefined
  if (destination) {
    twiml.dial({ timeout: ringTimeout() }, destination)
  } else {
    fallbackToAI(twiml)
  }

  return xmlResponse(twiml)
}
