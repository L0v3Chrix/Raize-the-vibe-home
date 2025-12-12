import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Phone, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
import { useVibeStore } from '../store/vibeStore';
import { CalendarStep } from './journey/CalendarStep';

export default function BookingModal() {
  const { modalState, closeModal, vibeResult, capturedEmail, unlockTreasure, fullContactCaptured, contactInfo, captureFullContact, answers } = useVibeStore();
  const [step, setStep] = useState<'form' | 'calendar' | 'success'>('form');
  const [contactId, setContactId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unlock priority booking when modal opens
  useEffect(() => {
    if (modalState.isOpen && modalState.type === 'booking') {
      unlockTreasure('priority-booking');
    }
  }, [modalState.isOpen, modalState.type, unlockTreasure]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: capturedEmail || '',
    phone: '',
    notes: ''
  });

  const isOpen = modalState.isOpen && modalState.type === 'booking';

  // Auto-skip form if already have full contact info
  useEffect(() => {
    if (fullContactCaptured && contactInfo && modalState.isOpen) {
      setFormData({ ...contactInfo, notes: '' });
      // Auto-submit to create contact and move to calendar
      handleContactSubmission({ ...contactInfo, notes: '' });
    }
  }, [fullContactCaptured, contactInfo, modalState.isOpen]);

  const handleContactSubmission = async (contactData: typeof formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Call GHL create-contact API
      const response = await fetch('/api/ghl/create-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            email: contactData.email,
            phone: contactData.phone
          },
          journeyData: {
            answers: answers.reduce((acc, a) => ({ ...acc, [`q${a.questionId}`]: a.value }), {}),
            vibePersona: vibeResult?.type,
            leadScore: vibeResult?.score,
            painPoints: answers.find(a => a.questionId === 3)?.value as string[] || [],
            industryType: answers.find(a => a.questionId === 2)?.value as string || '',
            budgetTier: answers.find(a => a.questionId === 5)?.value as string || '',
            timelineUrgency: answers.find(a => a.questionId === 6)?.value as string || '',
            collaborationStyle: answers.find(a => a.questionId === 7)?.value as string || '',
            aiAutomationInterest: answers.find(a => a.questionId === 4)?.value as number || 0
          },
          aiResponse: vibeResult?.personalizedInsight
        })
      });

      const result = await response.json();

      if (result.success && result.contactId) {
        setContactId(result.contactId);

        // Save contact info to store for future use
        captureFullContact({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone
        });

        setStep('calendar');
      } else {
        throw new Error(result.error || 'Failed to create contact');
      }
    } catch (error) {
      console.error('Contact creation error:', error);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContactSubmission(formData);
  };

  const handleBookingComplete = (appointmentId: string) => {
    setStep('success');
    console.log('✅ Booking completed! Appointment ID:', appointmentId);
  };

  const handleClose = () => {
    closeModal();
    // Reset state after animation
    setTimeout(() => {
      setStep('form');
      setFormData({
        firstName: '',
        lastName: '',
        email: capturedEmail || '',
        phone: '',
        notes: ''
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-vibe-dark rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-vibe-dark border-b border-white/10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-vibe-pink to-vibe-purple flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Book Your Vibe Check</h3>
                  <p className="text-sm text-vibe-muted">15 minutes. Zero pressure. Real talk.</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-vibe-muted" />
              </button>
            </div>

            <div className="p-6">
              {/* Form Step */}
              {step === 'form' && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Quiz result context */}
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {vibeResult && (
                    <div className="p-4 bg-vibe-pink/10 border border-vibe-pink/30 rounded-xl mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-vibe-pink" />
                        <span className="text-sm font-semibold text-vibe-pink">Your Vibe Score: {vibeResult.score}/100</span>
                      </div>
                      <p className="text-sm text-vibe-muted">
                        {vibeResult.type} — We've got your quiz results ready to discuss!
                      </p>
                    </div>
                  )}

                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-vibe-muted mb-2">First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-vibe-muted" />
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Future"
                          className="w-full pl-10 pr-4 py-3 bg-vibe-black/50 border border-white/10 rounded-xl
                                   text-white placeholder:text-vibe-muted/50
                                   focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-vibe-muted mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Client"
                        className="w-full px-4 py-3 bg-vibe-black/50 border border-white/10 rounded-xl
                                 text-white placeholder:text-vibe-muted/50
                                 focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-vibe-muted mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-vibe-muted" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="definitely.a.real.person@notarobot.com"
                        className="w-full pl-10 pr-4 py-3 bg-vibe-black/50 border border-white/10 rounded-xl
                                 text-white placeholder:text-vibe-muted/50
                                 focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-vibe-muted mb-2">
                      Phone <span className="text-vibe-muted/50">(optional — we'll only call if you ask)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-vibe-muted" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) YES-LETS-GO"
                        className="w-full pl-10 pr-4 py-3 bg-vibe-black/50 border border-white/10 rounded-xl
                                 text-white placeholder:text-vibe-muted/50
                                 focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm text-vibe-muted mb-2">
                      Anything we should know before our call? <span className="text-vibe-muted/50">(optional)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-vibe-muted" />
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="I need someone who actually gets it, not another 'strategist' who just wants to sell me stuff..."
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 bg-vibe-black/50 border border-white/10 rounded-xl
                                 text-vibe-muted/50 resize-none
                                 focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-lg
                             bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                             hover:shadow-lg hover:shadow-vibe-pink/30 transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? 'Creating your booking...' : 'Continue to Pick a Time →'}
                  </motion.button>
                </motion.form>
              )}

              {/* Calendar Step */}
              {step === 'calendar' && contactId && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <CalendarStep
                    contactId={contactId}
                    contactData={{
                      name: `${formData.firstName} ${formData.lastName}`,
                      email: formData.email,
                      phone: formData.phone
                    }}
                    journeyData={{
                      leadScore: vibeResult?.score,
                      vibePersona: vibeResult?.type,
                      industryType: answers.find(a => a.questionId === 2)?.value as string,
                      painPoints: answers.find(a => a.questionId === 3)?.value as string[],
                      budgetTier: answers.find(a => a.questionId === 5)?.value as string,
                      timelineUrgency: answers.find(a => a.questionId === 6)?.value as string,
                      aiAutomationInterest: answers.find(a => a.questionId === 4)?.value as number
                    }}
                    onBooked={handleBookingComplete}
                  />
                </motion.div>
              )}

              {/* Success Step */}
              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-vibe-green/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-vibe-green" />
                  </motion.div>

                  <h3 className="font-display text-2xl font-bold mb-2">You're Booked! 🎉</h3>
                  <p className="text-vibe-muted mb-6">
                    Check your email for confirmation and calendar invite.
                    <br />
                    We can't wait to meet you, {formData.firstName}!
                  </p>

                  <div className="p-4 bg-vibe-dark/50 rounded-xl text-left text-sm">
                    <p className="text-vibe-muted mb-2">What to expect:</p>
                    <ul className="space-y-2 text-vibe-soft">
                      <li className="flex items-start gap-2">
                        <span className="text-vibe-pink">✓</span>
                        Quick intro + understanding your goals
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-vibe-pink">✓</span>
                        Review your quiz results together
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-vibe-pink">✓</span>
                        Explore what we could build
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-vibe-pink">✓</span>
                        No pressure, no pitch — just vibes
                      </li>
                    </ul>
                  </div>

                  <motion.button
                    onClick={handleClose}
                    className="mt-6 px-8 py-3 rounded-xl font-semibold
                             bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                             hover:shadow-lg hover:shadow-vibe-pink/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
