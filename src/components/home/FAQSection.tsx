import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../utils/constants';

/**
 * FAQ — Cormorant questions, gold rule separators, Inter Tight answers.
 * Room: questions — bright, open, generous.
 */
export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      data-room="questions"
      className="relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(7rem, 14vw, 13rem)',
        background: `linear-gradient(
          180deg,
          oklch(93% 0.04 68) 0%,
          oklch(91% 0.05 70) 100%
        )`,
      }}
    >
      {/* Warm saffron-parchment glow from top */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 45% at 50% 0%, oklch(76% 0.22 72 / 0.28) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 85% 95%, oklch(72% 0.22 65 / 0.16) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="hairline" />
            <span className="eyebrow">If you are wondering</span>
            <span className="hairline" />
          </div>
          <h2 className="cg-headline text-maroon text-balance">
            Questions,{' '}
            <em>gently answered.</em>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              >
                {/* Top gold rule */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                <button
                  className="w-full text-start py-8 flex items-center justify-between gap-8 focus:outline-none group"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {/* Question — Cormorant Garamond */}
                  <span
                    className="text-maroon group-hover:text-maroon/70 transition-colors duration-500"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.q}
                  </span>

                  {/* Toggle mark */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 select-none"
                    style={{
                      color: 'var(--gold)',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: '1.6rem',
                      lineHeight: 1,
                      width: 28,
                      textAlign: 'center',
                    }}
                  >
                    +
                  </motion.div>
                </button>

                {/* Answer — Inter Tight */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-8 text-maroon/60 max-w-reading"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontSize: '0.78rem',
                          letterSpacing: '0.06em',
                          lineHeight: 1.95,
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {/* Bottom gold rule */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
