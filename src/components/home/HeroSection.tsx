import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

/**
 * Arrival corridor — strict light-before-typography choreography.
 *
 * Reveal order:
 *   0.00s — chandelier bloom (warm radial glow from ceiling)
 *   0.10s — OM glyph (architectural shadow depth)
 *   0.20s — canopy particles begin (global canvas, already running)
 *   0.30s — architectural depth layer settles
 *   0.50s — logo / wordmark
 *   0.75s — eyebrow label
 *   0.95s — headline
 *   1.25s — gold rule (spring: scaleY from top)
 *   1.40s — sub-line
 *   1.65s — CTA
 *   2.00s — scroll cue
 *
 * Parallax depth:
 *   bloom layer:   y * 0.12  (slowest — feels distant, atmospheric)
 *   content:       y * 0.22  (moderate — stabilizes after scroll)
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '22%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.75], [1, prefersReduced ? 1 : 0]);
  const bloomY    = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '12%']);

  return (
    <section
      ref={ref}
      data-room="entry"
      className="relative min-h-screen overflow-hidden room-light flex items-center"
      style={{ background: 'var(--ivory)' }}
    >
      {/* ── STEP 1: CHANDELIER BLOOM — light before everything ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: bloomY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0 }}
      >
        {/* Primary chandelier glow — warm amber from upper center */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 75% 50% at 50% -8%,  oklch(84% 0.09 82 / 0.32) 0%, transparent 52%),
              radial-gradient(ellipse 50% 35% at 50% -2%,  oklch(74% 0.13 80 / 0.18) 0%, transparent 40%),
              radial-gradient(ellipse 45% 30% at 18% 92%,  oklch(33% 0.13 12 / 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 40% 25% at 86% 85%,  oklch(83% 0.05 34 / 0.10) 0%, transparent 50%)
            `,
          }}
        />

        {/* Secondary halo pulse — brief flash that settles to ambient glow */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.28] }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.15, times: [0, 0.3, 1] }}
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, oklch(84% 0.09 82 / 0.25) 0%, transparent 45%)',
          }}
        />
      </motion.div>

      {/* ── STEP 2: OM GLYPH — architectural depth, fades in with bloom ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 3.0, ease: 'easeOut', delay: 0.10 },
          scale:   { type: 'spring', damping: 40, stiffness: 30, delay: 0.10 },
        }}
      >
        <span
          className="text-gold/[0.035] select-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(14rem, 36vw, 42rem)',
            lineHeight: 1,
          }}
        >
          ॐ
        </span>
      </motion.div>

      {/* ── CONTENT — parallaxes as camera moves forward ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 container-custom w-full text-center pt-32 pb-24"
      >
        {/* STEP 3: Logo wordmark — first text element, 0.50s */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 32, stiffness: 80, delay: 0.50 }}
          className="mb-10"
        >
          <span
            className="text-gold/45 tracking-[0.45em] uppercase select-none"
            style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.52rem' }}
          >
            Jugaadors
          </span>
        </motion.div>

        {/* STEP 4: Eyebrow — 0.75s */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 85, delay: 0.75 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="hairline" />
          <span className="eyebrow">By invitation · Dubai · 2026</span>
          <span className="hairline" />
        </motion.div>

        {/* STEP 5: Headline — 0.95s — largest element, most weight */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 75, delay: 0.95 }}
          className="cg-display text-maroon text-balance max-w-4xl mx-auto mb-10"
        >
          The Great
          <br />
          <em style={{ color: 'var(--maroon-soft)' }}>Indian Wedding</em>
        </motion.h1>

        {/* STEP 6: Gold rule — 1.25s — spring scaleY from top */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 32, stiffness: 100, delay: 1.25 }}
          style={{ transformOrigin: 'top' }}
        >
          <div className="gold-rule-v mx-auto mb-10" />
        </motion.div>

        {/* STEP 7: Sub-line — 1.40s */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 80, delay: 1.40 }}
          className="cg-body text-maroon/55 max-w-lg mx-auto mb-14 text-balance"
        >
          A celebration<em> delivered</em> before the celebration.
        </motion.p>

        {/* STEP 8: CTA — 1.65s — last to arrive */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 32, stiffness: 80, delay: 1.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/product" className="btn-primary">
            Reserve your seat
          </Link>
          <Link
            to="/product"
            className="eyebrow text-maroon/45 hover:text-maroon transition-colors duration-500"
            style={{ letterSpacing: '0.22em' }}
          >
            Founders Cohort · AED 199 deposit
          </Link>
        </motion.div>
      </motion.div>

      {/* ── SCROLL CUE — 2.00s — after full composition settles ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.00 }}
      >
        <span
          className="text-maroon/28 tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '0.5rem' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-gold/45 to-transparent"
          style={{ height: 44 }}
          animate={prefersReduced ? {} : { scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
