'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactInfoStepProps {
  onSubmit: (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    businessName?: string
  }) => void
  initialData?: {
    firstName: string
    lastName: string
    email: string
    phone: string
    businessName?: string
  }
}

export function ContactInfoStep({ onSubmit, initialData }: ContactInfoStepProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    businessName: initialData?.businessName || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        businessName: formData.businessName.trim() || undefined
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
    }
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        Let's Get You Connected
      </h2>
      <p className="text-zinc-400 mb-6">
        Just need a few details to book your discovery call
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First & Last Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={`w-full px-4 py-3 bg-zinc-800 border ${errors.firstName ? 'border-red-500' : 'border-zinc-700'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-2">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className={`w-full px-4 py-3 bg-zinc-800 border ${errors.lastName ? 'border-red-500' : 'border-zinc-700'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full px-4 py-3 bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }))}
            className={`w-full px-4 py-3 bg-zinc-800 border ${errors.phone ? 'border-red-500' : 'border-zinc-700'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
            placeholder="(555) 123-4567"
            maxLength={14}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Business Name (Optional) */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-zinc-300 mb-2">
            Business Name <span className="text-zinc-500">(optional)</span>
          </label>
          <input
            id="businessName"
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Your Business Name"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating your contact...
            </span>
          ) : (
            'Continue to Calendar →'
          )}
        </button>
      </form>

      <p className="mt-4 text-xs text-zinc-500 text-center">
        Your information is secure and will never be shared.
      </p>
    </motion.div>
  )
}
