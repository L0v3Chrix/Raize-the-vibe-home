// Vercel Serverless Function: GoHighLevel Calendar Availability
// GET /api/ghl/calendar/availability
// Shows only next 72 hours of availability

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_API_VERSION = '2021-07-28'

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate environment variables
    if (!process.env.GHL_LOCATION_ID || !process.env.GHL_API_KEY || !process.env.GHL_CALENDAR_ID) {
      console.error('Missing GHL credentials or calendar ID')
      return res.status(503).json({ error: 'Calendar service unavailable' })
    }

    const { startDate: startDateParam, endDate: endDateParam } = req.query
    const startDateStr = startDateParam || new Date().toISOString().split('T')[0]

    // JOURNEY-SPECIFIC: Only show next 72 hours (3 days)
    const endDateStr = endDateParam ||
      new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString().split('T')[0]

    // Convert date strings to timestamps (milliseconds)
    const startDate = new Date(startDateStr).getTime()
    const endDate = new Date(endDateStr).getTime()

    console.log('Fetching calendar availability:', {
      startDate: startDateStr,
      endDate: endDateStr,
      window: '72 hours',
      calendarId: process.env.GHL_CALENDAR_ID
    })

    // Fetch calendar slots from GoHighLevel using V2 API
    const response = await fetch(
      `${GHL_API_BASE}/calendars/${process.env.GHL_CALENDAR_ID}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=America/Chicago`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': GHL_API_VERSION,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GHL Calendar API Error:', response.status, errorText)
      throw new Error(`GHL Calendar API error: ${response.status}`)
    }

    const calendarData = await response.json()

    // Transform GHL API response format (grouped by date) to flat array of slots
    const allSlots = transformGHLSlotsResponse(calendarData)

    // Filter slots within 72-hour window
    const filteredSlots = filterSlotsWithin72Hours(allSlots)

    console.log(`Found ${filteredSlots.length} available slots in next 72 hours`)

    return res.status(200).json({
      slots: filteredSlots,
      timezone: 'America/Chicago',
      calendarId: process.env.GHL_CALENDAR_ID,
      window: '72 hours'
    })

  } catch (error) {
    console.error('Calendar Availability Error:', error.message)
    return res.status(500).json({
      error: 'Failed to fetch calendar availability',
      fallback: true
    })
  }
}

function transformGHLSlotsResponse(calendarData) {
  const slots = []

  // GHL API returns slots grouped by date
  for (const [date, dateData] of Object.entries(calendarData)) {
    if (date === 'traceId') continue

    const dateSlots = dateData?.slots || []

    dateSlots.forEach((timeSlot) => {
      slots.push({
        id: `${date}_${timeSlot}`,
        startTime: timeSlot,
        endTime: new Date(new Date(timeSlot).getTime() + 30 * 60 * 1000).toISOString(),
        available: true,
        date: date
      })
    })
  }

  return slots
}

function filterSlotsWithin72Hours(slots) {
  const now = Date.now()
  const seventyTwoHoursFromNow = now + (72 * 60 * 60 * 1000)

  return slots.filter(slot => {
    const slotTime = new Date(slot.startTime).getTime()
    return slotTime >= now && slotTime <= seventyTwoHoursFromNow && slot.available === true
  }).map(slot => {
    const slotDate = new Date(slot.startTime)
    return {
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      available: slot.available,
      dayOfWeek: slotDate.toLocaleDateString('en-US', { weekday: 'long' }),
      date: slotDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      timeSlot: slotDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      urgency: calculateUrgency(slotDate.getTime() - now)
    }
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
}

function calculateUrgency(msUntilSlot) {
  const hoursUntilSlot = msUntilSlot / (60 * 60 * 1000)
  if (hoursUntilSlot <= 6) return 'immediate'
  if (hoursUntilSlot <= 24) return 'soon'
  return 'available'
}
