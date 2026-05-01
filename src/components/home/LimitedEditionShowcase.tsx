import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONTACT_EMAIL } from '../../utils/constants';

export default function LimitedEditionShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-gradient-to-br from-dark-text to-dark-surface overflow-hidden relative">
      {/* Background shimmer */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 70% 50%, #D4AF37 0%, transparent 50%)',
        }}
      />

      <div className="max-w-container mx-auto px-5 md:px-10 relative">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 rounded-full blur-3xl bg-brand-gold/15" />
            <motion.img
              src="/images/TGIW_Gold_limited_edition.png"
              alt="TGIW Gold Limited Edition"
              className="relative z-10 max-w-xs md:max-w-sm object-contain animate-pulse-glow"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/400x400/1A1A1A/D4AF37?text=Gold+Edition';
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/50 text-brand-gold px-4 py-2 rounded-full text-sm font-semibold">
              <span>👑</span>
              <span>Exclusive Gold Edition</span>
            </div>

            <h2 className="font-serif font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
              TGIW <span className="gold-shimmer">Gold Limited</span> Edition
            </h2>

            <p className="text-white/70 leading-relaxed text-base">
              The ultimate collector's edition featuring premium gold-accented packaging, exclusive components,
              and handcrafted luxury finishes. Each unit is individually numbered and comes with a certificate
              of authenticity.
            </p>

            <ul className="space-y-2 text-white/60 text-sm">
              {[
                'Premium gold-foil packaging with custom box',
                'Individually numbered collector\'s edition',
                'Exclusive gold-plated coin set',
                'Velvet-lined interior presentation',
                'Certificate of authenticity included',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">✦</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=TGIW Gold Edition Inquiry`}
                className="btn-outline-gold inline-block"
              >
                Request Pricing
              </a>
              <p className="self-center text-white/40 text-xs">Limited quantities — contact for availability</p>
            </div>

            <div className="flex items-center gap-2 text-brand-red text-sm font-medium">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              Limited quantities available
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
