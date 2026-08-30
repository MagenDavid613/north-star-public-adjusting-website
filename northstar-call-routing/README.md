# Northstar call routing — programmatic version

Everything discussed for David's call-sequencing rules, built as code instead of dashboard
clicks, using the Twilio and Retell REST APIs. Yes — this is entirely doable from VS Code; you
never have to touch either dashboard again once this is deployed (aside from reading a couple
of values out of it once, noted below).

## What this does

- **`src/twilioVoice.js`** — a small Express server that returns TwiML. This is where the
  actual ring-group and fallback logic lives (Twilio has no dashboard-only way to ring two
  numbers at once and then fall back to a third system, so this has to be code):
  - 866 main line → rings David's cell + the adjuster's cell **simultaneously**; if neither
    answers, the call is hung off to the Retell AI agent.
  - David's direct line → rings David only; if he doesn't answer, goes **straight to the AI**
    (never to the adjuster — matches what David specified).
  - Adjuster's direct line → rings the adjuster; if he doesn't answer, rings David; if David
    also doesn't answer, goes to the AI.
- **`src/configureTwilioNumbers.js`** — one-time (or repeat-after-redeploy) script that points
  each Twilio number's Voice webhook at the right route above, via the Twilio REST API.
- **`src/configureRetellTransferTool.js`** — adds a `transfer_call` tool to the Retell LLM so
  that mid-conversation, if the caller presses 1 or asks for a human, the AI cold-transfers
  them to the 866 main line (which, once the Twilio side is wired up, rings both humans again).
  This is the API equivalent of clicking Functions → Add → Call Transfer in the Retell
  dashboard.

## One thing you have to grab from the dashboard first

Right now the 866 number's voice traffic goes straight to Retell (Custom Telephony). To make
"ring humans first" possible, this app has to sit *in front of* Retell and only hand off to it
as the fallback. That means you need the exact address Twilio should dial into on a no-answer:

1. Retell dashboard → Phone Numbers → **Northstar 866 - Retell Voice AI** → **···** → **Edit
   Phone Number Settings**.
2. Copy whatever's there (a `sip:...@sip.retellai.com` URI, or a plain number) into
   `RETELL_FALLBACK_DESTINATION` in `.env`.

Also grab the LLM id behind the "Sara" agent (not the agent id):
`GET https://api.retellai.com/get-agent/{agent_id}` → `response_engine.llm_id`.

## Setup

```bash
cd northstar-call-routing
npm install
cp .env.example .env
# fill in .env: Twilio SID/token, phone number SIDs, cell numbers,
# the Retell fallback destination and LLM id
```

### Find the Twilio phone number SIDs

Twilio Console → Phone Numbers → Manage → Active Numbers → click each number → the SID
(`PNxxxxxxxx...`) is on that page. You need this for the 866 number, and for David's and the
adjuster's direct lines **only if those are separate Twilio numbers/DIDs** rather than plain
cell phones — if David's "786 line" is just his personal cell, there's no Twilio number to
reconfigure for it and `/voice/david-direct` won't apply to it (the routing only kicks in for
numbers Twilio actually terminates).

### Run it

For local testing, expose the app with a tunnel (e.g. `ngrok http 3000`) and put that HTTPS
URL in `PUBLIC_BASE_URL`. For real use, deploy `src/twilioVoice.js` somewhere it stays up
24/7 — a small box on Render, Railway, Fly.io, or a VPS all work; it's a plain Express app,
nothing Twilio-specific about the hosting. Once deployed, put that URL in `PUBLIC_BASE_URL`.

```bash
npm start                    # runs the voice webhook server
npm run configure:twilio     # points the 3 Twilio numbers at it
npm run configure:retell     # adds the mid-call transfer-to-human tool
```

## What's still easiest left in the dashboard

- **Keypad ("press 1") detection** and **voicemail detection** on the AI agent are already
  toggled on in Retell's Call Settings — no API change needed unless you want to adjust the
  wording or timing, which is quick to do by hand in the dashboard.
- **Warm vs. cold transfer** wording, and the AI's own script — still easiest to edit as
  prompt text in the Retell agent editor. The API only needs to own the routing *logic*, not
  the conversation copy.

## Testing checklist (matches David's spec)

- [ ] Call the 866 number — David's and the adjuster's cells ring at the same time.
- [ ] Let both ring out — call falls to the AI, AI answers normally.
- [ ] Answer on David's phone mid-ring — call connects to David, adjuster's phone stops ringing.
- [ ] Call David's direct line, let it ring out — call goes to the AI (**not** the adjuster).
- [ ] Call the adjuster's direct line, let it ring out — call rings David next.
- [ ] Let that also ring out — call falls to the AI.
- [ ] Mid-call with the AI, press 1 (or ask for a person) — call transfers to the 866 line,
      which rings both humans again.
