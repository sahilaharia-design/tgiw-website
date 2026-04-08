import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PRODUCT } from '../../utils/constants';
import { formatPrice } from '../../utils/formatters';

const SHOWCASE_IMAGES = [
  { src: '/images/TGIW_Box.png', label: 'Game Box' },
  { src: '/images/open_box_TGIW.png', label: 'Open Box' },
  { src: '/images/exploded-view.png', label: 'Exploded View' },
  { src: '/images/All_game_components_laid_out.png', label: 'All Components' },
];

export default function ProductShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-white" id="collection">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-dark-text">The Complete Experience</h2>
          <p className="section-subtitle">
            Every detail crafted for luxury. Every component built for celebration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Main image */}
            <div className="relative bg-gradient-to-br from-dark-text to-dark-surface rounded-2xl overflow-hidden aspect-square flex items-center justify-center group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={SHOWCASE_IMAGES[activeIdx].src}
                  alt={SHOWCASE_IMAGES[activeIdx].label}
                  className="object-contain p-8 max-h-80 transition-transform duration-300 group-hover:scale-105"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/400x400/1A1A1A/D4AF37?text=TGIW';
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {SHOWCASE_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                    i === activeIdx
                      ? 'border-brand-gold shadow-gold scale-105'
                      : 'border-border-divider hover:border-brand-gold/50'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-contain bg-dark-text/5 p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/80x80/1A1A1A/D4AF37?text=IMG';
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <span className="text-brand-red text-sm font-semibold uppercase tracking-wider">In Stock</span>
              <h3 className="font-serif font-bold text-3xl text-dark-text mt-2 leading-tight">
                {PRODUCT.name}
              </h3>
              <p className="text-brand-gold font-medium mt-1">{PRODUCT.tagline}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif font-bold text-4xl text-brand-red">
                {formatPrice(PRODUCT.price)}
              </span>
              <span className="text-gray-400 text-sm">Including shipping to Dubai</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{PRODUCT.description}</p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Players', value: PRODUCT.players },
                { label: 'Duration', value: PRODUCT.duration },
                { label: 'Age', value: PRODUCT.age },
                { label: 'Language', value: PRODUCT.language },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="bg-soft-bg rounded-xl px-4 py-3 border border-border-divider"
                >
                  <div className="text-gray-400 text-xs uppercase tracking-wider">{spec.label}</div>
                  <div className="font-semibold text-dark-text text-sm mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>

            <Link to="/product" className="btn-primary inline-block text-center w-full md:w-auto px-12 py-4 text-base">
              View Full Details
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
