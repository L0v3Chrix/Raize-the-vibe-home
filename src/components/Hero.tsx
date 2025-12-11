import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useVibeStore } from '../store/vibeStore';

export default function Hero() {
  const { startQuiz, quizStarted } = useVibeStore();

  const handleStartQuiz = () => {
    startQuiz();
    // Smooth scroll to quiz section
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-bg" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-vibe-pink/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-vibe-pink/20 rounded-full blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vibe-cyan/20 rounded-full blur-[100px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vibe-purple/10 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-0"
        >
          <img
            src="/images/logo-header-transparent-v3.png"
            alt="Raize The Vibe"
            className="h-64 md:h-80 w-auto drop-shadow-[0_0_40px_rgba(255,20,147,0.6)]"
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 -mt-8"
        >
          Skip the boring proposals.
          <br />
          <span className="gradient-text">Let's vibe check your</span>
          <br />
          <span className="gradient-text">internet dreams.</span>
        </motion.h1>

        {/* Tagline subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-vibe-muted/80 font-light mb-4 italic"
        >
          Done-for-you growth engine, not another "marketing thing" to manage
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-vibe-muted max-w-2xl mx-auto mb-12"
        >
          Tell us what you want to build.
          <br />
          We'll show you what's possible.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={handleStartQuiz}
            disabled={quizStarted}
            className="group relative px-10 py-5 rounded-full font-display font-semibold text-lg
                       bg-gradient-to-r from-vibe-pink via-vibe-purple to-vibe-cyan
                       text-white shadow-lg transition-all duration-300
                       hover:shadow-[0_0_40px_rgba(255,20,147,0.5)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       pulse-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <img src="/images/emojis/site/icon-rocket.png" alt="rocket" className="w-6 h-6" />
              Let's Vibe Check This
            </span>
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-vibe-pink via-vibe-purple to-vibe-cyan opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              style={{ zIndex: -1 }}
            />
          </motion.button>
        </motion.div>

        {/* Secondary options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-vibe-muted"
        >
          <button 
            onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-white transition-colors underline underline-offset-4 decoration-dotted"
          >
            See what we do →
          </button>
          <span className="opacity-30">|</span>
          <button 
            onClick={() => document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-white transition-colors underline underline-offset-4 decoration-dotted"
          >
            Our story
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-vibe-muted">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-vibe-pink" />
        </motion.div>
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
    </section>
  );
}
