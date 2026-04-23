import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

/**
 * Hero — Grand Indian Wedding arrival.
 * Dark jewel-tone background with saffron/marigold bloom.
 * Marigold garland arch as decorative crown.
 * Strict light-before-typography choreography.
 */

/** SVG marigold garland arch — decorative crown above headline */
function MarigoldGarland() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 120"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', maxWidth: 780, height: 'auto', display: 'block' }}
    >
      {/* Garland string */}
      <path
        d="M20 90 Q200 30 400 20 Q600 30 780 90"
        fill="none"
        stroke="#FF8C00"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />
      {/* Marigold blooms along the garland — circles with petal rings */}
      {[
        { cx: 20,  cy: 90 },
        { cx: 80,  cy: 60 },
        { cx: 150, cy: 38 },
        { cx: 230, cy: 26 },
        { cx: 320, cy: 20 },
        { cx: 400, cy: 18 },
        { cx: 480, cy: 20 },
        { cx: 570, cy: 26 },
        { cx: 650, cy: 38 },
        { cx: 720, cy: 60 },
        { cx: 780, cy: 90 },
      ].map(({ cx, cy }, i) => {
        const isCenter = i === 5;
        const r = isCenter ? 14 : i === 4 || i === 6 ? 11 : i === 3 || i === 7 ? 9 : 7;
        const colors = ['#FF8C00', '#FFD700', '#FF6B00', '#FFA500', '#FF4500'];
        const c = colors[i % colors.length];
        const inner = i % 2 === 0 ? '#FFD700' : '#FF8C00';
        return (
          <g key={i}>
            {/* Outer petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <ellipse
                key={angle}
                cx={cx + Math.cos((angle * Math.PI) / 180) * (r * 1.1)}
                cy={cy + Math.sin((angle * Math.PI) / 180) * (r * 1.1)}
                rx={r * 0.45}
                ry={r * 0.25}
                transform={`rotate(${angle}, ${cx + Math.cos((angle * Math.PI) / 180) * (r * 1.1)}, ${cy + Math.sin((angle * Math.PI) / 180) * (r * 1.1)})`}
                fill={c}
                fillOpacity="0.85"
              />
            ))}
            {/* Center */}
            <circle cx={cx} cy={cy} r={r * 0.5} fill={inner} fillOpacity="0.95" />
          </g>
        );
      })}
      {/* Hanging leaf tassels at a few points */}
      {[80, 230, 400, 570, 720].map((x, i) => {
        const yBase = i === 2 ? 18 : i === 1 || i === 3 ? 26 : 60;
        return (
          <g key={x}>
            <line x1={x} y1={yBase + 8} x2={x - 4} y2={yBase + 22} stroke="#4CAF50" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1={x} y1={yBase + 8} x2={x + 4} y2={yBase + 22} stroke="#4CAF50" strokeWidth="1.2" strokeOpacity="0.6" />
            <ellipse cx={x - 4} cy={yBase + 26} rx="3" ry="5" fill="#2E7D32" fillOpacity="0.65" transform={`rotate(-15,${x - 4},${yBase + 26})`} />
            <ellipse cx={x + 4} cy={yBase + 26} rx="3" ry="5" fill="#2E7D32" fillOpacity="0.65" transform={`rotate(15,${x + 4},${yBase + 26})`} />
          </g>
        );
      })}
    </svg>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '20%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.75], [1, prefersReduced ? 1 : 0]);
  const bloomY    = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '10%']);

  return (
    <section
      ref={ref}
      data-room="entry"
      className="dark-section relative min-h-screen overflow-hidden flex items-center"
      style={{
        background: `linear-gradient(
          160deg,
          oklch(20% 0.18 12)  0%,
          oklch(18% 0.15 25) 35%,
          oklch(22% 0.12 45) 65%,
          oklch(25% 0.10 60) 100%
        )`,
      }}
    >
      {/* ── STEP 1: CHANDELIER BLOOM — saffron + ruby light ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: bloomY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, ease: 'easeOut', delay: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 75% 50% at 50% -8%,  oklch(72% 0.22 65 / 0.55) 0%, transparent 52%),
              radial-gradient(ellipse 50% 35% at 50% -2%,  oklch(76% 0.22 72 / 0.30) 0%, transparent 40%),
              radial-gradient(ellipse 40% 30% at 12% 95%,  oklch(52% 0.28 345 / 0.22) 0%, transparent 50%),
              radial-gradient(ellipse 35% 25% at 90% 90%,  oklch(32% 0.22 18  / 0.20) 0%, transparent 50%)
            `,
          }}
        />
        {/* Chandelier halo pulse */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.65, 0.25] }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.12, times: [0, 0.28, 1] }}
          style={{
            background:
              'radial-gradient(ellipse 60% 38% at 50% 0%, oklch(72% 0.22 65 / 0.38) 0%, transparent 45%)',
          }}
        />
      </motion.div>

      {/* ── STEP 2: OM GLYPH — architectural depth, gold on dark ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 3.0, ease: 'easeOut', delay: 0.08 },
          scale:   { type: 'spring', damping: 40, stiffness: 28, delay: 0.08 },
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(14rem, 36vw, 42rem)',
            lineHeight: 1,
            color: 'oklch(74% 0.125 80 / 0.07)',
            userSelect: 'none',
          }}
        >
          ॐ
        </span>
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-10 container-custom w-full text-center pt-32 pb-24"
      >
        {/* STEP 3: Marigold garland arch — decorative crown, 0.30s */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 70, delay: 0.30 }}
          className="flex justify-center mb-4"
        >
          <MarigoldGarland />
        </motion.div>

        {/* STEP 4: Logo image, 0.50s */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 32, stiffness: 80, delay: 0.50 }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/images/TGIW_Logo_Final.png"
            alt="The Great Indian Wedding"
            style={{
              height: 'clamp(50px, 8vw, 80px)',
              width: 'auto',
              filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(5deg)',
              opacity: 0.92,
            }}
          />
        </motion.div>

        {/* STEP 5: Eyebrow, 0.70s */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 85, delay: 0.70 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span
            className="h-px w-10"
            style={{ background: 'oklch(84% 0.09 82 / 0.70)' }}
          />
          <span className="eyebrow" style={{ color: 'oklch(84% 0.09 82)' }}>
            By invitation · Dubai · 2026
          </span>
          <span
            className="h-px w-10"
            style={{ background: 'oklch(84% 0.09 82 / 0.70)' }}
          />
        </motion.div>

        {/* STEP 6: Headline — gold shimmer on dark bg, 0.90s */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 72, delay: 0.90 }}
          className="cg-display text-balance max-w-4xl mx-auto mb-10"
          style={{ color: 'transparent' }}
        >
          <span className="gold-shimmer">The Great</span>
          <br />
          <span className="gold-shimmer">Indian Wedding</span>
        </motion.h1>

        {/* STEP 7: Gold rule, 1.20s */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 32, stiffness: 100, delay: 1.20 }}
          style={{ transformOrigin: 'top' }}
        >
          <div
            className="mx-auto mb-10"
            style={{
              width: '1px',
              height: '72px',
              background: 'linear-gradient(to bottom, transparent, oklch(84% 0.09 82 / 0.85), transparent)',
            }}
          />
        </motion.div>

        {/* STEP 8: Sub-line, 1.35s */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 80, delay: 1.35 }}
          className="cg-body text-balance max-w-lg mx-auto mb-14"
          style={{ color: 'oklch(92% 0.04 70)', fontStyle: 'italic' }}
        >
          A celebration <em>delivered</em> before the celebration.
        </motion.p>

        {/* STEP 9: CTA saffron button, 1.60s */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 32, stiffness: 80, delay: 1.60 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/product" className="btn-saffron">
            Reserve your seat
          </Link>
          <Link
            to="/product"
            className="eyebrow hover:opacity-100 transition-opacity duration-500"
            style={{
              color: 'oklch(84% 0.09 82 / 0.60)',
              letterSpacing: '0.22em',
              opacity: 0.6,
            }}
          >
            Founders Cohort · AED 199 deposit
          </Link>
        </motion.div>
      </motion.div>

      {/* ── SCROLL CUE — 2.00s ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.00 }}
      >
        <span
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: '0.5rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'oklch(84% 0.09 82 / 0.40)',
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: '1px',
            height: '44px',
            background: 'linear-gradient(to bottom, oklch(72% 0.22 65 / 0.60), transparent)',
          }}
          animate={prefersReduced ? {} : { scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
