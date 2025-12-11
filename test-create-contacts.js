// Test Script: Create 2 Test Contacts in GoHighLevel CRM
// Run with: node test-create-contacts.js

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

// Load environment variables from .env.local
function loadEnv() {
  const envPath = join(__dirname, '.env.local')
  const envContent = readFileSync(envPath, 'utf-8')
  const env = {}

  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim()
    }
  })

  return env
}

const env = loadEnv()

// Test Contact Data
const testContacts = [
  {
    contact: {
      firstName: 'Sarah',
      lastName: 'Innovation',
      email: 'sarah.innovation@test.com',
      phone: '555-0001',
      businessName: 'Innovation Studios'
    },
    journeyData: {
      answers: {
        superpowerVision: 'Turn browsers into buyers automatically with AI-powered automation'
      },
      vibePersona: 'Innovation Seeker',
      leadScore: 85,
      painPoints: [
        'Website looks like it\'s from 2010',
        'No clue if my marketing actually works',
        'Spending money on tools that don\'t talk to each other'
      ],
      industryType: 'creative',
      budgetTier: 'roi-focused',
      timelineUrgency: 'next-month',
      collaborationStyle: 'collaborative',
      aiAutomationInterest: 9
    },
    aiResponse: 'Sarah, your high AI interest (9/10) and ROI-focused mindset make you a perfect fit for our automation solutions. With a lead score of 85/100, you\'re in our priority tier. Let\'s transform that 2010 website into a conversion machine!'
  },
  {
    contact: {
      firstName: 'Mike',
      lastName: 'Builder',
      email: 'mike.builder@test.com',
      phone: '555-0002',
      businessName: 'Builder Systems Co'
    },
    journeyData: {
      answers: {
        superpowerVision: 'Make my customers feel like VIPs every time they visit while handling all the boring stuff automatically'
      },
      vibePersona: 'Systems Builder',
      leadScore: 72,
      painPoints: [
        'Doing the same repetitive tasks every damn day',
        'Managing everything myself instead of running my business',
        'Customers can\'t figure out how to book/buy on mobile'
      ],
      industryType: 'home',
      budgetTier: 'weekly-250',
      timelineUrgency: '2-3-months',
      collaborationStyle: 'magic-maker',
      aiAutomationInterest: 7
    },
    aiResponse: 'Mike, you\'re drowning in repetitive tasks - exactly what we solve! Your "magic-maker" collaboration style means we\'ll create something exceptional together. Lead score: 72/100 (Hot tier). Let\'s automate those boring tasks and get you back to building!'
  }
]

