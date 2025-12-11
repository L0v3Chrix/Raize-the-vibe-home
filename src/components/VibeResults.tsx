import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Download, Sparkles, Mail, ArrowRight, Calendar } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { useVibeStore } from '../store/vibeStore';
import { vibePersonas } from '../data/quizData';
import { services, treasures } from '../data/servicesData';
import { VibeReportPDF } from './VibeReportPDF';

export default function VibeResults() {
  const {
    quizComplete,
    vibeResult,
    emailCaptured,
    captureEmail,
    unlockedTreasures,
    setModalState,
    findCoupon,
    couponCode
  } = useVibeStore();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  // Animate score counting up
  useEffect(() => {
    if (quizComplete && vibeResult && emailCaptured) {
      const duration = 2000;
      const steps = 60;
      const increment = vibeResult.score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= vibeResult.score) {
          setAnimatedScore(vibeResult.score);
          clearInterval(timer);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [quizComplete, vibeResult, emailCaptured]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    captureEmail(email);
    setIsSubmitting(false);
  };

  const handleBookCall = () => {
    setModalState({ isOpen: true, type: 'booking' });
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.toUpperCase() === couponCode) {
      findCoupon();
      setCouponError(false);
      setCouponInput('');
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    if (!vibeResult || !email) return;

    try {
      const blob = await pdf(<VibeReportPDF vibeResult={vibeResult} email={email} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vibe-check-report-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (!quizComplete || !vibeResult) {
    return null;
  }

  const persona = vibePersonas[vibeResult.type as keyof typeof vibePersonas];
  const recommendedService = services.find(s => s.id === vibeResult.recommendedService);

  return (
    <section id="results-section" className="min-h-screen py-20 px-4 relative">
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                  backgroundColor: ['#FF1493', '#00FFFF', '#8B5CF6', '#FACC15', '#10B981'][Math.floor(Math.random() * 5)]
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 100,
                  opacity: 0,
                  rotate: Math.random() * 720 - 360
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Email Gate */}
        {!emailCaptured ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-vibe-pink to-vibe-purple flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              🎉 Your Results Are Ready!
            </h2>
            
            <p className="text-vibe-muted text-lg mb-8 max-w-md mx-auto">
              Enter your email to unlock your personalized Vibe Score, 
              recommendations, and exclusive treasures.
            </p>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-vibe-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="the.one.you.actually.check@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-vibe-dark/50 border border-white/10 rounded-xl
                             text-white placeholder:text-vibe-muted/50
                             focus:outline-none focus:border-vibe-pink/50 focus:ring-2 focus:ring-vibe-pink/20"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="px-8 py-4 rounded-xl font-semibold
                           bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:shadow-lg hover:shadow-vibe-pink/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Unlocking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Unlock className="w-5 h-5" />
                      Unlock Results
                    </span>
                  )}
                </motion.button>
              </div>
              
              <p className="text-xs text-vibe-muted mt-4">
                No spam, ever. Just your results and maybe a follow-up if we think we can help.
              </p>
            </form>

            {/* Preview of what they'll get */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {treasures.slice(0, 4).map((treasure) => (
                <div key={treasure.id} className="p-4 bg-vibe-dark/30 rounded-xl border border-white/5 opacity-50">
                  <span className="text-2xl mb-2 block filter grayscale">{treasure.icon}</span>
                  <span className="text-sm text-vibe-muted">{treasure.name}</span>
                  <Lock className="w-4 h-4 text-vibe-muted mx-auto mt-2" />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Unlocked Results */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 md:p-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-pink/20 border border-vibe-pink/30 mb-6">
                <Sparkles className="w-4 h-4 text-vibe-pink" />
                <span className="text-sm text-vibe-pink">YOUR VIBE CHECK RESULTS</span>
              </div>

              {/* Animated Score */}
              <div className="relative inline-block mb-6">
                <motion.div
                  className="text-8xl md:text-9xl font-display font-bold"
                  style={{ color: persona?.color || '#FF1493' }}
                >
                  {animatedScore}
                </motion.div>
                <span className="absolute -right-8 top-4 text-2xl text-vibe-muted">/100</span>
              </div>

              {/* Persona */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {persona?.emoji && <img src={persona.emoji} alt={vibeResult.type} className="w-12 h-12" />}
                  <h3 className="font-display text-2xl md:text-3xl font-bold">{vibeResult.type}</h3>
                </div>
                <p className="text-vibe-muted max-w-lg mx-auto">
                  {persona?.description}
                </p>
              </div>

              {/* Score tier badge */}
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
                ${vibeResult.score >= 71 ? 'bg-vibe-green/20 text-vibe-green' :
                  vibeResult.score >= 51 ? 'bg-vibe-orange/20 text-vibe-orange' :
                  vibeResult.score >= 31 ? 'bg-vibe-yellow/20 text-vibe-yellow' :
                  'bg-vibe-muted/20 text-vibe-muted'}`}
              >
                {vibeResult.score >= 71 ? (
                  <span className="flex items-center gap-2">
                    <img src="/images/emojis/site/icon-fire.png" alt="fire" className="w-4 h-4" />
                    Priority Match
                  </span>
                ) : vibeResult.score >= 51 ? (
                  <span className="flex items-center gap-2">
                    <img src="/images/emojis/site/icon-sparkles.png" alt="sparkles" className="w-4 h-4" />
                    Hot Lead
                  </span>
                ) : vibeResult.score >= 31 ? (
                  <span className="flex items-center gap-2">
                    <img src="/images/emojis/site/icon-wave.png" alt="wave" className="w-4 h-4" />
                    Warm Connection
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <img src="/images/emojis/site/icon-seedling.png" alt="seedling" className="w-4 h-4" />
                    Let's Nurture This
                  </span>
                )}
              </div>
            </motion.div>

            {/* Personalized Insight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8"
            >
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <img src="/images/emojis/site/icon-brain.png" alt="brain" className="w-6 h-6" />
                What We're Already Thinking For You
              </h3>
              <p className="text-vibe-muted mb-6">{vibeResult.personalizedInsight}</p>
              
              {/* Top Priorities */}
              <div className="space-y-3">
                {vibeResult.topPriorities.map((priority, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-vibe-dark/30 rounded-lg"
                  >
                    <span className="text-vibe-pink">✓</span>
                    <span>{priority}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Service */}
            {recommendedService && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-8 border-vibe-pink/30"
              >
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{recommendedService.icon}</span>
                  <div>
                    <span className="text-xs text-vibe-pink uppercase tracking-wider">Recommended For You</span>
                    <h3 className="font-display text-2xl font-bold">{recommendedService.name}</h3>
                    <p className="text-vibe-muted">{recommendedService.tagline}</p>
                  </div>
                  <span className="ml-auto font-display text-xl font-bold text-vibe-pink">
                    {recommendedService.priceDisplay}
                  </span>
                </div>
                
                <p className="text-vibe-soft mb-6">{recommendedService.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {recommendedService.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-vibe-pink">✓</span>
                      <span className="text-vibe-muted">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={handleBookCall}
                  className="w-full py-4 rounded-xl font-semibold text-lg
                           bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                           hover:shadow-lg hover:shadow-vibe-pink/30 transition-all
                           flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-5 h-5" />
                  Book a Vibe Check Call
                </motion.button>
              </motion.div>
            )}

            {/* Unlocked Treasures */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card p-8"
            >
              <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                🎁 Your Unlocked Treasures
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {treasures.map((treasure) => {
                  const isUnlocked = unlockedTreasures.includes(treasure.id);
                  const isSecretCoupon = treasure.id === 'secret-coupon';

                  return (
                    <motion.div
                      key={treasure.id}
                      className={`p-4 rounded-xl border text-center transition-all
                        ${isUnlocked
                          ? 'bg-vibe-pink/10 border-vibe-pink/30 hover:bg-vibe-pink/20 cursor-pointer'
                          : 'bg-vibe-dark/30 border-white/5 opacity-50'}`}
                      whileHover={isUnlocked ? { scale: 1.05 } : {}}
                    >
                      <span className="text-3xl mb-2 block">{treasure.icon}</span>
                      <span className="text-sm font-semibold block mb-1">{treasure.name}</span>

                      {isUnlocked ? (
                        <button
                          onClick={treasure.id === 'vibe-report' ? handleDownloadPDF : undefined}
                          className="text-xs text-vibe-pink flex items-center justify-center gap-1 mx-auto hover:text-white transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      ) : isSecretCoupon ? (
                        <form onSubmit={handleCouponSubmit} className="mt-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Enter code"
                            className={`w-full px-2 py-1 text-xs bg-vibe-dark/50 border rounded
                                     ${couponError ? 'border-red-500' : 'border-white/10'}
                                     text-white placeholder:text-vibe-muted/50
                                     focus:outline-none focus:border-vibe-pink/50`}
                          />
                        </form>
                      ) : (
                        <span className="text-xs text-vibe-muted flex items-center justify-center gap-1">
                          <Lock className="w-3 h-3" />
                          {treasure.unlockCondition}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <p className="text-vibe-muted mb-4">Ready to explore what's possible?</p>
              <motion.button
                onClick={handleBookCall}
                className="px-10 py-5 rounded-full font-display font-semibold text-lg
                         bg-gradient-to-r from-vibe-pink via-vibe-purple to-vibe-cyan
                         text-white shadow-lg
                         hover:shadow-[0_0_40px_rgba(255,20,147,0.5)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  Let's Talk About Your Vision
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
