import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

/**
 * Arrival corridor.
 * Light bloom → particles (global canvas) → logo → eyebrow → headline → rule → CTA → scroll cue.
 * Parallax: radiance layer moves at 30% scroll speed so it feels atmospheric, not decorative.
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Typography rides upward at half scroll speed — parallax depth
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Radiance bloom moves slower than content — creates layered depth
  const bloomY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const bloomOp = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      data-room="entry"
      className="relative min-h-screen bg-ivory overflow-hidden room-light flex items-center"
    >
      {/* ── ATMOSPHERIC BLOOM — warm diya glow radiating from above ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: bloomY, opacity: bloomOp }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 55% at 50% -5%,  oklch(74% 0.13 80 / 0.28) 0%, transparent 55%),
              radial-gradient(ellipse 60% 40% at 18% 96%,  oklch(33% 0.13 12 / 0.10) 0%, transparent 50%),
              radial-gradient(ellipse 50% 35% at 84% 88%,  oklch(83% 0.05 34 / 0.12) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* ── OM GLYPH — ultra-faint ceremonial anchor ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1,  scale: 1    }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-gold/[0.04]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(14rem, 34vw, 38rem)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          ॐ
        </span>
      </motion.div>

      {/* ── CONTENT — arrival choreography ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 container-custom w-full text-center pt-32 pb-24"
      >
        {/* Step 1 — logo mark / wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-8"
        >
          <span
            className="text-gold/50 tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.55rem' }}
          >
            Jugaadors
          </span>
        </motion.div>

        {/* Step 2 — eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="hairline" />
          <span className="eyebrow">By invitation · Dubai · 2026</span>
          <span className="hairline" />
        </motion.div>

        {/* Step 3 — headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="cg-display text-maroon text-balance max-w-4xl mx-auto mb-10"
        >
          The Great
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--maroon-soft)' }}>Indian Wedding</em>
        </motion.h1>

        {/* Step 4 — gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="gold-rule-v mx-auto mb-10"
          style={{ transformOrigin: 'top' }}
        />

        {/* Step 5 — sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
          className="cg-body text-maroon/60 max-w-lg mx-auto mb-12 text-balance"
        >
          A celebration<em> delivered</em> before the celebration.
        </motion.p>

        {/* Step 6 — CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/product"
            className="btn-primary"
            onClick={() => (window as any)._celebrate?.()}
          >
            Reserve your seat
          </Link>
          <span
            className="text-maroon/40 hidden sm:block select-none"
            style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5rem', letterSpacing: '0.2em' }}
          >
            ·
          </span>
          <Link
            to="/product"
            className="eyebrow text-maroon/50 hover:text-maroon transition-colors duration-500 cursor-pointer"
            style={{ letterSpacing: '0.22em' }}
          >
            Founders Cohort · AED 199 deposit
          </Link>
        </motion.div>
      </motion.div>

      {/* ── SCROLL CUE ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        <span
          className="text-maroon/30 tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5rem' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-gold/50 to-transparent"
          style={{ height: 44 }}
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
