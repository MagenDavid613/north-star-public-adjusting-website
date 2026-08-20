// Local-testing-only path. Ollama runs on localhost and is NOT reachable from
// the deployed Vercel site — this exists purely so the chat flow can be tested
// on this machine while ANTHROPIC_API_KEY is unavailable/unfunded. Gated by
// USE_OLLAMA=true in .env.local; production must keep using Anthropic.

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen3:4b'

interface OllamaMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function ollamaChat(messages: OllamaMessage[]): Promise<string> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: OLLAMA_MODEL, messages, stream: false }),
  })

  if (!res.ok) {
    throw new Error(`Ollama request failed: ${res.status} ${await res.text()}`)
  }

  const data = await res.json()
  const content: string = data.message?.content ?? ''

  // Qwen3 is a reasoning model — strip its <think>...</think> trace so only
  // the actual reply reaches the widget.
  return content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()
}
