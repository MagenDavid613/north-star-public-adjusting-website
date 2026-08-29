// Creates the Northstar Public Adjusting — Client Leads Google Sheet.
// Three tabs, one per intake channel, columns matched to the actual fields
// each channel collects in this codebase:
//   - Web Form:      union of InspectionForm.tsx (hero widget) and
//                     ClaimIntake.tsx (/intake) form fields
//   - Calling Agent:  Retell post_call_analysis_data fields + call metadata
//                     (see the Northstar Retell agent set up earlier) + full
//                     call transcript
//   - Chatbot:        src/lib/lead-extractor.ts's ExtractedLead fields +
//                     full chat transcript
//
// This sheet holds real client PII (names, phone numbers, call/chat
// transcripts) — it is intentionally created PRIVATE, not shared publicly.
// Run once with: npm run sheets:create-leads

import { google, sheets_v4 } from 'googleapis'
import { authenticate } from './lib/google-auth'
import { NAVY, appendRows, colWidthRequests, formatHeaderRow, type Row } from './lib/sheets-helpers'

const WEB_FORM_HEADERS: Row = [
  'Timestamp',
  'Source Widget',
  'First Name',
  'Last Name',
  'Full Name',
  'Phone',
  'Email',
  'Consent',
  'Consent Timestamp',
  'Property Type',
  'Damage Type(s)',
  'Property Address',
  'City',
  'State',
  'ZIP',
  'Date of Loss',
  'Is Urgent',
  'Urgency Description',
  'Insurance Stage',
  'Insurer Name',
  'Claim Description',
  'Claim Number',
  'Page URL',
  'Session ID',
]
const WEB_FORM_WIDTHS = [140, 140, 110, 110, 140, 110, 180, 80, 140, 110, 140, 220, 110, 70, 70, 100, 80, 260, 130, 140, 320, 110, 220, 160]

const CALLING_AGENT_HEADERS: Row = [
  'Timestamp',
  'Call ID',
  'First Name',
  'Last Name',
  'From Number',
  'To Number',
  'Email',
  'Urgent Callback',
  'Call Status',
  'Disconnection Reason',
  'Call Summary',
  'Call Successful',
  'User Sentiment',
  'Call Duration (sec)',
  'Call Log',
]
const CALLING_AGENT_WIDTHS = [140, 220, 110, 110, 130, 130, 180, 110, 110, 160, 320, 110, 260, 130, 500]

const CHATBOT_HEADERS: Row = [
  'Timestamp',
  'Session ID',
  'First Name',
  'Last Name',
  'Phone',
  'Email',
  'Property Type',
  'Damage Type',
  'Property Location',
  'Claim Stage',
  'Is Urgent',
  'Has Contact Info',
  'AI Summary',
  'Page URL',
  'Chat History',
]
const CHATBOT_WIDTHS = [140, 160, 110, 110, 130, 180, 110, 110, 180, 120, 80, 110, 320, 220, 500]

async function main() {
  console.log('Authenticating with Google...')
  const auth = await authenticate()
  const sheets = google.sheets({ version: 'v4', auth })

  console.log('Creating Google Sheet...')
  const { data: spreadsheet } = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: 'Northstar Public Adjusting — Client Leads' },
      sheets: [
        { properties: { title: 'Web Form', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Calling Agent', gridProperties: { frozenRowCount: 1 } } },
        { properties: { title: 'Chatbot', gridProperties: { frozenRowCount: 1 } } },
      ],
    },
  })

  const spreadsheetId = spreadsheet.spreadsheetId!
  const sheetIdByTitle = new Map(spreadsheet.sheets!.map((s) => [s.properties!.title!, s.properties!.sheetId!]))

  const tabs: [string, Row, number[]][] = [
    ['Web Form', WEB_FORM_HEADERS, WEB_FORM_WIDTHS],
    ['Calling Agent', CALLING_AGENT_HEADERS, CALLING_AGENT_WIDTHS],
    ['Chatbot', CHATBOT_HEADERS, CHATBOT_WIDTHS],
  ]

  const widthRequests: sheets_v4.Schema$Request[] = []

  for (const [title, headers, widths] of tabs) {
    const sheetId = sheetIdByTitle.get(title)!
    await appendRows(sheets, spreadsheetId, title, [headers])
    await formatHeaderRow(sheets, spreadsheetId, sheetId, NAVY)
    widthRequests.push(...colWidthRequests(sheetId, widths))
  }

  await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: widthRequests } })

  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
  console.log('\nSHEET CREATED SUCCESSFULLY')
  console.log(`URL: ${url}`)
  console.log(`Sheet ID: ${spreadsheetId}`)
  console.log('\nThis sheet is PRIVATE — it holds real client PII (names, phone')
  console.log('numbers, call/chat transcripts) and is not shared publicly.')
  console.log('Share it manually (Share button) with specific team members who need access.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
