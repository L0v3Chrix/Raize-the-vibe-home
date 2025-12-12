import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { testimonials } from '../data/servicesData';
import { caseStudies } from '../data/caseStudiesData';

export default function ProofSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker || isPaused) return;

    let animationId: number;
    let position = 0;

    const scroll = () => {
      position += 0.5;
      if (position >= ticker.scrollWidth / 2) {
        position = 0;
      }
      ticker.scrollLeft = position;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section id="proof-section" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <span className="text-sm text-vibe-pink uppercase tracking-wider">The Proof</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            What Happens When You Work With Us
          </h2>
          <p className="text-vibe-muted max-w-xl mx-auto">
            Real results from real businesses. No fluff, no fake testimonials.
          </p>
        </motion.div>

        {/* Testimonial Ticker */}
        <div 
          ref={tickerRef}
          className="overflow-hidden whitespace-nowrap mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="inline-flex gap-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="inline-block w-[350px] md:w-[450px] whitespace-normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="glass-card p-6 h-full">
                  <Quote className="w-8 h-8 text-vibe-pink/30 mb-4" />
                  <p className="text-vibe-soft mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-vibe-muted">{testimonial.role}, {testimonial.industry}</p>
                    </div>
                    {testimonial.metrics && (
                      <div className="text-right">
                        <p className="text-2xl font-display font-bold text-vibe-pink">{testimonial.metrics.value}</p>
                        <p className="text-xs text-vibe-muted">{testimonial.metrics.label}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Counter */}
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 text-center">
              <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">3am</p>
              <p className="text-xs md:text-sm text-vibe-muted">Latest we've shipped something</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">∞</p>
              <p className="text-xs md:text-sm text-vibe-muted">Revision requests we've honored</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">99.9%</p>
              <p className="text-xs md:text-sm text-vibe-muted">Time we're vibing with clients</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">$47k</p>
              <p className="text-xs md:text-sm text-vibe-muted">Our smallest client's first-year revenue</p>
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="max-w-4xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2"
          >
            <img src="/images/emojis/site/icon-gamepad.png" alt="gamepad" className="w-16 h-16" />
            Spot the Transformation
          </motion.h3>

          <div className="space-y-8">
            {caseStudies.map((study, index) => {
              const isExpanded = expandedCaseStudy === study.id;

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div>
                      <span className="text-xs text-vibe-pink uppercase tracking-wider">{study.industry}</span>
                      <h4 className="font-display text-xl font-bold mt-1 mb-2">{study.client}</h4>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-vibe-muted uppercase">Challenge:</span>
                        <p className="text-sm text-vibe-soft mt-1">{study.challenge}</p>
                      </div>

                      <div>
                        <span className="text-xs text-vibe-muted uppercase">Solution:</span>
                        <p className="text-sm text-vibe-soft mt-1">{study.solution}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {study.metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="text-center p-4 bg-vibe-black/30 rounded-xl"
                        >
                          <div className="mb-2 flex justify-center">
                            <img src={metric.icon} alt={metric.label} className="w-16 h-16" />
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-vibe-green" />
                            <span className="text-2xl md:text-3xl font-display font-bold text-vibe-green">
                              {metric.value}
                            </span>
                          </div>
                          <p className="text-xs text-vibe-muted">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    {study.testimonial && (
                      <div className="bg-vibe-dark/50 p-4 rounded-xl border-l-4 border-vibe-pink">
                        <Quote className="w-6 h-6 text-vibe-pink/30 mb-2" />
                        <p className="text-sm text-vibe-soft italic mb-3">"{study.testimonial.quote}"</p>
                        <p className="text-xs text-vibe-muted">
                          — {study.testimonial.author}, {study.testimonial.role}
                        </p>
                      </div>
                    )}

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && study.expandedContent && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-white/10 space-y-6">
                            {/* What We Built */}
                            <div>
                              <h5 className="font-display text-lg font-bold mb-3 text-vibe-pink">
                                What We Built
                              </h5>
                              <p className="text-sm text-vibe-muted mb-3">{study.expandedContent.whatWeBuilt.headline}</p>
                              <ul className="space-y-2">
                                {study.expandedContent.whatWeBuilt.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-vibe-soft flex items-start gap-2">
                                    <span className="text-vibe-pink mt-1">✓</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Why It Worked */}
                            <div>
                              <h5 className="font-display text-lg font-bold mb-3 text-vibe-purple">
                                Why It Worked
                              </h5>
                              <p className="text-sm text-vibe-muted mb-3">{study.expandedContent.whyItWorked.headline}</p>
                              <ul className="space-y-2">
                                {study.expandedContent.whyItWorked.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-vibe-soft flex items-start gap-2">
                                    <span className="text-vibe-purple mt-1">→</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* How We Did It */}
                            <div>
                              <h5 className="font-display text-lg font-bold mb-3 text-vibe-green">
                                How We Did It
                              </h5>
                              <p className="text-sm text-vibe-muted mb-3">{study.expandedContent.howWeDidIt.headline}</p>
                              <ul className="space-y-2">
                                {study.expandedContent.howWeDidIt.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-vibe-soft flex items-start gap-2">
                                    <span className="text-vibe-green mt-1">▸</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Deep Dive */}
                            {study.expandedContent.deepDive && (
                              <div className="bg-vibe-dark/30 p-4 rounded-xl border border-white/10">
                                <h5 className="font-display text-md font-bold mb-2 gradient-text">
                                  {study.expandedContent.deepDive.headline}
                                </h5>
                                <p className="text-sm text-vibe-soft leading-relaxed">
                                  {study.expandedContent.deepDive.content}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Read More/Less Button */}
                    {study.expandedContent && (
                      <motion.button
                        onClick={() => setExpandedCaseStudy(isExpanded ? null : study.id)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm
                                 bg-gradient-to-r from-vibe-pink/20 to-vibe-purple/20
                                 hover:from-vibe-pink/30 hover:to-vibe-purple/30
                                 border border-white/10 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isExpanded ? (
                          <>
                            <span>Show Less</span>
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Read Full Case Study</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
