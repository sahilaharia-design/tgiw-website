import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GAME_COMPONENTS } from '../../utils/constants';

export default function ComponentsShowcase() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-soft-bg">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-dark-text">Game Components Overview</h2>
          <p className="section-subtitle">
            200+ premium pieces crafted for an immersive wedding celebration experience.
          </p>
        </motion.div>

        {/* Components image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-dark-text to-dark-surface p-8 flex justify-center"
        >
          <img
            src="/images/All_game_components_laid_out.png"
            alt="All TGIW game components laid out"
            className="max-h-64 md:max-h-80 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/800x300/1A1A1A/D4AF37?text=200%2B+Premium+Components';
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GAME_COMPONENTS.map((comp, i) => {
            const isExpanded = expandedId === comp.id;
            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`bg-white rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                  isExpanded ? 'border-brand-gold shadow-gold' : 'border-border-divider hover:border-brand-gold/40 card-hover'
                }`}
                onClick={() => setExpandedId(isExpanded ? null : comp.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{comp.icon}</span>
                      <div>
                        <h3 className="font-semibold text-dark-text">{comp.name}</h3>
                        <span className="text-brand-gold text-sm font-bold">{comp.count} included</span>
                      </div>
                    </div>
                    <motion.svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500 text-sm mt-4 leading-relaxed overflow-hidden"
                      >
                        {comp.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
