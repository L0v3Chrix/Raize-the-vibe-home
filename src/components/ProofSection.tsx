import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, TrendingUp } from 'lucide-react';
import { testimonials, caseStudies } from '../data/servicesData';

export default function ProofSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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
            className="font-display text-2xl font-bold text-center mb-8"
          >
            🎮 Spot the Transformation
          </motion.h3>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-1/3">
                    <span className="text-xs text-vibe-pink uppercase tracking-wider">{study.industry}</span>
                    <h4 className="font-display text-xl font-bold mt-1 mb-2">{study.clientName}</h4>
                    
                    <div className="mb-4">
                      <span className="text-xs text-vibe-muted uppercase">Challenge:</span>
                      <p className="text-sm text-vibe-soft mt-1">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-vibe-muted uppercase">Solution:</span>
                      <p className="text-sm text-vibe-soft mt-1">{study.solution}</p>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="grid grid-cols-3 gap-4">
                      {study.results.map((result, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="text-center p-4 bg-vibe-black/30 rounded-xl"
                        >
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-vibe-green" />
                            <span className="text-2xl md:text-3xl font-display font-bold text-vibe-green">
                              {result.value}
                            </span>
                          </div>
                          <p className="text-xs text-vibe-muted">{result.metric}</p>
                          {result.improvement && (
                            <p className="text-xs text-vibe-green mt-1">{result.improvement}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCounter({ 
  value, 
  suffix = '', 
  label, 
  icon 
}: { 
  value: string; 
  suffix?: string; 
  label: string;
  icon?: React.ReactNode;
}) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const numericValue = parseFloat(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start: number | null = null;
          const duration = 2000;

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericValue * eased;
            
            if (value.includes('.')) {
              setDisplayValue(current.toFixed(1));
            } else {
              setDisplayValue(Math.floor(current).toString());
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [numericValue, value, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 glass-card"
    >
      <div className="flex items-center justify-center gap-1 mb-2">
        <span className="text-4xl md:text-5xl font-display font-bold text-vibe-pink">
          {displayValue}
        </span>
        <span className="text-2xl font-display font-bold text-vibe-pink">{suffix}</span>
        {icon}
      </div>
      <p className="text-sm text-vibe-muted">{label}</p>
    </motion.div>
  );
}
