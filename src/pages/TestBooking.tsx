import { VibeJourneyForm } from '../components/journey/VibeJourneyForm'

export default function TestBooking() {
  // Example journey data (normally this would come from quiz results)
  const mockJourneyData = {
    answers: {
      superpowerVision: "Turn browsers into buyers automatically and make my customers feel like VIPs"
    },
    vibePersona: 'Innovation Seeker',
    leadScore: 75,
    painPoints: [
      'Website looks like it\'s from 2010',
      'Doing the same repetitive tasks every damn day',
      'No clue if my marketing actually works'
    ],
    industryType: 'creative',
    budgetTier: 'roi-focused',
    timelineUrgency: 'next-month',
    collaborationStyle: 'collaborative',
    aiAutomationInterest: 8
  }

  const mockAIResponse = `Based on your journey, you're a perfect fit for our AI-powered website transformation!

Your vision of turning browsers into buyers while creating VIP experiences aligns perfectly with our conversion-focused design approach. With your high AI automation interest (8/10) and ROI-focused mindset, we can implement smart workflows that eliminate those repetitive tasks you're struggling with.

Let's talk about modernizing that 2010-era website and implementing analytics that actually show you what's working. Your next-month timeline is realistic, and your collaborative style means we'll build something truly exceptional together.`

  const handleComplete = (appointmentId: string) => {
    console.log('✅ Booking completed! Appointment ID:', appointmentId)
    // You could redirect, show confetti, track analytics, etc.
  }

  return (
    <div className="min-h-screen bg-vibe-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Test Booking Flow
          </h1>
          <p className="text-vibe-muted">
            This is a test page showing the GHL integration with SMS Magic Trick
          </p>
        </div>

        <VibeJourneyForm
          journeyData={mockJourneyData}
          aiResponse={mockAIResponse}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
