/**
 * Voice webhook server implementing David's call-routing rules:
 *
 * 1) 866 main line: ring David's cell + adjuster's cell SIMULTANEOUSLY.
 *    If neither answers -> fall back to the Retell AI agent.
 *
 * 2) David's direct line: ring David's cell only.
 *    If he doesn't answer -> fall back DIRECTLY to the AI (never to the adjuster).
 *
 * 3) Adjuster's direct line: ring the adjuster's cell.
 *    If he doesn't answer -> ring David's cell.
 *    If David also doesn't answer -> fall back to the AI.
 *
 * Cells-not-configured-yet behavior: DAVID_CELL / ADJUSTER_CELL are being
 * filled in later (call forwarding or a softphone behind each 786 number
 * hasn't been set up yet). Until then, every route below detects the
 * missing destination and skips straight to the next step in its own
 * sequence (ultimately the AI) rather than attempting to <Dial> an empty
 * or placeholder value, which Twilio would treat as an error rather than
 * a graceful no-answer. The moment a real number lands in .env, the exact
 * same routes start actually ringing it — no code changes needed.
 *
 * Point each Twilio number's Voice webhook at the matching route below
 * (see configureTwilioNumbers.js to do that programmatically).
 */
require('dotenv').config();
const express = require('express');
const { twiml: { VoiceResponse } } = require('twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`[call] ${req.method} ${req.path} | From=${req.body?.From} To=${req.body?.To} CallSid=${req.body?.CallSid} DialCallStatus=${req.body?.DialCallStatus}`);
  next();
});

const {
  DAVID_CELL,
  ADJUSTER_CELL,
  RETELL_FALLBACK_DESTINATION,
  RING_TIMEOUT_SECONDS = '15',
  PUBLIC_BASE_URL,
  PORT = '3000',
} = process.env;

/** True only if the env var holds something that looks like a real, dialable number. */
function isConfigured(value) {
  return Boolean(value) && !value.includes('REPLACE_ME') && !value.includes('XXXXXXXXXX') && value.trim() !== '';
}

if (!isConfigured(RETELL_FALLBACK_DESTINATION) || !PUBLIC_BASE_URL) {
  console.warn('[config warning] RETELL_FALLBACK_DESTINATION or PUBLIC_BASE_URL is missing — the AI fallback will not work until both are set.');
}
if (!isConfigured(DAVID_CELL)) {
  console.warn('[config] DAVID_CELL not set yet — every route that would ring David falls straight through to the AI instead. This is expected for now.');
}
if (!isConfigured(ADJUSTER_CELL)) {
  console.warn('[config] ADJUSTER_CELL not set yet — every route that would ring the adjuster falls straight through (to David\'s leg, or the AI). This is expected for now.');
}

const ringTimeout = Number(RING_TIMEOUT_SECONDS);

/** Appends a <Dial> leg to the Retell AI as the final fallback. */
function fallbackToAI(twiml) {
  const dial = twiml.dial();
  if (RETELL_FALLBACK_DESTINATION.startsWith('sip:')) {
    dial.sip(RETELL_FALLBACK_DESTINATION);
  } else {
    dial.number(RETELL_FALLBACK_DESTINATION);
  }
}

function wasAnswered(req) {
  // Twilio posts DialCallStatus to the <Dial action> URL: "completed" means someone answered.
  return req.body.DialCallStatus === 'completed';
}

// ---------------------------------------------------------------------------
// 1) Main line (866): ring both simultaneously
// ---------------------------------------------------------------------------
app.post('/voice/main', (req, res) => {
  const twiml = new VoiceResponse();
  const targets = [DAVID_CELL, ADJUSTER_CELL].filter(isConfigured);

  if (targets.length === 0) {
    fallbackToAI(twiml);
  } else {
    const dial = twiml.dial({
      timeout: ringTimeout,
      action: `${PUBLIC_BASE_URL}/voice/main/status`,
      method: 'POST',
    });
    targets.forEach((t) => dial.number(t));
  }
  res.type('text/xml').send(twiml.toString());
});

app.post('/voice/main/status', (req, res) => {
  const twiml = new VoiceResponse();
  if (!wasAnswered(req)) fallbackToAI(twiml);
  res.type('text/xml').send(twiml.toString());
});

// ---------------------------------------------------------------------------
// 2) David's direct line: David only, then straight to AI (never the adjuster)
// ---------------------------------------------------------------------------
app.post('/voice/david-direct', (req, res) => {
  const twiml = new VoiceResponse();
  if (!isConfigured(DAVID_CELL)) {
    fallbackToAI(twiml);
  } else {
    twiml.dial(
      { timeout: ringTimeout, action: `${PUBLIC_BASE_URL}/voice/david-direct/status`, method: 'POST' },
      DAVID_CELL
    );
  }
  res.type('text/xml').send(twiml.toString());
});

app.post('/voice/david-direct/status', (req, res) => {
  const twiml = new VoiceResponse();
  if (!wasAnswered(req)) fallbackToAI(twiml);
  res.type('text/xml').send(twiml.toString());
});

// ---------------------------------------------------------------------------
// 3) Adjuster's direct line: adjuster -> David -> AI
// ---------------------------------------------------------------------------
app.post('/voice/adjuster-direct', (req, res) => {
  const twiml = new VoiceResponse();
  if (!isConfigured(ADJUSTER_CELL)) {
    // Adjuster leg has nothing to ring — skip straight to "adjuster didn't answer".
    if (isConfigured(DAVID_CELL)) {
      twiml.dial(
        { timeout: ringTimeout, action: `${PUBLIC_BASE_URL}/voice/adjuster-direct/status-2`, method: 'POST' },
        DAVID_CELL
      );
    } else {
      fallbackToAI(twiml);
    }
  } else {
    twiml.dial(
      { timeout: ringTimeout, action: `${PUBLIC_BASE_URL}/voice/adjuster-direct/status`, method: 'POST' },
      ADJUSTER_CELL
    );
  }
  res.type('text/xml').send(twiml.toString());
});

app.post('/voice/adjuster-direct/status', (req, res) => {
  const twiml = new VoiceResponse();
  if (!wasAnswered(req)) {
    if (isConfigured(DAVID_CELL)) {
      twiml.dial(
        { timeout: ringTimeout, action: `${PUBLIC_BASE_URL}/voice/adjuster-direct/status-2`, method: 'POST' },
        DAVID_CELL
      );
    } else {
      fallbackToAI(twiml);
    }
  }
  res.type('text/xml').send(twiml.toString());
});

app.post('/voice/adjuster-direct/status-2', (req, res) => {
  const twiml = new VoiceResponse();
  if (!wasAnswered(req)) fallbackToAI(twiml);
  res.type('text/xml').send(twiml.toString());
});

app.get('/healthz', (_req, res) => res.send('ok'));

app.listen(Number(PORT), () => {
  console.log(`Voice webhook listening on :${PORT}`);
  console.log(`Main line webhook:      ${PUBLIC_BASE_URL}/voice/main`);
  console.log(`David direct webhook:   ${PUBLIC_BASE_URL}/voice/david-direct`);
  console.log(`Adjuster direct webhook:${PUBLIC_BASE_URL}/voice/adjuster-direct`);
});
