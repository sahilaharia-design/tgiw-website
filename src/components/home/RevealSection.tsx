import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealBlock from '../cinematic/RevealBlock';

/**
 * Ceremonial artifact reveal.
 * Staging order:
 *   1. Environmental glow surrounding reveal zone (bloom)
 *   2. Radial spotlight halo behind object
 *   3. Box floats into frame
 *   4. Pedestal shadow scales in from center
 *   5. Ambient ground reflection glows on
 */
export default function RevealSection() {
  const boxRef = useRef<HTMLDivElement>(null);
  const boxInView = useInView(boxRef, { once: true, margin: '-12% 0px' });
  const prefersReduced = useReducedMotion();

  return (
    <section
      data-room="spotlight"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(7rem, 14vw, 14rem)' }}
    >
      {/* Spotlight beam from ceiling — straight down */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 75% at 50% -12%, oklch(84% 0.09 82 / 0.26) 0%, transparent 55%),
            radial-gradient(ellipse 30% 42% at 50% 48%,  oklch(97.5% 0.009 68 / 0.55) 0%, transparent 65%)
          `,
        }}
      />

      <div className="relative z-10 container-custom">
        {/* Headline */}
        <RevealBlock delay={0}>
          <div className="flex items-center justify-center gap-4 mb-10 text-center">
            <span className="hairline" />
            <span className="eyebrow">The Shaadi</span>
            <span className="hairline" />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.15} y={28}>
          <h2 className="cg-headline text-maroon text-center text-balance max-w-3xl mx-auto mb-6">
            A celebration <em>delivered</em>
            <br />
            before the celebration.
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.3}>
          <p
            className="text-center text-maroon/50 max-w-md mx-auto mb-20 text-balance"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              lineHeight: 1.95,
              textTransform: 'uppercase',
            }}
          >
            You will know what is inside
            <br />
            the moment you open it. Not before.
          </p>
        </RevealBlock>

        {/* ── CEREMONIAL ARTIFACT PRESENTATION ── */}
        <div ref={boxRef} className="flex flex-col items-center relative">

          {/* Step 1: Environmental glow surrounding the reveal zone */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(400px, 55vw, 700px)',
              height: 'clamp(400px, 55vw, 700px)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `
                radial-gradient(ellipse 70% 70% at 50% 50%, oklch(84% 0.09 82 / 0.14) 0%, oklch(74% 0.13 80 / 0.04) 50%, transparent 72%)
              `,
              filter: 'blur(20px)',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={boxInView ? { opacity: 1, scale: 1.0 } : {}}
            transition={{ duration: 2.4, ease: 'easeOut', delay: 0 }}
          />

          {/* Step 2: Radial spotlight halo — tighter, more defined */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(260px, 38vw, 480px)',
              height: 'clamp(260px, 38vw, 480px)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -60%)',
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, oklch(84% 0.09 82 / 0.24) 0%, oklch(74% 0.13 80 / 0.08) 42%, transparent 70%)',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={boxInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', damping: 40, stiffness: 35, delay: 0.15 }}
          />

          {/* Step 3: Box — floats into frame, then slowly levitates */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={
              boxInView
                ? {
                    opacity: 1,
                    y: prefersReduced ? 0 : [0, -12, 0],
                  }
                : {}
            }
            transition={
              boxInView
                ? {
                    opacity: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.20 },
                    y: prefersReduced
                      ? {}
                      : { duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 },
                  }
                : {}
            }
            style={{ position: 'relative', zIndex: 2 }}
          >
            <img
              src="/images/TGIW_Box.png"
              alt="The Great Indian Wedding — closed box"
              style={{
                height: 'clamp(200px, 28vw, 380px)',
                width: 'auto',
                filter:
                  'drop-shadow(0 32px 72px oklch(33% 0.13 12 / 0.22)) drop-shadow(0 0 24px oklch(74% 0.13 80 / 0.10))',
              }}
            />
          </motion.div>

          {/* Step 4: Pedestal shadow — scales in from center */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0.15 }}
            animate={boxInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ type: 'spring', damping: 32, stiffness: 60, delay: 0.65 }}
            className="flex flex-col items-center gap-1 mt-2"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Step 5: Ambient ground reflection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={boxInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }}
              style={{
                width: 'clamp(100px, 14vw, 200px)',
                height: '4px',
                background:
                  'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(84% 0.09 82 / 0.20) 0%, transparent 80%)',
                filter: 'blur(3px)',
              }}
            />
            {/* Pedestal shadow disc */}
            <div
              style={{
                width: 'clamp(60px, 10vw, 140px)',
                height: '8px',
                background:
                  'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(33% 0.13 12 / 0.22) 0%, transparent 80%)',
                filter: 'blur(10px)',
              }}
            />
          </motion.div>
        </div>

        {/* CTA */}
        <RevealBlock delay={0.5}>
          <div className="flex justify-center mt-16">
            <Link to="/product" className="btn-primary">
              See what awaits
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
