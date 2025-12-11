// SMS Magic Trick Utility
// Cross-platform SMS deep linking for journey recap

export interface SMSTriggerData {
  phone: string
  message: string
  uri: string
}

/**
 * Opens the native SMS app with pre-populated message
 * Works on iOS and Android
 */
export function triggerSMS(data: SMSTriggerData): void {
  // Use window.location for better mobile compatibility
  if (typeof window !== 'undefined') {
    // On mobile devices, this will open the native SMS app
    // On desktop, it will open the default SMS handler (if configured)
    window.location.href = data.uri
  }
}

/**
 * Creates a clickable SMS link element
 * Useful for rendering an <a> tag with proper href
 */
export function createSMSLink(data: SMSTriggerData): {
  href: string
  target: string
  rel: string
} {
  return {
    href: data.uri,
    target: '_self', // Open in same window to trigger SMS app
    rel: 'noopener noreferrer'
  }
}

/**
 * Checks if the device likely supports SMS deep linking
 */
export function isSMSSupported(): boolean {
  if (typeof navigator === 'undefined') return false

  // Check for mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  // SMS protocol should work on most modern browsers
  return isMobile || true // Allow on desktop too (may open default SMS app)
}

/**
 * Formats phone number for SMS URI
 * Removes non-numeric characters
 */
export function formatPhoneForSMS(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Builds SMS URI from phone number and message
 */
export function buildSMSURI(phone: string, message: string): string {
  const cleanPhone = formatPhoneForSMS(phone)
  return `sms:${cleanPhone}?&body=${encodeURIComponent(message)}`
}

/**
 * Validates SMS data before triggering
 */
export function validateSMSData(data: SMSTriggerData): {
  valid: boolean
  error?: string
} {
  if (!data.phone || data.phone.length < 10) {
    return { valid: false, error: 'Invalid phone number' }
  }

  if (!data.message || data.message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' }
  }

  if (!data.uri || !data.uri.startsWith('sms:')) {
    return { valid: false, error: 'Invalid SMS URI format' }
  }

  return { valid: true }
}
