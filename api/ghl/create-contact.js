// Vercel Serverless Function: Create Contact in GoHighLevel
// POST /api/ghl/create-contact

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate environment variables
    if (!process.env.GHL_LOCATION_ID || !process.env.GHL_API_KEY) {
      console.error('Missing GHL credentials')
      return res.status(503).json({ error: 'Integration service unavailable' })
    }

    const { contact, journeyData, aiResponse } = req.body

    // Validate required fields
    if (!contact || !contact.firstName || !contact.email) {
      return res.status(400).json({ error: 'Missing required contact fields' })
    }

    // Calculate lead score from journey data
    const leadScore = journeyData?.leadScore || calculateLeadScore(journeyData || {})

    // Create comprehensive notes with all journey data
    const comprehensiveNotes = buildComprehensiveNotes(contact, journeyData, aiResponse, leadScore)

    // Prepare GHL contact payload for V2 API
    const contactPayload = {
      locationId: process.env.GHL_LOCATION_ID,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone || '',
      companyName: contact.businessName || '',
      source: 'vibe-journey',
      tags: [
        'vibe-journey-lead',
        'journey-completed',
        journeyData?.vibePersona || 'persona-pending',
        `lead-score-${Math.floor(leadScore / 10) * 10}`,
        journeyData?.industryType || 'industry-unknown',
        ...(leadScore >= 71 ? ['priority-lead'] : []),
        ...(leadScore >= 51 ? ['hot-lead'] : []),
        ...(journeyData?.aiAutomationInterest >= 7 ? ['ai-enthusiast'] : [])
      ],
      customFields: [
        { key: 'journey_completed', field_value: new Date().toISOString().split('T')[0] },
        { key: 'lead_score', field_value: leadScore.toString() },
        { key: 'vibe_persona', field_value: journeyData?.vibePersona || 'Not assigned' },
        { key: 'industry_type', field_value: journeyData?.industryType || '' },
        { key: 'budget_tier', field_value: journeyData?.budgetTier || '' },
        { key: 'timeline_urgency', field_value: journeyData?.timelineUrgency || '' },
        { key: 'collaboration_style', field_value: journeyData?.collaborationStyle || '' },
        { key: 'ai_automation_interest', field_value: (journeyData?.aiAutomationInterest || 0).toString() },
        { key: 'pain_points', field_value: journeyData?.painPoints?.join(', ') || '' },
        { key: 'superpower_vision', field_value: journeyData?.answers?.superpowerVision || '' },
        { key: 'ai_response', field_value: aiResponse || 'Pending generation' },
        { key: 'journey_notes', field_value: comprehensiveNotes }
      ]
    }

    // Create contact in GoHighLevel using V2 API
    const response = await fetch(`${GHL_API_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': GHL_API_VERSION
      },
      body: JSON.stringify(contactPayload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GHL API Error:', response.status, errorText)
      throw new Error(`GHL API error: ${response.status}`)
    }

    const ghlContact = await response.json()
    const contactId = ghlContact.contact?.id

    // Add comprehensive notes as a separate API call
    if (contactId) {
      try {
        await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': GHL_API_VERSION
          },
          body: JSON.stringify({ body: comprehensiveNotes })
        })
      } catch (notesError) {
        console.error('Failed to add notes (non-critical):', notesError)
      }
    }

    console.log('GHL Contact Created:', {
      timestamp: new Date().toISOString(),
      contactId,
      leadScore,
      vibePersona: journeyData?.vibePersona
    })

    return res.status(200).json({
      success: true,
      contactId,
      leadScore,
      message: 'Contact created successfully'
    })

  } catch (error) {
    console.error('Contact Creation Error:', error.message)
    return res.status(500).json({
      error: 'Failed to create contact',
      fallback: true,
      message: "Something went wrong with our system. Let's jump straight to a call!"
    })
  }
}

// Calculate lead score from journey data
function calculateLeadScore(journeyData) {
  let score = 0

  if (journeyData.answers?.superpowerVision?.length > 50) score += 5
  const painPointCount = journeyData.painPoints?.length || 0
  score += Math.min(painPointCount * 3, 24)
  score += journeyData.aiAutomationInterest || 0

  const budgetScores = {
    'one-time-small': 3,
    'weekly-250': 8,
    'roi-focused': 12,
    'money-no-object': 15,
    'value-first': 5
  }
  score += budgetScores[journeyData.budgetTier] || 0

  const timelineScores = {
    'urgent': 10,
    'next-month': 8,
    '2-3-months': 5,
    '3-6-months': 3,
    'exploring': 0
  }
  score += timelineScores[journeyData.timelineUrgency] || 0

  const collaborationScores = {
    'magic-maker': 10,
    'collaborative': 8,
    'hands-off': 6,
    'spec-driven': 2,
    'high-communication': 5
  }
  score += collaborationScores[journeyData.collaborationStyle] || 0

  return Math.min(score, 100)
}

function buildComprehensiveNotes(contact, journeyData, aiResponse, leadScore) {
  return `🚀 VIBE JOURNEY COMPLETED (${new Date().toLocaleDateString()})

🔥 LEAD SCORE: ${leadScore}/100
✨ VIBE PERSONA: ${journeyData?.vibePersona || 'Not assigned'}
🏢 INDUSTRY: ${journeyData?.industryType || 'Not specified'}
⚡ URGENCY: ${journeyData?.timelineUrgency || 'Not specified'}
🤖 AI AUTOMATION INTEREST: ${journeyData?.aiAutomationInterest || 'N/A'}/10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 JOURNEY ANSWERS:

🦸 BUSINESS SUPERPOWER VISION:
"${journeyData?.answers?.superpowerVision || 'Not provided'}"

😤 CURRENT FRUSTRATIONS:
${journeyData?.painPoints?.length ? journeyData.painPoints.map(p => `• ${p}`).join('\n') : '• Not specified'}

💰 BUDGET TIER:
${journeyData?.budgetTier || 'Not specified'}

⏰ TIMELINE:
${journeyData?.timelineUrgency || 'Not specified'}

🤝 COLLABORATION STYLE:
${journeyData?.collaborationStyle || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PERSONALIZED RESPONSE:

${aiResponse || 'AI response pending'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 JOURNEY INSIGHTS:
• Lead Quality: ${leadScore >= 71 ? 'Priority' : leadScore >= 51 ? 'Hot' : leadScore >= 31 ? 'Warm' : 'Nurture'}
• Pain Points Count: ${journeyData?.painPoints?.length || 0}
• AI Readiness: ${journeyData?.aiAutomationInterest >= 7 ? 'High' : journeyData?.aiAutomationInterest >= 4 ? 'Medium' : 'Low'}

Generated via Raize the Vibe Journey: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://journey.raizethevibe.com'}
  `.trim()
}
