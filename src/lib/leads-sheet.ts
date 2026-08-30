// Appends rows to the "Northstar Public Adjusting — Client Leads" Google Sheet
// (see scripts/create-leads-sheet.ts for how the sheet itself was created).
// Uses a service account (not the interactive OAuth used to create the sheet)
// so this can run unattended from a Vercel serverless function.
//
// Required env vars:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  (with literal \n for newlines — Vercel
//     env vars can't hold real newlines; we un-escape them at runtime)
//   LEADS_SHEET_ID
//
// Every function here fails soft (logs and returns ok:false) rather than
// throwing — a Sheets outage should never break a form submission, call, or
// chat close for the visitor.

import { google } from 'googleapis'

const SHEET_ID = process.env.LEADS_SHEET_ID

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!email || !rawKey) return null

  return new google.auth.JWT({
    email,
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function appendRow(sheetTitle: string, row: (string | number | boolean)[]): Promise<{ ok: boolean; reason?: string }> {
  if (!SHEET_ID) {
    console.warn('LEADS_SHEET_ID not set — skipping Sheets write')
    return { ok: false, reason: 'LEADS_SHEET_ID not configured' }
  }

  const auth = getAuth()
  if (!auth) {
    console.warn('Google service account env vars not set — skipping Sheets write')
    return { ok: false, reason: 'service account not configured' }
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `'${sheetTitle}'!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [row.map((v) => (v === null || v === undefined ? '' : v))] },
    })
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`Sheets append to "${sheetTitle}" failed:`, message)
    return { ok: false, reason: message }
  }
}

// ─────────────────────────────────────────────────────────────
// Web Form tab
// Columns: Timestamp, Source Widget, First Name, Last Name, Full Name, Phone,
// Email, Consent, Consent Timestamp, Property Type, Damage Type(s),
// Property Address, City, State, ZIP, Date of Loss, Is Urgent,
// Urgency Description, Insurance Stage, Insurer Name, Claim Description,
// Claim Number, Page URL, Session ID
// ─────────────────────────────────────────────────────────────
export interface WebFormLead {
  sourceWidget: 'Hero Inspection Form' | 'Full Intake Form'
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  phone?: string | null
  email?: string | null
  consent: boolean
  consentTimestamp?: string | null
  propertyType?: string | null
  damageTypes?: string | null
  propertyAddress?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  dateOfLoss?: string | null
  isUrgent?: boolean | null
  urgencyDescription?: string | null
  insuranceStage?: string | null
  insurerName?: string | null
  claimDescription?: string | null
  claimNumber?: string | null
  pageUrl?: string | null
  sessionId?: string | null
}

export async function appendWebFormLead(lead: WebFormLead) {
  return appendRow('Web Form', [
    new Date().toISOString(),
    lead.sourceWidget,
    lead.firstName ?? '',
    lead.lastName ?? '',
    lead.fullName ?? '',
    lead.phone ?? '',
    lead.email ?? '',
    lead.consent ? 'Y' : 'N',
    lead.consentTimestamp ?? '',
    lead.propertyType ?? '',
    lead.damageTypes ?? '',
    lead.propertyAddress ?? '',
    lead.city ?? '',
    lead.state ?? '',
    lead.zip ?? '',
    lead.dateOfLoss ?? '',
    lead.isUrgent ? 'Y' : '',
    lead.urgencyDescription ?? '',
    lead.insuranceStage ?? '',
    lead.insurerName ?? '',
    lead.claimDescription ?? '',
    lead.claimNumber ?? '',
    lead.pageUrl ?? '',
    lead.sessionId ?? '',
  ])
}

// ─────────────────────────────────────────────────────────────
// Calling Agent tab
// Columns: Timestamp, Call ID, First Name, Last Name, From Number, To Number,
// Email, Urgent Callback, Call Status, Disconnection Reason, Call Summary,
// Call Successful, User Sentiment, Call Duration (sec), Call Log
// ─────────────────────────────────────────────────────────────
export interface CallLogEntry {
  timestamp?: string
  callId?: string | null
  firstName?: string | null
  lastName?: string | null
  fromNumber?: string | null
  toNumber?: string | null
  email?: string | null
  urgentCallback?: boolean | null
  callStatus?: string | null
  disconnectionReason?: string | null
  callSummary?: string | null
  callSuccessful?: string | boolean | null
  userSentiment?: string | null
  callDurationSec?: number | null
  callLog?: string | null
}

export async function appendCallLog(entry: CallLogEntry) {
  return appendRow('Calling Agent', [
    entry.timestamp ?? new Date().toISOString(),
    entry.callId ?? '',
    entry.firstName ?? '',
    entry.lastName ?? '',
    entry.fromNumber ?? '',
    entry.toNumber ?? '',
    entry.email ?? '',
    entry.urgentCallback ? 'Y' : '',
    entry.callStatus ?? '',
    entry.disconnectionReason ?? '',
    entry.callSummary ?? '',
    typeof entry.callSuccessful === 'boolean' ? (entry.callSuccessful ? 'Y' : 'N') : entry.callSuccessful ?? '',
    entry.userSentiment ?? '',
    entry.callDurationSec ?? '',
    entry.callLog ?? '',
  ])
}

// ─────────────────────────────────────────────────────────────
// Chatbot tab
// Columns: Timestamp, Session ID, First Name, Last Name, Phone, Email,
// Property Type, Damage Type, Property Location, Claim Stage, Is Urgent,
// Has Contact Info, AI Summary, Page URL, Chat History
// ─────────────────────────────────────────────────────────────
export interface ChatbotLead {
  sessionId?: string | null
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  email?: string | null
  propertyType?: string | null
  damageType?: string | null
  propertyLocation?: string | null
  claimStage?: string | null
  isUrgent?: boolean | null
  hasContactInfo?: boolean | null
  aiSummary?: string | null
  pageUrl?: string | null
  chatHistory?: string | null
}

export async function appendChatbotLead(lead: ChatbotLead) {
  return appendRow('Chatbot', [
    new Date().toISOString(),
    lead.sessionId ?? '',
    lead.firstName ?? '',
    lead.lastName ?? '',
    lead.phone ?? '',
    lead.email ?? '',
    lead.propertyType ?? '',
    lead.damageType ?? '',
    lead.propertyLocation ?? '',
    lead.claimStage ?? '',
    lead.isUrgent ? 'Y' : '',
    lead.hasContactInfo ? 'Y' : 'N',
    lead.aiSummary ?? '',
    lead.pageUrl ?? '',
    lead.chatHistory ?? '',
  ])
}
