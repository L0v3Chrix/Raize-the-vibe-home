// Vercel Serverless Function: GoHighLevel Appointment Booking
// POST /api/ghl/calendar/book-appointment
// Includes SMS Magic Trick trigger after successful booking

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'
const MAGIC_TRICK_PHONE = '3214668774'

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let ghlContactId = null
  let startTime = ''

  try {
    // Validate environment variables
    if (!process.env.GHL_LOCATION_ID || !process.env.GHL_API_KEY || !process.env.GHL_CALENDAR_ID) {
      console.error('Missing GHL credentials or calendar ID')
      return res.status(503).json({ error: 'Calendar booking service unavailable' })
    }

    const { slotId, startTime: validatedStartTime, name, email, phone, contactId, journeyData } = req.body

    // Validate required fields
    if (!slotId || !validatedStartTime || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required booking fields' })
    }

    startTime = validatedStartTime
    ghlContactId = contactId || null

    // Step 1: Create or use existing contact in GHL
    if (!ghlContactId) {
      console.log('Creating new contact in GHL...')

      const contactPayload = {
        locationId: process.env.GHL_LOCATION_ID,
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || '',
        email: email,
        phone: phone,
        source: 'Vibe Journey'
      }

      const contactResponse = await fetch(`${GHL_API_BASE}/contacts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': GHL_API_VERSION
        },
        body: JSON.stringify(contactPayload)
      })

      if (!contactResponse.ok) {
        const contactError = await contactResponse.text()
        console.error('GHL Contact Creation Error:', contactResponse.status, contactError)

        // Try to extract existing contact ID from duplicate error
        try {
          const errorData = JSON.parse(contactError)
          if (errorData.meta?.contactId) {
            ghlContactId = errorData.meta.contactId
            console.log('Found existing contact ID:', ghlContactId)
          }
        } catch (e) {
          console.log('Could not parse contact error response')
        }
      } else {
        const contactResult = await contactResponse.json()
        ghlContactId = contactResult.contact?.id || contactResult.id
        console.log('✅ Contact created with ID:', ghlContactId)

        // Add tags to the contact
        if (ghlContactId) {
          const tagsPayload = {
            tags: ['vibe-journey-lead', 'journey-completed', 'appointment-booked']
          }

          await fetch(`${GHL_API_BASE}/contacts/${ghlContactId}/tags`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
              'Content-Type': 'application/json',
              'Version': GHL_API_VERSION
            },
            body: JSON.stringify(tagsPayload)
          }).catch(err => console.error('Tag addition failed:', err))

          // Add comprehensive notes
          const notesText = buildComprehensiveNotes(name, email, phone, startTime, journeyData)

          await fetch(`${GHL_API_BASE}/contacts/${ghlContactId}/notes/`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
              'Content-Type': 'application/json',
              'Version': GHL_API_VERSION
            },
            body: JSON.stringify({ body: notesText })
          }).catch(err => console.error('Note addition failed:', err))
        }
      }
    }

    // Step 2: Book appointment in GoHighLevel
    const startTimeObj = new Date(startTime)
    const endTimeObj = new Date(startTimeObj.getTime() + 30 * 60 * 1000) // 30-minute call

    const appointmentPayload = {
      locationId: process.env.GHL_LOCATION_ID,
      calendarId: process.env.GHL_CALENDAR_ID,
      contactId: ghlContactId,
      startTime: startTimeObj.toISOString(),
      endTime: endTimeObj.toISOString(),
      title: `Vibe Journey Call - ${name}`,
      appointmentStatus: "confirmed",
      toNotify: true,
      notes: `Journey Lead Score: ${journeyData?.leadScore || 'N/A'}/100\nPersona: ${journeyData?.vibePersona || 'N/A'}\nIndustry: ${journeyData?.industryType || 'N/A'}`,
      additionalNotes: [
        `Contact: ${name} (${email})`,
        `Phone: ${phone}`,
        `Lead Score: ${journeyData?.leadScore || 'N/A'}/100`,
        `Vibe Persona: ${journeyData?.vibePersona || 'N/A'}`,
        `Industry: ${journeyData?.industryType || 'N/A'}`,
        `Source: Vibe Journey Landing Page`
      ].join('\n')
    }

    console.log('Creating appointment...')

    // Try multiple GHL V2 appointment endpoints
    const appointmentEndpoints = [
      `/calendars/events/appointments`,
      `/calendars/${process.env.GHL_CALENDAR_ID}/events/appointments`,
      `/locations/${process.env.GHL_LOCATION_ID}/appointments`
    ]

    let response = null
    let lastError = ''

    for (const endpoint of appointmentEndpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`)
        response = await fetch(`${GHL_API_BASE}${endpoint}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': GHL_API_VERSION
          },
          body: JSON.stringify(appointmentPayload)
        })

        if (response.ok) {
          console.log(`✅ Success with endpoint: ${endpoint}`)
          break
        } else {
          const errorText = await response.text()
          lastError = `${endpoint}: ${response.status} - ${errorText}`
          console.log(`❌ Failed: ${lastError}`)
        }
      } catch (error) {
        lastError = `${endpoint}: ${error.message}`
        console.log(`❌ Error: ${lastError}`)
      }
    }

    // Handle appointment booking failure
    if (!response || !response.ok) {
      console.error('All appointment endpoints failed:', lastError)

      return res.status(200).json({
        success: true,
        appointmentId: `manual-${Date.now()}`,
        contactId: ghlContactId,
        startTime,
        message: 'Thanks for booking! We have your details.',
        nextSteps: [
          'We\'ll send you a calendar invite within 24 hours',
          'Check your email for confirmation details'
        ],
        fallbackMode: true,
        smsData: null
      })
    }

    const appointmentData = await response.json()
    const appointmentId = appointmentData.id

    console.log('✅ Appointment booked successfully:', appointmentId)

    // Step 3: Generate SMS Magic Trick data
    const smsData = generateSMSMagicTrickData({
      name,
      appointmentTime: startTime,
      leadScore: journeyData?.leadScore,
      vibePersona: journeyData?.vibePersona,
      industryType: journeyData?.industryType,
      painPoints: journeyData?.painPoints,
      phone: MAGIC_TRICK_PHONE
    })

    return res.status(200).json({
      success: true,
      appointmentId,
      contactId: ghlContactId,
      startTime,
      message: 'Vibe journey call booked successfully!',
      nextSteps: [
        'Check your email for confirmation details',
        'We\'ll send a calendar invite shortly',
        'Prepare any questions for our call'
      ],
      smsData
    })

  } catch (error) {
    console.error('Appointment Booking Error:', error.message)

    // If contact was created, return graceful fallback
    if (ghlContactId) {
      return res.status(200).json({
        success: true,
        appointmentId: `error-${Date.now()}`,
        contactId: ghlContactId,
        startTime,
        message: 'Thanks for your interest! We have your details.',
        nextSteps: [
          'We\'ll send you a calendar invite within 24 hours',
          'Check your email for follow-up details'
        ],
        fallbackMode: true,
        smsData: null
      })
    }

    return res.status(500).json({
      error: 'Failed to book appointment',
      fallback: true,
      message: 'Something went wrong. We\'ll follow up with you directly via email.'
    })
  }
}

function buildComprehensiveNotes(name, email, phone, startTime, journeyData) {
  return `🚀 VIBE JOURNEY COMPLETED & APPOINTMENT BOOKED
${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

📊 JOURNEY RESULTS:
• Lead Score: ${journeyData?.leadScore || 'N/A'}/100
• Vibe Persona: ${journeyData?.vibePersona || 'Not assigned'}
• Industry: ${journeyData?.industryType || 'Not specified'}
• AI Interest: ${journeyData?.aiAutomationInterest || 'N/A'}/10

📅 APPOINTMENT:
• Scheduled: ${new Date(startTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
• Contact: ${name}
• Email: ${email}
• Phone: ${phone}

😤 PAIN POINTS:
${journeyData?.painPoints?.map(p => `• ${p}`).join('\n') || '• Not specified'}

💰 BUDGET TIER: ${journeyData?.budgetTier || 'Not specified'}
⏰ TIMELINE: ${journeyData?.timelineUrgency || 'Not specified'}

📍 SOURCE: Vibe Journey Landing Page
⚡ STATUS: Appointment Confirmed - Ready for Discovery Call`
}

function generateSMSMagicTrickData(params) {
  const appointmentDate = new Date(params.appointmentTime)
  const formattedDateTime = appointmentDate.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  const message = `🎉 VIBE JOURNEY COMPLETED!

Hey! ${params.name} just booked a call with you!

📅 ${formattedDateTime}

📊 Journey Snapshot:
• Lead Score: ${params.leadScore || 'N/A'}/100
• Vibe Persona: ${params.vibePersona || 'Not assigned'}
• Industry: ${params.industryType || 'Not specified'}

😤 Their Pain Points:
${params.painPoints?.map(p => `• ${p}`).join('\n') || '• Not specified'}

🔥 They're ready to explore how Raize The Vibe can help transform their business!

Check GHL for full journey data and prep for an awesome discovery call! 🚀`

  const uri = `sms:${params.phone}?&body=${encodeURIComponent(message)}`

  return {
    phone: params.phone,
    message,
    uri
  }
}
