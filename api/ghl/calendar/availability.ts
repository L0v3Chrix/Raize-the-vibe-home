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

function isBusinessDay(date: Date): boolean {
  const day = date.getDay()
  return day !== 0 && day !== 6 // Not Sunday (0) or Saturday (6)
}

function getTimePeriod(slot: CalendarSlot): 'morning' | 'afternoon' | 'excluded' {
  const startTime = new Date(slot.startTime)
  const hour = startTime.getHours()

  // Morning: 9am-12pm
  if (hour >= 9 && hour < 12) return 'morning'

  // Afternoon: 1pm-5pm
  if (hour >= 13 && hour < 17) return 'afternoon'

  // Excluded: before 9am, 12pm-1pm lunch, after 5pm
  return 'excluded'
}

function filterSlots(slots: CalendarSlot[]): CalendarSlot[] {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Group by ISO date for consistency
  const categorized: {
    [isoDate: string]: {
      morning: CalendarSlot[]
      afternoon: CalendarSlot[]
    }
  } = {}

  for (const slot of slots) {
    const slotDate = new Date(slot.startTime)

    // Exclude same-day appointments (anything today)
    if (slotDate.toDateString() === today.toDateString()) continue

    // Exclude weekends
    if (!isBusinessDay(slotDate)) continue

    // Exclude non-business hours
    const period = getTimePeriod(slot)
    if (period === 'excluded') continue

    // Group by ISO date string (YYYY-MM-DD) for consistent grouping
    const isoDate = slotDate.toISOString().split('T')[0]
    if (!categorized[isoDate]) {
      categorized[isoDate] = { morning: [], afternoon: [] }
    }
    categorized[isoDate][period].push(slot)
  }

  // Take first 4 business days, sorted chronologically
  const dates = Object.keys(categorized).sort().slice(0, 4)

  const result: CalendarSlot[] = []
  for (const isoDate of dates) {
    // Take 1-2 morning slots, 1-2 afternoon slots per day
    // This ensures variety across days while hitting 6-8 total
    result.push(...categorized[isoDate].morning.slice(0, 2))
    result.push(...categorized[isoDate].afternoon.slice(0, 2))
  }

  return result
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
      `${GHL_API_BASE}/calendars/${GHL_CALENDAR_ID}/free-slots?startDate=${now.getTime()}&endDate=${endDate.getTime()}`,
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

    // GHL returns slots grouped by date: { "2025-12-12": { "slots": [...] }, ... }
    // We need to flatten this into a single array
    const allSlots: string[] = []
    Object.keys(data).forEach(key => {
      if (key !== 'traceId' && data[key].slots) {
        allSlots.push(...data[key].slots)
      }
    })

    // Transform GHL slots to our CalendarSlot format
    const slots: CalendarSlot[] = allSlots.map((slotTime: string) => {
      const startTime = new Date(slotTime)
      // Assume 15-minute slots
      const endTime = new Date(startTime.getTime() + 15 * 60 * 1000)

      // Calculate urgency based on how soon the slot is
      const hoursUntil = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60)
      let urgency: 'immediate' | 'soon' | 'available' = 'available'
      if (hoursUntil < 24) urgency = 'immediate'
      else if (hoursUntil < 48) urgency = 'soon'

      return {
        id: slotTime, // Use the ISO timestamp as the slot ID
        startTime: slotTime,
        endTime: endTime.toISOString(),
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

    // Apply smart filtering: 4 business days, morning/afternoon only, no same-day
    const filteredSlots = filterSlots(slots)

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
