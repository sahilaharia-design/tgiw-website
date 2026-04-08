import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../utils/constants';
import StarRating from '../common/StarRating';

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const prev = () => setActiveIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActiveIdx((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-white" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-container mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-dark-text">What Game Lovers Say</h2>
          <p className="section-subtitle">Verified purchases from across the world.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-soft-bg rounded-3xl p-10 text-center border border-border-divider"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-brand-gold/20 border-2 border-brand-gold mx-auto mb-5 flex items-center justify-center text-2xl font-serif font-bold text-brand-gold">
                {TESTIMONIALS[activeIdx].author.charAt(0)}
              </div>

              <StarRating rating={TESTIMONIALS[activeIdx].rating} size="lg" />

              <blockquote className="mt-5 text-dark-text text-lg font-serif italic leading-relaxed">
                "{TESTIMONIALS[activeIdx].quote}"
              </blockquote>

              <div className="mt-5 flex items-center justify-center gap-3">
                <div>
                  <p className="font-semibold text-dark-text">{TESTIMONIALS[activeIdx].author}</p>
                  <p className="text-gray-400 text-sm">{TESTIMONIALS[activeIdx].location}</p>
                </div>
                {TESTIMONIALS[activeIdx].verified && (
                  <span className="text-xs bg-brand-green/10 text-brand-green border border-brand-green/30 px-2 py-0.5 rounded-full font-medium">
                    ✓ Verified
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-dark-text transition-all duration-300 flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx ? 'w-6 h-2.5 bg-brand-gold' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-brand-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-dark-text transition-all duration-300 flex items-center justify-center"
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
