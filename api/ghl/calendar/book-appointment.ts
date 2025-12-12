import type { VercelRequest, VercelResponse } from '@vercel/node'

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'
const CHRIX_PHONE = '+13214668774' // Chrix's phone number for SMS Magic Trick

interface BookingPayload {
  slotId: string
  startTime: string
  name: string
  email: string
  phone: string
  contactId: string
  journeyData?: {
    leadScore?: number
    vibePersona?: string
    industryType?: string
    painPoints?: string[]
    budgetTier?: string
    timelineUrgency?: string
    aiAutomationInterest?: number
  }
}

function buildSMSURI(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  return `sms:${cleanPhone}?&body=${encodeURIComponent(message)}`
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
    const {
      slotId,
      startTime,
      name,
      email,
      phone,
      contactId,
      journeyData
    }: BookingPayload = req.body

    // Validate required fields
    if (!slotId || !startTime || !name || !email || !phone || !contactId) {
      return res.status(400).json({ error: 'Missing required booking fields' })
    }

    // Get environment variables
    const GHL_API_KEY = process.env.GHL_API_KEY
    const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID

    if (!GHL_API_KEY || !GHL_CALENDAR_ID) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // Get location ID from environment
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID

    if (!GHL_LOCATION_ID) {
      return res.status(500).json({ error: 'Server configuration error: missing location ID' })
    }

    // Book appointment in GHL
    const appointmentPayload = {
      calendarId: GHL_CALENDAR_ID,
      locationId: GHL_LOCATION_ID,
      contactId,
      startTime: slotId, // Use the slot ID as the start time (ISO timestamp)
      title: 'Vibe Journey Call',
      appointmentStatus: 'confirmed'
    }

    const appointmentResponse = await fetch(
      `${GHL_API_BASE}/calendars/events/appointments`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': GHL_API_VERSION
        },
        body: JSON.stringify(appointmentPayload)
      }
    )

    if (!appointmentResponse.ok) {
      const errorData = await appointmentResponse.json()
      console.error('GHL Appointment Booking Error:', errorData)
      return res.status(appointmentResponse.status).json({
        error: 'Failed to book appointment',
        details: errorData
      })
    }

    const appointmentData = await appointmentResponse.json()
    const appointmentId = appointmentData.id || appointmentData.appointmentId

    if (!appointmentId) {
      return res.status(500).json({ error: 'Appointment created but ID not returned' })
    }

    // Format appointment date/time for SMS
    const appointmentDate = new Date(startTime)
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    // Build SMS message for Magic Trick
    const leadScore = journeyData?.leadScore || 0
    const vibePersona = journeyData?.vibePersona || 'Unknown Persona'
    const painPoints = journeyData?.painPoints?.join(', ') || 'Not specified'

    const smsMessage = `Hey Chrix! 🎉 ${name} just booked a Vibe Journey call!

📊 Lead Score: ${leadScore}/100
🎭 Vibe Persona: ${vibePersona}
📅 Call: ${formattedDate} at ${formattedTime}

😫 Pain Points: ${painPoints}

Get hyped! 🚀

- Sent via SMS Magic Trick ✨`

    // Build SMS data for frontend
    const smsData = {
      phone: CHRIX_PHONE,
      message: smsMessage,
      uri: buildSMSURI(CHRIX_PHONE, smsMessage)
    }

    // Return success with SMS data
    return res.status(200).json({
      success: true,
      appointmentId,
      smsData,
      message: 'Appointment booked successfully'
    })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
