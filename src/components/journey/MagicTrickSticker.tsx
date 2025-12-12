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
      className="relative pt-16 md:pt-20"
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
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl blur-xl opacity-50"
      />

      {/* Arrow Sticker (NEW - static graphic pointing to button) */}
      <motion.div
        className="absolute -top-4 right-8 md:-right-8 z-20"
        animate={{
          rotate: [0, -5, 5, 0],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <img
          src="/images/magic-trick-arrow.png"
          alt="Try the magic trick!"
          className="w-32 h-32 md:w-40 md:h-40"
        />
      </motion.div>

      {/* Simple Button (REDESIGNED) */}
      <motion.button
        onClick={handleClick}
        disabled={hasTriggered}
        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative bg-vibe-dark border-2 border-white/20 rounded-xl
          px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6
          shadow-2xl overflow-hidden
          transform transition-all duration-300
          ${hasTriggered ? 'cursor-default' : 'cursor-pointer hover:border-cyan-400/50'}
        `}
      >
        {/* Sparkle Effects (keep) */}
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

        {/* Button Text Only */}
        <span className="relative z-10 text-lg md:text-xl lg:text-2xl font-bold text-white text-center block">
          {hasTriggered ? 'Magic Sent! ✨' : "Don't push this button. Whatever you do"}
        </span>
      </motion.button>

      {/* Instruction Text Below */}
      <p className="mt-4 text-xs md:text-sm text-zinc-500 text-center max-w-md mx-auto">
        {hasTriggered
          ? 'Check your SMS app for a surprise!'
          : 'Opens your SMS app with a pre-written message'}
      </p>
    </motion.div>
  )
}
