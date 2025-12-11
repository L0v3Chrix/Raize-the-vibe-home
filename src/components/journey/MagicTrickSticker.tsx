'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface MagicTrickStickerProps {
  onTrigger: () => void
}

export function MagicTrickSticker({ onTrigger }: MagicTrickStickerProps) {
  const [hasTriggered, setHasTriggered] = useState(false)

  const handleClick = () => {
    if (!hasTriggered) {
      setHasTriggered(true)
      onTrigger()

      // Provide feedback that SMS was triggered
      setTimeout(() => {
        setHasTriggered(false)
      }, 3000)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      className="relative"
    >
      {/* Magical Glow Effect */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl blur-xl opacity-50"
      />

      {/* Sticker Container */}
      <motion.button
        onClick={handleClick}
        disabled={hasTriggered}
        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500
          rounded-2xl p-6 shadow-2xl overflow-hidden
          transform transition-all duration-300
          ${hasTriggered ? 'cursor-default' : 'cursor-pointer hover:shadow-pink-500/50'}
        `}
      >
        {/* Sparkle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            animate={hasTriggered ? {} : {
              rotate: [0, -10, 10, -10, 10, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: hasTriggered ? 0 : Infinity,
              repeatDelay: 3
            }}
            className="mb-3 flex justify-center"
          >
            <img
              src={hasTriggered ? '/images/emojis/site/icon-sparkles.png' : '/images/emojis/site/icon-tophat.png'}
              alt={hasTriggered ? 'sparkles' : 'top hat'}
              className="w-16 h-16"
            />
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-2">
            {hasTriggered ? 'Magic Sent!' : 'Try the Magic Trick!'}
          </h3>

          <p className="text-sm text-white/90 mb-4 max-w-xs mx-auto">
            {hasTriggered
              ? 'Check your SMS app for a surprise!'
              : 'Click here to send Chrix a magical journey recap via SMS'}
          </p>

          {!hasTriggered && (
            <div className="flex items-center justify-center gap-2 text-white/80 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Opens your SMS app</span>
            </div>
          )}

          {hasTriggered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white/80 text-xs"
            >
              ✓ Magic trick activated!
            </motion.div>
          )}
        </div>

        {/* Border Shimmer */}
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-2xl"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.button>

      {/* Instruction Text */}
      <p className="mt-4 text-xs text-zinc-500 text-center max-w-md mx-auto">
        This will open your phone's SMS app with a pre-written message to Chrix.
        No spam, no tricks — just a fun way to say "I booked a call!" 🎉
      </p>
    </motion.div>
  )
}
