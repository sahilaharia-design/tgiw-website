import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../utils/constants';

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="section-padding bg-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">From the first guests</span>
            <span className="hairline" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-6"
            >
              <blockquote className="font-serif text-ink text-2xl md:text-4xl leading-tight tracking-editorial text-balance">
                <span className="text-gold/60 text-5xl font-serif align-top leading-none">“</span>
                <span className="display-italic">{TESTIMONIALS[activeIdx].quote}</span>
                <span className="text-gold/60 text-5xl font-serif align-top leading-none">”</span>
              </blockquote>

              <div className="mt-10 flex items-center justify-center gap-3 text-sm tracking-wide text-muted">
                <span>{TESTIMONIALS[activeIdx].author}</span>
                <span className="h-px w-6 bg-gold/50" />
                <span>{TESTIMONIALS[activeIdx].location}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === activeIdx ? 'w-8 h-1.5 bg-maroon' : 'w-1.5 h-1.5 bg-muted/30 hover:bg-maroon/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