async function createContact(contactData) {
  const { contact, journeyData, aiResponse } = contactData

  // Calculate lead score
  const leadScore = journeyData.leadScore

  // Build comprehensive notes
  const comprehensiveNotes = `🚀 VIBE JOURNEY COMPLETED (${new Date().toLocaleDateString()})

🔥 LEAD SCORE: ${leadScore}/100
✨ VIBE PERSONA: ${journeyData.vibePersona}
🏢 INDUSTRY: ${journeyData.industryType}
⚡ URGENCY: ${journeyData.timelineUrgency}
🤖 AI AUTOMATION INTEREST: ${journeyData.aiAutomationInterest}/10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 JOURNEY ANSWERS:

🦸 BUSINESS SUPERPOWER VISION:
"${journeyData.answers.superpowerVision}"

😤 CURRENT FRUSTRATIONS:
${journeyData.painPoints.map(p => `• ${p}`).join('\n')}

💰 BUDGET TIER: ${journeyData.budgetTier}
⏰ TIMELINE: ${journeyData.timelineUrgency}
🤝 COLLABORATION STYLE: ${journeyData.collaborationStyle}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 AI PERSONALIZED RESPONSE:

${aiResponse}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 JOURNEY INSIGHTS:
• Lead Quality: ${leadScore >= 71 ? 'Priority' : leadScore >= 51 ? 'Hot' : 'Warm'}
• Pain Points Count: ${journeyData.painPoints.length}
• AI Readiness: ${journeyData.aiAutomationInterest >= 7 ? 'High' : 'Medium'}

Generated via TEST SCRIPT - Raize the Vibe Journey
  `

  // Create contact payload
  const contactPayload = {
    locationId: env.GHL_LOCATION_ID,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
    companyName: contact.businessName || '',
    source: 'vibe-journey-test',
    tags: [
      'vibe-journey-lead',
      'journey-completed',
      'TEST-CONTACT',
      journeyData.vibePersona,
      `lead-score-${Math.floor(leadScore / 10) * 10}`,
      journeyData.industryType,
      ...(leadScore >= 71 ? ['priority-lead'] : []),
      ...(leadScore >= 51 ? ['hot-lead'] : []),
      ...(journeyData.aiAutomationInterest >= 7 ? ['ai-enthusiast'] : [])
    ],
    customFields: [
      { key: 'journey_completed', field_value: new Date().toISOString().split('T')[0] },
      { key: 'lead_score', field_value: leadScore.toString() },
      { key: 'vibe_persona', field_value: journeyData.vibePersona },
      { key: 'industry_type', field_value: journeyData.industryType },
      { key: 'budget_tier', field_value: journeyData.budgetTier },
      { key: 'timeline_urgency', field_value: journeyData.timelineUrgency },
      { key: 'collaboration_style', field_value: journeyData.collaborationStyle },
      { key: 'ai_automation_interest', field_value: journeyData.aiAutomationInterest.toString() },
      { key: 'pain_points', field_value: journeyData.painPoints.join(', ') },
      { key: 'superpower_vision', field_value: journeyData.answers.superpowerVision },
      { key: 'ai_response', field_value: aiResponse }
    ]
  }

  console.log(`\n📤 Creating contact: ${contact.firstName} ${contact.lastName} (${contact.email})...`)

  try {
    // Create contact
    const response = await fetch(`${GHL_API_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': GHL_API_VERSION
      },
      body: JSON.stringify(contactPayload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GHL API error: ${response.status} - ${errorText}`)
    }

    const ghlContact = await response.json()
    const contactId = ghlContact.contact?.id

    console.log(`✅ Contact created successfully!`)
    console.log(`   Contact ID: ${contactId}`)
    console.log(`   Lead Score: ${leadScore}/100`)
    console.log(`   Vibe Persona: ${journeyData.vibePersona}`)

    // Add comprehensive notes
    if (contactId) {
      console.log(`   Adding comprehensive notes...`)

      const notesResponse = await fetch(`${GHL_API_BASE}/contacts/${contactId}/notes/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': GHL_API_VERSION
        },
        body: JSON.stringify({ body: comprehensiveNotes })
      })

      if (notesResponse.ok) {
        console.log(`   ✅ Notes added successfully`)
      } else {
        console.log(`   ⚠️  Notes failed (non-critical)`)
      }
    }

    return { success: true, contactId, contact }

  } catch (error) {
    console.error(`❌ Error creating contact:`, error.message)
    return { success: false, error: error.message, contact }
  }
}

async function runTests() {
  console.log('🚀 VIBE JOURNEY - Test Contact Creation Script')
  console.log('=' .repeat(60))
  console.log(`📍 Location ID: ${env.GHL_LOCATION_ID}`)
  console.log(`🔑 API Key: ${env.GHL_API_KEY ? `${env.GHL_API_KEY.substring(0, 15)}...` : 'MISSING'}`)
  console.log('=' .repeat(60))

  const results = []

  for (const testContact of testContacts) {
    const result = await createContact(testContact)
    results.push(result)

    // Wait 1 second between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST RESULTS SUMMARY')
  console.log('='.repeat(60))

  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length

  console.log(`✅ Successful: ${successful}/${testContacts.length}`)
  console.log(`❌ Failed: ${failed}/${testContacts.length}`)

  if (successful > 0) {
    console.log('\n✨ Test contacts created successfully!')
    console.log('👉 Check your GoHighLevel CRM to see the contacts with:')
    console.log('   - Tag: TEST-CONTACT')
    console.log('   - Comprehensive journey data in notes')
    console.log('   - Custom fields populated')
    console.log('   - Lead scores calculated')
  }

  if (failed > 0) {
    console.log('\n⚠️  Some contacts failed to create. Check errors above.')
  }

  console.log('\n' + '='.repeat(60))
}

// Run the tests
runTests().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exit(1)
})
