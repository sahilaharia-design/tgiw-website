import { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import RevealBlock from '../cinematic/RevealBlock';

/**
 * Gold / Collector chamber.
 * Dark background, sandstone-to-gold gradient depth layering.
 * Faint palace rooftop silhouettes in the background.
 * Soft shimmer halo behind artifact + gradient haze object-plane separation.
 * On section entry → window._distantFireworks() fires once.
 */

// Palace rooftop silhouette — Mughal chhatri / minaret outlines, very low opacity
function RooftopSilhouette() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax meet"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 'auto',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 1,
      }}
      fill="currentColor"
      className="text-gold"
    >
      {/* Main palace body */}
      <rect x="0"    y="140" width="1440" height="80" />
      {/* Central gateway arch */}
      <path d="M660 140 Q720 60 780 140 Z" />
      {/* Left chhatri tower */}
      <path d="M300 140 L300 90 Q320 50 340 90 L340 140 Z" />
      <path d="M296 90 Q320 44 344 90 Z" />
      {/* Right chhatri tower */}
      <path d="M1100 140 L1100 90 Q1120 50 1140 90 L1140 140 Z" />
      <path d="M1096 90 Q1120 44 1144 90 Z" />
      {/* Left minaret */}
      <rect x="160" y="80" width="20" height="60" rx="2" />
      <path d="M160 80 Q170 55 180 80 Z" />
      {/* Right minaret */}
      <rect x="1260" y="80" width="20" height="60" rx="2" />
      <path d="M1260 80 Q1270 55 1280 80 Z" />
      {/* Battlements / merlons */}
      {Array.from({ length: 36 }, (_, i) => (
        <rect key={i} x={i * 40} y="130" width="22" height="14" />
      ))}
      {/* Small decorative domes */}
      <path d="M500 140 Q530 115 560 140 Z" />
      <path d="M880 140 Q910 115 940 140 Z" />
      {/* Flagpoles */}
      <line x1="320" y1="44" x2="320" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="1120" y1="44" x2="1120" y2="30" stroke="currentColor" strokeWidth="1.5" />
      <path d="M320 30 L334 36 L320 42 Z" />
      <path d="M1120 30 L1134 36 L1120 42 Z" />
    </svg>
  );
}

