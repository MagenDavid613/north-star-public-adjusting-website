/**
 * Points each Twilio number's Voice webhook at this app's matching route.
 * Run this once after `npm run start` is publicly reachable (PUBLIC_BASE_URL set),
 * and again any time PUBLIC_BASE_URL changes (e.g. you redeploy to a new host).
 *
 * Usage: node src/configureTwilioNumbers.js
 */
require('dotenv').config();
const twilio = require('twilio');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, PUBLIC_BASE_URL } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
  console.error('Missing TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN in .env');
  process.exit(1);
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const numbers = [
  { sid: process.env.MAIN_NUMBER_SID, path: '/voice/main', label: '866 main line' },
  { sid: process.env.DAVID_DIRECT_SID, path: '/voice/david-direct', label: "David's direct line" },
  { sid: process.env.ADJUSTER_DIRECT_SID, path: '/voice/adjuster-direct', label: "Adjuster's direct line" },
];

(async () => {
  for (const n of numbers) {
    if (!n.sid || n.sid.includes('xxxxx')) {
      console.log(`Skipping ${n.label} — no real SID set in .env`);
      continue;
    }
    try {
      const updated = await client.incomingPhoneNumbers(n.sid).update({
        voiceUrl: `${PUBLIC_BASE_URL}${n.path}`,
        voiceMethod: 'POST',
      });
      console.log(`${n.label} (${updated.phoneNumber}) -> ${updated.voiceUrl}`);
    } catch (err) {
      console.error(`Failed to update ${n.label} (${n.sid}):`, err.message);
    }
  }
})();
