import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealBlock from '../cinematic/RevealBlock';

/**
 * Ceremonial artifact reveal.
 * Bright saffron spotlight on warm parchment.
 * Open-box peek shown below closed box — "intrigue" layer.
 * 5-stage ceremonial staging.
 */
export default function RevealSection() {
  const boxRef = useRef<HTMLDivElement>(null);
  const boxInView = useInView(boxRef, { once: true, margin: '-12% 0px' });
  const prefersReduced = useReducedMotion();

  return (
    <section
      data-room="spotlight"
      className="relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(7rem, 14vw, 14rem)',
        background: 'oklch(92% 0.035 68)',
      }}
    >
      {/* Saffron spotlight beam — straight down from ceiling */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 52% 80% at 50% -14%, oklch(72% 0.22 65  / 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 32% 44% at 50%  48%, oklch(76% 0.22 72  / 0.40) 0%, transparent 65%)
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
            className="text-center text-maroon/60 max-w-md mx-auto mb-20 text-balance"
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

          {/* Step 1: Environmental zone glow */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(400px, 55vw, 700px)',
              height: 'clamp(400px, 55vw, 700px)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(ellipse 72% 72% at 50% 50%, oklch(72% 0.22 65 / 0.18) 0%, oklch(76% 0.22 72 / 0.05) 50%, transparent 72%)',
              filter: 'blur(22px)',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={boxInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2.4, ease: 'easeOut', delay: 0 }}
          />

          {/* Step 2: Radial spotlight halo — saffron */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(260px, 38vw, 480px)',
              height: 'clamp(260px, 38vw, 480px)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -60%)',
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, oklch(72% 0.22 65 / 0.30) 0%, oklch(76% 0.22 72 / 0.10) 42%, transparent 70%)',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={boxInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', damping: 40, stiffness: 35, delay: 0.15 }}
          />

          {/* Step 3: Closed box — floats */}
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
                  'drop-shadow(0 32px 72px oklch(33% 0.13 12 / 0.28)) drop-shadow(0 0 28px oklch(72% 0.22 65 / 0.18))',
              }}
            />
          </motion.div>

          {/* Steps 4 + 5: Pedestal shadow + ambient ground reflection */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0.15 }}
            animate={boxInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ type: 'spring', damping: 32, stiffness: 60, delay: 0.65 }}
            className="flex flex-col items-center gap-1 mt-2"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={boxInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }}
              style={{
                width: 'clamp(100px, 14vw, 200px)',
                height: '4px',
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(72% 0.22 65 / 0.28) 0%, transparent 80%)',
                filter: 'blur(3px)',
              }}
            />
            <div
              style={{
                width: 'clamp(60px, 10vw, 140px)',
                height: '8px',
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(33% 0.13 12 / 0.22) 0%, transparent 80%)',
                filter: 'blur(10px)',
              }}
            />
          </motion.div>

          {/* Open box peek — intrigue layer below the closed box */}
          <RevealBlock delay={0.9} y={12}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <span
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'oklch(33% 0.13 12 / 0.45)',
                }}
              >
                A glimpse of what awaits
              </span>
              <img
                src="/images/TGIW_open_box.jpg"
                alt="The Great Indian Wedding — open box"
                style={{
                  width: 'clamp(240px, 36vw, 480px)',
                  height: 'auto',
                  borderRadius: '2px',
                  filter: 'drop-shadow(0 16px 40px oklch(33% 0.13 12 / 0.22))',
                  opacity: 0.92,
                }}
              />
            </div>
          </RevealBlock>
        </div>

        {/* CTA */}
        <RevealBlock delay={0.5}>
          <div className="flex justify-center mt-12">
            <Link to="/product" className="btn-saffron">
              See what awaits
            </Link>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
