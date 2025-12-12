import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { services } from '../data/servicesData';
import { Service } from '../types';
import { useVibeStore } from '../store/vibeStore';

export default function ServicesSection() {
  const [showDetailModal, setShowDetailModal] = useState<Service | null>(null);
  const { vibeResult, setModalState } = useVibeStore();

  const handleBookCall = () => {
    setModalState({ isOpen: true, type: 'booking' });
  };

  return (
    <section id="services-section" className="py-24 px-4 relative">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-vibe-pink uppercase tracking-wider">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">
            The Human Version
          </h2>
          <p className="text-vibe-muted max-w-xl mx-auto">
            No jargon, no fluff. Here's what we actually build for businesses like yours.
          </p>
        </motion.div>

        {/* Quick Match (if quiz completed) */}
        {vibeResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibe-pink/20 border border-vibe-pink/30">
              <img src="/images/emojis/site/icon-sparkles.png" alt="sparkles" className="w-8 h-8" />
              <span className="text-sm">
                Based on your quiz, we recommend: <strong className="text-vibe-pink">
                  {services.find(s => s.id === vibeResult.recommendedService)?.name}
                </strong>
              </span>
            </div>
          </motion.div>
        )}

        {/* Services Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isRecommended = vibeResult?.recommendedService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card overflow-hidden transition-all duration-300
                  ${isRecommended ? 'ring-2 ring-vibe-pink' : ''}`}
              >
                {/* Recommended badge */}
                {isRecommended && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-vibe-pink text-white text-xs font-semibold rounded-bl-lg">
                    Recommended
                  </div>
                )}

                {/* Batteries Stamp - bottom right corner */}
                <div className="absolute bottom-4 right-4 opacity-80 z-10">
                  <img
                    src="/images/stamps/batteries-not-included.png"
                    alt="Batteries not included"
                    className="w-16 h-16 md:w-20 md:h-20 rotate-[-12deg]"
                  />
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img src={service.icon} alt={service.name} className="w-24 h-24" />
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold">{service.name}</h3>
                      <p className="text-sm text-vibe-muted">{service.tagline}</p>
                    </div>
                    <span className="font-display text-lg font-bold text-vibe-pink whitespace-nowrap">
                      {service.priceDisplay}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-vibe-muted text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Quick features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-vibe-pink flex-shrink-0 mt-0.5" />
                        <span className="text-vibe-soft">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* See full details button */}
                  <button
                    onClick={() => setShowDetailModal(service)}
                    className="flex items-center gap-2 text-sm text-vibe-pink hover:text-white transition-colors mb-4"
                  >
                    <span>See full details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* CTA */}
                  <motion.button
                    onClick={handleBookCall}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
                      ${isRecommended 
                        ? 'bg-gradient-to-r from-vibe-pink to-vibe-purple text-white hover:shadow-lg hover:shadow-vibe-pink/30' 
                        : 'bg-vibe-dark hover:bg-vibe-card text-white border border-white/10'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {service.ctaText}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Detail Modal */}
        <AnimatePresence>
          {showDetailModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDetailModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-vibe-dark rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-vibe-dark border-b border-white/10 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={showDetailModal.icon} alt={showDetailModal.name} className="w-24 h-24" />
                    <div>
                      <h3 className="font-display text-2xl font-bold">{showDetailModal.name}</h3>
                      <p className="text-vibe-muted">{showDetailModal.tagline}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {/* Price */}
                  <div className="text-center">
                    <span className="font-display text-4xl font-bold text-vibe-pink">
                      {showDetailModal.priceDisplay}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-vibe-soft text-lg">{showDetailModal.description}</p>

                  {/* Features */}
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {showDetailModal.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-vibe-pink flex-shrink-0 mt-0.5" />
                          <span className="text-vibe-soft">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Deliverables</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {showDetailModal.deliverables.map((deliverable, i) => (
                        <div key={i} className="bg-vibe-black/50 rounded-xl p-4">
                          <h5 className="font-semibold text-vibe-pink mb-3">{deliverable.category}</h5>
                          <ul className="space-y-2">
                            {deliverable.items.map((item, j) => (
                              <li key={j} className="text-sm text-vibe-muted flex items-start gap-2">
                                <span className="text-vibe-cyan">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For */}
                  <div>
                    <h4 className="font-display text-xl font-bold mb-4">Ideal For</h4>
                    <div className="flex flex-wrap gap-2">
                      {showDetailModal.idealFor.map((ideal, i) => (
                        <span key={i} className="px-4 py-2 bg-vibe-purple/20 rounded-full text-vibe-soft">
                          {ideal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => {
                      setShowDetailModal(null);
                      handleBookCall();
                    }}
                    className="w-full py-4 rounded-xl font-semibold text-lg
                             bg-gradient-to-r from-vibe-pink to-vibe-purple text-white
                             hover:shadow-lg hover:shadow-vibe-pink/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showDetailModal.ctaText}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-vibe-muted mb-4">Not sure which fits? Let's figure it out together.</p>
          <motion.button
            onClick={handleBookCall}
            className="px-8 py-4 rounded-full font-semibold
                     bg-vibe-dark border border-white/20 text-white
                     hover:border-vibe-pink hover:bg-vibe-pink/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a Free Vibe Check Call
          </motion.button>
        </motion.div>

        {/* CRM Pricing Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="glass-card p-6 border-l-4 border-vibe-cyan">
            <h4 className="text-sm font-semibold text-vibe-cyan mb-2 uppercase tracking-wide flex items-center gap-2">
              <img src="/images/emojis/site/icon-chart-up.png" alt="chart" className="w-8 h-8" />
              CRM & Backend Automation
            </h4>
            <p className="text-sm text-vibe-soft leading-relaxed">
              Our custom CRM is available to all of our clients at wholesale pricing. If your project
              requires backend automation, you can bring your own software or you can pay us between
              <span className="text-white font-semibold"> $75 and $500/month </span>
              depending on your use case.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
