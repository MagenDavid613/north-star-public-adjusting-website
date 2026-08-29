// Small Sheets/Drive API v4 helpers — port of the Python scripts' gspread-based
// `set_header_row`, `col_width`, `ws.append_row(s)`, and `sh.share(...)` calls.

import type { sheets_v4 } from 'googleapis'

export const NAVY = { red: 0.051, green: 0.118, blue: 0.235 }

export type Row = (string | number)[]

export async function appendRows(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetTitle: string,
  rows: Row[]
) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetTitle}'!A1`,
    valueInputOption: 'RAW',
    requestBody: { values: rows },
  })
}

export async function clearSheet(sheets: sheets_v4.Sheets, spreadsheetId: string, sheetTitle: string) {
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `'${sheetTitle}'!A:Z`,
  })
}

export async function formatHeaderRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetId: number,
  bgColor: { red: number; green: number; blue: number } = NAVY
) {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                backgroundColor: bgColor,
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)',
          },
        },
      ],
    },
  })
}

export function colWidthRequests(sheetId: number, widths: number[]): sheets_v4.Schema$Request[] {
  return widths.map((pixelSize, i) => ({
    updateDimensionProperties: {
      range: { sheetId, dimension: 'COLUMNS', startIndex: i, endIndex: i + 1 },
      properties: { pixelSize },
      fields: 'pixelSize',
    },
  }))
}

export async function shareAnyoneReader(drive: import('googleapis').drive_v3.Drive, fileId: string) {
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  })
}
