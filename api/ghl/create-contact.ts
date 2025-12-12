import type { VercelRequest, VercelResponse } from '@vercel/node'

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

interface ContactPayload {
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
    businessName?: string
  }
  journeyData: {
    answers?: Record<string, any>
    vibePersona?: string
    leadScore?: number
    painPoints?: string[]
    industryType?: string
    budgetTier?: string
    timelineUrgency?: string
    collaborationStyle?: string
    aiAutomationInterest?: number
  }
  aiResponse?: string
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { contact, journeyData, aiResponse }: ContactPayload = req.body

    // Validate required fields
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
      return res.status(400).json({ error: 'Missing required contact fields' })
    }

    // Get environment variables
    const GHL_API_KEY = process.env.GHL_API_KEY
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // Calculate lead score if not provided
    const leadScore = journeyData.leadScore || 50

    // Build tags array
    const tags = [
      'vibe-journey-lead',
      'journey-completed',
      journeyData.vibePersona || 'Unknown Persona',
      `lead-score-${Math.floor(leadScore / 10) * 10}`,
      journeyData.industryType || 'unknown-industry',
      ...(leadScore >= 71 ? ['priority-lead'] : []),
      ...(leadScore >= 51 ? ['hot-lead'] : []),
      ...((journeyData.aiAutomationInterest || 0) >= 7 ? ['ai-enthusiast'] : [])
    ]

    // Build custom fields array
    const customFields = [
      { key: 'journey_completed', field_value: new Date().toISOString().split('T')[0] },
      { key: 'lead_score', field_value: leadScore.toString() },
      { key: 'vibe_persona', field_value: journeyData.vibePersona || 'Unknown' },
      { key: 'industry_type', field_value: journeyData.industryType || 'Unknown' },
      { key: 'budget_tier', field_value: journeyData.budgetTier || 'Unknown' },
      { key: 'timeline_urgency', field_value: journeyData.timelineUrgency || 'Unknown' },
      { key: 'collaboration_style', field_value: journeyData.collaborationStyle || 'Unknown' },
      { key: 'ai_automation_interest', field_value: (journeyData.aiAutomationInterest || 0).toString() },
      { key: 'pain_points', field_value: journeyData.painPoints?.join(', ') || 'Not specified' },
      { key: 'superpower_vision', field_value: journeyData.answers?.superpowerVision || 'Not specified' }
    ]

    // Create contact in GHL
    const contactPayload = {
      locationId: GHL_LOCATION_ID,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      companyName: contact.businessName || '',
      source: 'vibe-journey',
      tags,
      customFields
    }

    const contactResponse = await fetch(`${GHL_API_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': GHL_API_VERSION
      },
      body: JSON.stringify(contactPayload)
    })

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json()
      console.error('GHL Contact Creation Error:', errorData)
      return res.status(contactResponse.status).json({
        error: 'Failed to create contact in CRM',
        details: errorData
      })
    }

    const contactData = await contactResponse.json()
    const contactId = contactData.contact?.id

    if (!contactId) {
      return res.status(500).json({ error: 'Contact created but ID not returned' })
    }

    // Build comprehensive notes
    const notes = `
🎯 VIBE JOURNEY COMPLETED

LEAD SCORE: ${leadScore}/100
VIBE PERSONA: ${journeyData.vibePersona || 'Unknown'}
INDUSTRY: ${journeyData.industryType || 'Unknown'}

PAIN POINTS:
${journeyData.painPoints?.map(p => `- ${p}`).join('\n') || '- Not specified'}

SUPERPOWER VISION:
${journeyData.answers?.superpowerVision || 'Not specified'}

BUDGET TIER: ${journeyData.budgetTier || 'Unknown'}
TIMELINE: ${journeyData.timelineUrgency || 'Unknown'}
COLLABORATION STYLE: ${journeyData.collaborationStyle || 'Unknown'}
AI AUTOMATION INTEREST: ${journeyData.aiAutomationInterest || 0}/10

${aiResponse ? `AI PERSONALIZED RESPONSE:\n${aiResponse}` : ''}

---
Generated: ${new Date().toISOString()}
Source: Raize The Vibe Journey Quiz
`.trim()

    // Add notes to contact
    await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': GHL_API_VERSION
      },
      body: JSON.stringify({ body: notes })
    })

    // Return success
    return res.status(200).json({
      success: true,
      contactId,
      message: 'Contact created successfully in GoHighLevel CRM'
    })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
