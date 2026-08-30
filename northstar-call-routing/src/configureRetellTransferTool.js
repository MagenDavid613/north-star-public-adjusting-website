/**
 * Adds/updates a `transfer_call` tool on the Retell LLM behind the "Sara" agent, so that
 * mid-conversation, the AI can transfer the caller back to the human ring group (the 866
 * main line — which, once configureTwilioNumbers.js has run, rings David + the adjuster
 * simultaneously) whenever the caller presses 1 or asks for a person.
 *
 * This mirrors exactly what the "Call Transfer" function does in the Retell dashboard
 * (Functions > Add > Call Transfer), just applied via API so it's reproducible/versioned.
 *
 * Docs: https://docs.retellai.com/api-references/update-retell-llm
 *
 * Usage: node src/configureRetellTransferTool.js
 */
require('dotenv').config();
const Retell = require('retell-sdk').default;

const { RETELL_API_KEY, RETELL_LLM_ID, MAIN_NUMBER_E164 } = process.env;

if (!RETELL_API_KEY || !RETELL_LLM_ID || !MAIN_NUMBER_E164) {
  console.error('Missing RETELL_API_KEY / RETELL_LLM_ID / MAIN_NUMBER_E164 in .env');
  process.exit(1);
}

const client = new Retell({ apiKey: RETELL_API_KEY });

(async () => {
  // Fetch current config first so we don't clobber other tools (e.g. end_call) already on the LLM.
  const current = await client.llm.retrieve(RETELL_LLM_ID);
  const existingTools = (current.general_tools || []).filter(
    (t) => t.name !== 'transfer_to_main_line'
  );

  const transferTool = {
    type: 'transfer_call',
    name: 'transfer_to_main_line',
    description:
      'Use this when the caller explicitly asks to speak with a person, or presses 1, at any point in the call. ' +
      'Transfers them to the main line, which rings David and the adjuster.',
    transfer_destination: {
      type: 'predefined',
      number: MAIN_NUMBER_E164,
    },
    transfer_option: {
      type: 'cold_transfer',
      show_transferee_as_caller: false,
    },
    speak_during_execution: true,
    execution_message_description: 'Sure — connecting you now, one moment.',
  };

  const updated = await client.llm.update(RETELL_LLM_ID, {
    general_tools: [...existingTools, transferTool],
  });

  console.log(
    'Updated LLM tools:',
    (updated.general_tools || []).map((t) => t.name)
  );
})().catch((err) => {
  console.error('Failed to update Retell LLM:', err.message);
  process.exit(1);
});
