import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../utils/constants';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="section-padding bg-ivory">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">If you are wondering</span>
            <span className="hairline" />
          </div>
          <h2 className="display-lg text-ink text-balance">
            <span className="display-italic">Questions,</span> gently answered.
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="border-b border-ink/10"
              >
                <button
                  className="w-full text-start py-7 flex items-center justify-between gap-6 focus:outline-none group"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl md:text-2xl text-ink tracking-editorial group-hover:text-maroon transition-colors duration-500">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 text-gold-deep text-2xl font-light select-none"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-ink-soft/80 text-base md:text-lg leading-relaxed max-w-reading font-light">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
