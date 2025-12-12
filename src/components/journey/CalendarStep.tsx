'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagicTrickSticker } from './MagicTrickSticker'
import { triggerSMS, type SMSTriggerData } from '../../utils/sms-trigger'

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

interface CalendarStepProps {
  contactId: string
  contactData: {
    name: string
    email: string
    phone: string
  }
  journeyData: {
    leadScore?: number
    vibePersona?: string
    industryType?: string
    painPoints?: string[]
    budgetTier?: string
    timelineUrgency?: string
    aiAutomationInterest?: number
  }
  onBooked: (appointmentId: string, smsData?: SMSTriggerData) => void
}

export function CalendarStep({ contactId, contactData, journeyData, onBooked }: CalendarStepProps) {
  const [slots, setSlots] = useState<CalendarSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [smsData, setSmsData] = useState<SMSTriggerData | null>(null)

  // Fetch available calendar slots
  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await fetch('/api/ghl/calendar/availability')
        const data = await response.json()

        if (data.slots) {
          setSlots(data.slots)
        } else {
          setError('No available slots found')
        }
      } catch (err) {
        console.error('Failed to fetch calendar slots:', err)
        setError('Failed to load calendar availability')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSlots()
  }, [])

  const handleSlotSelect = (slot: CalendarSlot) => {
    setSelectedSlot(slot)
  }

  const handleBookAppointment = async () => {
    if (!selectedSlot) return

    setIsBooking(true)
    setError(null)

    try {
      const response = await fetch('/api/ghl/calendar/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          startTime: selectedSlot.startTime,
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          contactId,
          journeyData
        })
      })

      const result = await response.json()

      if (result.success) {
        setBookingComplete(true)

        // Store SMS data if provided
        if (result.smsData) {
          setSmsData(result.smsData)
        }

        // Notify parent component with SMS data
        onBooked(result.appointmentId, result.smsData)
      } else {
        throw new Error(result.error || 'Booking failed')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('Failed to book appointment. Please try again.')
      setIsBooking(false)
    }
  }

  const handleSMSTrigger = () => {
    if (smsData) {
      triggerSMS(smsData)
    }
  }

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = []
    }
    acc[slot.date].push(slot)
    return acc
  }, {} as Record<string, CalendarSlot[]>)

  if (isLoading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-cyan-400 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-zinc-400">Loading available times...</p>
        </div>
      </div>
    )
  }

  if (bookingComplete && smsData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-cyan-400/50 rounded-lg p-8 text-center"
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            You're All Set! 🎉
          </h2>
          <p className="text-zinc-400 mb-4">
            Your discovery call is confirmed for
          </p>
          <p className="text-xl font-semibold text-cyan-400">
            {selectedSlot?.dayOfWeek}, {selectedSlot?.date} at {selectedSlot?.timeSlot}
          </p>
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">What's Next?</h3>
          <ul className="text-left text-zinc-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Check your email for confirmation details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>We'll send a calendar invite shortly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Prepare any questions for our call</span>
            </li>
          </ul>
        </div>

        <MagicTrickSticker onTrigger={handleSMSTrigger} />

        <p className="mt-6 text-sm text-zinc-500">
          Questions? Email us at hello@raizethevibe.com
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Pick Your Perfect Time
        </h2>
        <p className="text-zinc-400 flex items-center gap-2">
          Next 4 business days — Let's make this happen!
          <img src="/images/emojis/site/icon-lightning.png" alt="lightning" className="w-8 h-8 inline" />
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {slots.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-400 mb-4">No available slots in the next 72 hours</p>
          <p className="text-sm text-zinc-500">
            Please contact us directly at hello@raizethevibe.com
          </p>
        </div>
      ) : (
        <>
          {/* Available Slots */}
          <div className="space-y-6 mb-6">
            {Object.entries(slotsByDate).map(([date, dateSlots]) => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">
                  {dateSlots[0].dayOfWeek}, {date}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {dateSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      className={`
                        px-4 py-3 rounded-lg border-2 transition-all duration-200 relative
                        ${selectedSlot?.id === slot.id
                          ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400'
                          : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600'
                        }
                      `}
                    >
                      <div className="text-sm font-medium">{slot.timeSlot}</div>
                      {slot.urgency === 'immediate' && (
                        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                          ASAP
                        </div>
                      )}
                      {slot.urgency === 'soon' && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Soon
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Book Button */}
          <AnimatePresence>
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="sticky bottom-4 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm">
                    <p className="text-zinc-400">Selected Time:</p>
                    <p className="font-semibold text-white">
                      {selectedSlot.dayOfWeek}, {selectedSlot.date} at {selectedSlot.timeSlot}
                    </p>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    disabled={isBooking}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none whitespace-nowrap"
                  >
                    {isBooking ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Booking...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}
