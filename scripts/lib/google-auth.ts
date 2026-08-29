// Shared OAuth2 "installed app" flow for the chatbot-sheet scripts — port of the
// Python scripts' `authenticate()` (google_auth_oauthlib.InstalledAppFlow.run_local_server).
//
// SETUP (same as the Python version):
// 1. Go to https://console.cloud.google.com
// 2. Create a project (or reuse one) and enable the Google Sheets API + Google Drive API
// 3. APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client ID
// 4. Application type: Desktop app
// 5. Download the JSON and save it as "credentials.json" in this same folder
// 6. Run a script — it opens your browser to authenticate and saves "token.json" for reuse

import { exec } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { google } from 'googleapis'
import type { Credentials, OAuth2Client } from 'google-auth-library'

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
]

const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json')
const TOKEN_PATH = path.join(__dirname, '..', 'token.json')

function loadClient(): OAuth2Client {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Missing credentials.json at ${CREDENTIALS_PATH}. Download an OAuth 2.0 Desktop app ` +
        `client ID from https://console.cloud.google.com and save it there.`
    )
  }
  const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'))
  const { client_id, client_secret } = keys.installed ?? keys.web
  return new google.auth.OAuth2(client_id, client_secret)
}

function openBrowser(url: string) {
  const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
  exec(`${cmd} "${url}"`)
}

function getTokenViaLocalServer(client: OAuth2Client): Promise<Credentials> {
  return new Promise((resolve, reject) => {
    let redirectUri = ''

    const server = http.createServer((req, res) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const code = url.searchParams.get('code')
      const error = url.searchParams.get('error')

      if (error) {
        res.end(`Authentication failed: ${error}. You can close this tab.`)
        server.close()
        reject(new Error(`OAuth error: ${error}`))
        return
      }
      if (!code) return

      res.end('Authentication successful — you can close this tab and return to the terminal.')
      server.close()
      client
        .getToken({ code, redirect_uri: redirectUri })
        .then(({ tokens }) => resolve(tokens))
        .catch(reject)
    })

    server.listen(0, () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      redirectUri = `http://localhost:${port}`

      const authUrl = client.generateAuthUrl({ access_type: 'offline', scope: SCOPES, redirect_uri: redirectUri })

      console.log('Authenticate in the browser window that just opened.')
      console.log(`If it did not open automatically, visit:\n${authUrl}\n`)
      openBrowser(authUrl)
    })
  })
}

export async function authenticate(): Promise<OAuth2Client> {
  const client = loadClient()

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8')) as Credentials
    client.setCredentials(token)
    return client
  }

  const token = await getTokenViaLocalServer(client)
  client.setCredentials(token)
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
  return client
}
