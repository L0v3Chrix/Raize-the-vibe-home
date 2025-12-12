import type { VercelRequest, VercelResponse } from '@vercel/node'

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

interface CalendarSlot {
  id: string
  startTime: string
  endTime: string
  available: boolean
  dayOfWeek: string
  date: string
  timeSlot: string
  urgency?: 'immediate' | 'soon' | 'available'
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get environment variables
    const GHL_API_KEY = process.env.GHL_API_KEY
    const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID

    if (!GHL_API_KEY || !GHL_CALENDAR_ID) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // Calculate time range (next 72 hours)
    const now = new Date()
    const endDate = new Date(now.getTime() + 72 * 60 * 60 * 1000) // 72 hours from now

    // Fetch available slots from GHL
    const response = await fetch(
      `${GHL_API_BASE}/calendars/${GHL_CALENDAR_ID}/free-slots?startDate=${now.toISOString()}&endDate=${endDate.toISOString()}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': GHL_API_VERSION
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('GHL Calendar API Error:', errorData)
      return res.status(response.status).json({
        error: 'Failed to fetch calendar availability',
        details: errorData
      })
    }

    const data = await response.json()
    const ghlSlots = data.slots || []

    // Transform GHL slots to our CalendarSlot format
    const slots: CalendarSlot[] = ghlSlots.map((slot: any) => {
      const startTime = new Date(slot.startTime)
      const endTime = new Date(slot.endTime)

      // Calculate urgency based on how soon the slot is
      const hoursUntil = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60)
      let urgency: 'immediate' | 'soon' | 'available' = 'available'
      if (hoursUntil < 24) urgency = 'immediate'
      else if (hoursUntil < 48) urgency = 'soon'

      return {
        id: slot.id || `${slot.startTime}-${slot.endTime}`,
        startTime: slot.startTime,
        endTime: slot.endTime,
        available: true,
        dayOfWeek: startTime.toLocaleDateString('en-US', { weekday: 'long' }),
        date: startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        timeSlot: startTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        urgency
      }
    })

    // Filter to only next 72 hours and sort by start time
    const filteredSlots = slots
      .filter(slot => {
        const slotTime = new Date(slot.startTime)
        return slotTime <= endDate
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

    return res.status(200).json({
      slots: filteredSlots,
      count: filteredSlots.length
    })

  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
