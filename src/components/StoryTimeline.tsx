import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { storyTimeline, whoWeServe } from '../data/servicesData';

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="story-section" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-vibe-pink uppercase tracking-wider">Our Story</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            Why We Do What We Do
          </h2>
          <p className="text-vibe-muted max-w-xl mx-auto">
            We didn't start out to build an agency. We started out to solve a problem we kept seeing.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-vibe-dark">
            <motion.div
              className="w-full bg-gradient-to-b from-vibe-pink via-vibe-purple to-vibe-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline events */}
          <div className="space-y-12 md:space-y-24">
            {storyTimeline.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full
                           bg-vibe-dark border-2 border-vibe-pink flex items-center justify-center
                           text-2xl z-10"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {event.icon}
                </motion.div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    className="glass-card p-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-display text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-vibe-muted leading-relaxed">{event.description}</p>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            People With Heart
          </h3>
          <p className="text-vibe-muted mb-12 max-w-lg mx-auto">
            We don't work with everyone. We work with businesses that matter — 
            the ones building communities, not just revenue.
          </p>

          {/* Avatar grid */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {whoWeServe.map((segment, index) => (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-vibe-dark border-2 border-white/10
                           flex items-center justify-center text-3xl md:text-4xl cursor-pointer
                           transition-all group-hover:border-vibe-pink group-hover:scale-110"
                  whileHover={{ 
                    boxShadow: '0 0 30px rgba(255, 20, 147, 0.5)',
                  }}
                >
                  {segment.emoji}
                </motion.div>
                
                <span className="block text-xs text-vibe-muted mt-2 text-center max-w-[80px] md:max-w-[100px]">
                  {segment.label}
                </span>

                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                              bg-vibe-dark rounded-lg text-sm text-white whitespace-nowrap
                              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                              border border-white/10">
                  {segment.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-display italic text-vibe-soft max-w-2xl mx-auto">
            "We're not trying to be the biggest agency.
            <br />
            <span className="gradient-text">We're trying to be your crew.</span>"
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
