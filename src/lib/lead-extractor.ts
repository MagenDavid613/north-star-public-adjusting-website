// Extracts structured lead information from an assistant ↔ visitor
// conversation using Claude tool-use. Returns null fields for anything the
// visitor didn't actually say — never invents data.

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ExtractedLead {
  firstName: string | null
  lastName: string | null
  phone: string | null
  email: string | null
  ai_summary: string
  property_type: string | null
  damage_type: string | null
  property_location: string | null
  claim_stage: string | null
  is_urgent: boolean
  hasContactInfo: boolean
}

const EXTRACTION_TOOL = {
  name: 'extract_lead',
  description:
    'Extract structured lead information from a conversation between an AI intake assistant and a property owner. Use ONLY information the property owner explicitly stated. Never invent or guess. If a field was not mentioned, return null.',
  input_schema: {
    type: 'object',
    properties: {
      firstName: {
        type: ['string', 'null'],
        description: "Visitor's first name as they typed it. Null if not provided.",
      },
      lastName: {
        type: ['string', 'null'],
        description: "Visitor's last name. Null if not provided.",
      },
      phone: {
        type: ['string', 'null'],
        description:
          "Visitor's phone number, digits and standard separators only (e.g. '615-555-0123'). Null if not provided.",
      },
      email: {
        type: ['string', 'null'],
        description: "Visitor's email address, lowercased. Null if not provided.",
      },
      ai_summary: {
        type: 'string',
        description:
          '2-3 sentence neutral summary of the conversation for the intake team. Cover what damage, what property, where (city/state/ZIP if known), claim stage, and urgency. Plain language, no marketing speak. If nothing was discussed, write "Visitor opened chat but did not share details."',
      },
      property_type: {
        type: ['string', 'null'],
        description:
          "One of: 'residential', 'commercial', 'multi-unit', 'rental'. Null if unclear.",
      },
      damage_type: {
        type: ['string', 'null'],
        description:
          "Type of damage discussed (e.g. 'hail', 'wind', 'water', 'roof', 'hurricane', 'fire', 'storm'). Null if not yet discussed.",
      },
      property_location: {
        type: ['string', 'null'],
        description:
          'City, state, and/or ZIP code as the visitor described it. Null if not provided.',
      },
      claim_stage: {
        type: ['string', 'null'],
        description:
          "One of: 'not-filed', 'filed', 'underpaid', 'denied', 'need-inspection', 'second-opinion'. Null if not discussed.",
      },
      is_urgent: {
        type: 'boolean',
        description:
          'True if the situation is active or urgent: ongoing leak, structural risk, recent storm, safety concern. False otherwise.',
      },
    },
    required: ['ai_summary', 'is_urgent'],
  },
}

const EXTRACTION_SYSTEM = `You are a strict data-extraction assistant for an insurance claims intake firm.

Read the conversation between the AI assistant and a property owner (visitor) and call the extract_lead tool with what was actually said.

Rules:
- Use ONLY information the visitor explicitly stated. Never invent or guess.
- If a field was not mentioned, return null.
- Normalise phone numbers to digits with hyphens, e.g. 615-555-0123.
- Lowercase email addresses.
- Keep ai_summary neutral and factual. No marketing language.`

export async function extractLead(messages: ChatMessage[]): Promise<ExtractedLead> {
  const emptyResult: ExtractedLead = {
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    ai_summary: 'Visitor opened chat but did not share details.',
    property_type: null,
    damage_type: null,
    property_location: null,
    claim_stage: null,
    is_urgent: false,
    hasContactInfo: false,
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY missing — cannot extract lead')
    return emptyResult
  }

  if (!messages || messages.length === 0) return emptyResult

  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
    .join('\n\n')

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system: EXTRACTION_SYSTEM,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tools: [EXTRACTION_TOOL as any],
      tool_choice: { type: 'tool', name: 'extract_lead' },
      messages: [
        {
          role: 'user',
          content: `Extract lead info from this conversation:\n\n${transcript}`,
        },
      ],
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toolUse = response.content.find((c: any) => c.type === 'tool_use') as
      | { type: 'tool_use'; input: Record<string, unknown> }
      | undefined

    if (!toolUse) return emptyResult

    const data = toolUse.input as Partial<ExtractedLead>

    const result: ExtractedLead = {
      firstName: typeof data.firstName === 'string' ? data.firstName : null,
      lastName: typeof data.lastName === 'string' ? data.lastName : null,
      phone: typeof data.phone === 'string' ? data.phone : null,
      email: typeof data.email === 'string' ? data.email : null,
      ai_summary:
        typeof data.ai_summary === 'string' && data.ai_summary
          ? data.ai_summary
          : emptyResult.ai_summary,
      property_type: typeof data.property_type === 'string' ? data.property_type : null,
      damage_type: typeof data.damage_type === 'string' ? data.damage_type : null,
      property_location:
        typeof data.property_location === 'string' ? data.property_location : null,
      claim_stage: typeof data.claim_stage === 'string' ? data.claim_stage : null,
      is_urgent: Boolean(data.is_urgent),
      hasContactInfo: false,
    }

    result.hasContactInfo = Boolean(result.phone || result.email)

    return result
  } catch (err) {
    console.error('Lead extraction failed:', err instanceof Error ? err.message : err)
    return emptyResult
  }
}
