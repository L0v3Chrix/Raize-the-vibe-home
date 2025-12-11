'use client'

import { useState } from 'react'
import { ContactInfoStep } from './ContactInfoStep'
import { CalendarStep } from './CalendarStep'

export interface JourneyFormData {
  // Contact info from Step 1
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName?: string

  // Journey data (passed from quiz results)
  answers: Record<string, any>
  vibePersona?: string
  leadScore?: number
  painPoints?: string[]
  industryType?: string
  budgetTier?: string
  timelineUrgency?: string
  collaborationStyle?: string
  aiAutomationInterest?: number
}

interface VibeJourneyFormProps {
  journeyData: Partial<JourneyFormData>
  aiResponse?: string
  onComplete?: (appointmentId: string) => void
}

export function VibeJourneyForm({ journeyData, aiResponse, onComplete }: VibeJourneyFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [contactId, setContactId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<JourneyFormData>>(journeyData)

  const handleContactSubmit = async (contactData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    businessName?: string
  }) => {
    // Update form data with contact info
    setFormData(prev => ({
      ...prev,
      ...contactData
    }))

    // Create contact in GHL
    try {
      const response = await fetch('/api/ghl/create-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: contactData,
          journeyData: {
            answers: formData.answers || {},
            vibePersona: formData.vibePersona,
            leadScore: formData.leadScore,
            painPoints: formData.painPoints,
            industryType: formData.industryType,
            budgetTier: formData.budgetTier,
            timelineUrgency: formData.timelineUrgency,
            collaborationStyle: formData.collaborationStyle,
            aiAutomationInterest: formData.aiAutomationInterest
          },
          aiResponse
        })
      })

      const result = await response.json()

      if (result.success && result.contactId) {
        setContactId(result.contactId)
        setCurrentStep(2)
      } else {
        throw new Error(result.error || 'Failed to create contact')
      }
    } catch (error) {
      console.error('Contact creation error:', error)
      alert('Something went wrong. Please try again or contact us directly.')
    }
  }

  const handleAppointmentBooked = (appointmentId: string) => {
    if (onComplete) {
      onComplete(appointmentId)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-cyan-400' : 'text-green-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 1 ? 'border-cyan-400 bg-cyan-400/20' : 'border-green-400 bg-green-400/20'}`}>
              {currentStep === 1 ? '1' : '✓'}
            </div>
            <span className="font-medium">Contact Info</span>
          </div>

          <div className={`w-16 h-0.5 ${currentStep === 2 ? 'bg-cyan-400' : 'bg-zinc-700'}`} />

          <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 2 ? 'border-cyan-400 bg-cyan-400/20' : 'border-zinc-700 bg-zinc-800'}`}>
              2
            </div>
            <span className="font-medium">Pick Your Time</span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <ContactInfoStep
          onSubmit={handleContactSubmit}
          initialData={{
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
            email: formData.email || '',
            phone: formData.phone || '',
            businessName: formData.businessName
          }}
        />
      )}

      {currentStep === 2 && contactId && (
        <CalendarStep
          contactId={contactId}
          contactData={{
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email!,
            phone: formData.phone!
          }}
          journeyData={{
            leadScore: formData.leadScore,
            vibePersona: formData.vibePersona,
            industryType: formData.industryType,
            painPoints: formData.painPoints,
            budgetTier: formData.budgetTier,
            timelineUrgency: formData.timelineUrgency,
            aiAutomationInterest: formData.aiAutomationInterest
          }}
          onBooked={handleAppointmentBooked}
        />
      )}
    </div>
  )
}
