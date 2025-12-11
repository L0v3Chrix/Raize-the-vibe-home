import { motion } from 'framer-motion';
import { ArrowUp, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useVibeStore } from '../store/vibeStore';

export default function Footer() {
  const { setModalState } = useVibeStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCall = () => {
    setModalState({ isOpen: true, type: 'booking' });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-white/10">
      <div className="absolute inset-0 mesh-bg opacity-10" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to see if we vibe?
          </h2>
          <p className="text-vibe-muted mb-8 max-w-md mx-auto">
            No pressure, no pitch. Just a real conversation about what's possible for your business.
          </p>
          <motion.button
            onClick={handleBookCall}
            className="px-10 py-5 rounded-full font-display font-semibold text-lg
                     bg-gradient-to-r from-vibe-pink via-vibe-purple to-vibe-cyan
                     text-white shadow-lg
                     hover:shadow-[0_0_40px_rgba(255,20,147,0.5)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Your Free Vibe Check Call
          </motion.button>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/images/logo-footer-transparent.png"
                alt="Raize The Vibe"
                className="h-12 w-auto drop-shadow-[0_0_20px_rgba(255,20,147,0.3)] hover:drop-shadow-[0_0_30px_rgba(255,20,147,0.5)] transition-all duration-300 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>
            <p className="text-sm text-vibe-muted leading-relaxed">
              A boutique vibecoding studio for businesses with heart.
              We're not trying to be the biggest — we're trying to be your crew.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-vibe-muted hover:text-vibe-pink transition-colors"
                >
                  Take the Quiz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-vibe-muted hover:text-vibe-pink transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-vibe-muted hover:text-vibe-pink transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={handleBookCall}
                  className="text-sm text-vibe-muted hover:text-vibe-pink transition-colors"
                >
                  Book a Call
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-vibe-muted">Digital Concierge</span>
              </li>
              <li>
                <span className="text-sm text-vibe-muted">Brand & Website</span>
              </li>
              <li>
                <span className="text-sm text-vibe-muted">Infotainment Funnels</span>
              </li>
              <li>
                <span className="text-sm text-vibe-muted">Custom Builds</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:hello@raizethevibe.com"
                  className="flex items-center gap-2 text-sm text-vibe-muted hover:text-vibe-pink transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@raizethevibe.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15125550123"
                  className="flex items-center gap-2 text-sm text-vibe-muted hover:text-vibe-pink transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (512) 555-0123
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-vibe-muted">
                  <MapPin className="w-4 h-4" />
                  Austin, TX
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-sm text-vibe-muted mb-4 md:mb-0">
            © 2025 Raize The Vibe. All rights reserved.
          </p>
          
          <p className="text-sm text-vibe-muted flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-vibe-pink" /> and a whole lot of AI
          </p>

          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 rounded-full bg-vibe-dark border border-white/10
                     hover:border-vibe-pink hover:bg-vibe-pink/10 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Hidden easter egg text for coupon hunt */}
        <div className="mt-8 text-center">
          <span className="text-[4px] text-vibe-muted/10 select-all cursor-default">
            VIBECHECK10 — You found the secret! Use this code for 10% off.
          </span>
        </div>
      </div>
    </footer>
  );
}