export default function GoldEditionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px' });
  const fireworksFired = useRef(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (inView && !fireworksFired.current && !prefersReduced) {
      fireworksFired.current = true;
      const t = setTimeout(() => {
        (window as any)._distantFireworks?.(1.2);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [inView, prefersReduced]);

  return (
    <section
      ref={sectionRef}
      data-room="collector"
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(
          160deg,
          oklch(18% 0.16 30)  0%,
          oklch(20% 0.12 45) 35%,
          oklch(22% 0.10 60) 65%,
          oklch(16% 0.08 22) 100%
        )`,
        paddingBlock: 'clamp(8rem, 16vw, 16rem)',
      }}
    >
      {/* ── SANDSTONE → GOLD GRADIENT DEPTH LAYERING ── */}
      {/* Back plane: warm sandstone haze */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 110% 55% at 50% 0%,   oklch(72% 0.22 65 / 0.35)  0%, transparent 50%),
            radial-gradient(ellipse 80%  60% at 50% 50%,  oklch(76% 0.22 72 / 0.12)  0%, transparent 65%),
            radial-gradient(ellipse 55%  40% at 88% 85%,  oklch(52% 0.28 345 / 0.18) 0%, transparent 55%),
            radial-gradient(ellipse 100% 40% at 50% 100%, oklch(16% 0.08 22 / 0.80)  0%, transparent 50%)
          `,
          zIndex: 1,
        }}
      />

      {/* Object-plane haze separator — a horizontal gradient band behind the box */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 65vw, 800px)',
          height: 'clamp(300px, 50vw, 600px)',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, oklch(74% 0.12 80 / 0.06) 0%, transparent 70%)',
          filter: 'blur(32px)',
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
      />

      {/* ── PALACE ROOFTOP SILHOUETTES ── */}
      <RooftopSilhouette />

      {/* Subtle shimmer sweep across the chamber */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        initial={{ x: '-100%', opacity: 0 }}
        animate={inView && !prefersReduced ? { x: '200%', opacity: [0, 0.18, 0] } : {}}
        transition={{ duration: 3.8, ease: 'easeInOut', delay: 0.6 }}
      >
        <div
          className="absolute inset-y-0"
          style={{
            width: '45%',
            background:
              'linear-gradient(105deg, transparent 30%, oklch(76% 0.22 72 / 0.55) 50%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 container-custom">
        {/* Header */}
        <RevealBlock delay={0}>
          <div className="flex flex-col items-center text-center mb-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-8" style={{ background: 'oklch(74% 0.12 80 / 0.50)' }} />
              <span
                className="gold-shimmer"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                }}
              >
                Gold Edition · Collector
              </span>
              <span className="h-px w-8" style={{ background: 'oklch(74% 0.12 80 / 0.50)' }} />
            </div>

            <h2
              className="cg-headline text-balance max-w-2xl mb-6"
              style={{ color: 'oklch(84% 0.09 82)' }}
            >
              For the Shaadi that deserves
              <br />
              <em>a gold-foil entrance.</em>
            </h2>

            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'oklch(84% 0.09 82 / 0.40)',
                lineHeight: 2.0,
              }}
            >
              A collector's edition.
              <br />
              Arrives later. Waitlist only.
            </p>
          </div>
        </RevealBlock>

        {/* ── ARTIFACT PRESENTATION ── */}
        <div className="flex flex-col items-center" style={{ position: 'relative', zIndex: 3 }}>
          {/* Soft shimmer halo — behind box, larger than box */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(320px, 48vw, 600px)',
              height: 'clamp(320px, 48vw, 600px)',
              background: `
                radial-gradient(ellipse 65% 65% at 50% 50%, oklch(74% 0.12 80 / 0.18) 0%, oklch(74% 0.12 80 / 0.06) 45%, transparent 70%)
              `,
              filter: 'blur(16px)',
              borderRadius: '50%',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', damping: 40, stiffness: 35, delay: 0.2 }}
          />

          {/* Gold box — float + subtle ambient ground reflection below */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: prefersReduced ? 0 : [0, -10, 0],
                  }
                : {}
            }
            transition={
              inView
                ? {
                    opacity: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
                    y: prefersReduced
                      ? {}
                      : { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                  }
                : {}
            }
            style={{ position: 'relative', zIndex: 2 }}
          >
            <img
              src="/images/TGIW_Gold_limited_edition.png"
              alt="The Great Indian Wedding — Gold Edition"
              style={{
                height: 'clamp(180px, 26vw, 360px)',
                width: 'auto',
                filter: 'drop-shadow(0 24px 64px oklch(74% 0.12 80 / 0.35)) drop-shadow(0 0 30px oklch(74% 0.12 80 / 0.15))',
                mixBlendMode: 'screen',
              }}
            />
          </motion.div>

          {/* Pedestal shadow + ambient ground reflection */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0.15 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ type: 'spring', damping: 35, stiffness: 60, delay: 0.9 }}
            className="flex flex-col items-center gap-1 mt-2"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Ground reflection glow */}
            <div
              style={{
                width: 'clamp(80px, 12vw, 160px)',
                height: '3px',
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(74% 0.12 80 / 0.25) 0%, transparent 80%)',
                filter: 'blur(4px)',
              }}
            />
            {/* Shadow beneath */}
            <div
              style={{
                width: 'clamp(60px, 10vw, 120px)',
                height: '6px',
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(23% 0.04 28 / 0.55) 0%, transparent 80%)',
                filter: 'blur(8px)',
              }}
            />
          </motion.div>
        </div>

        {/* CTA */}
        <RevealBlock delay={0.55}>
          <div className="flex justify-center mt-14">
            <a
              href="mailto:info@celebratetgiw.com?subject=Gold%20Edition%20Waitlist"
              className="btn-ghost"
              style={{ color: 'oklch(84% 0.09 82)', borderColor: 'oklch(74% 0.12 80 / 0.40)' }}
            >
              Join the waitlist
            </a>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.7}>
          <p
            className="text-center mt-6"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'oklch(84% 0.09 82 / 0.25)',
            }}
          >
            Pricing and availability announced to waitlist first
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
