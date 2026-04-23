import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealBlock from '../cinematic/RevealBlock';

/**
 * Gold / Collector chamber.
 * Dark background, gold shimmer sweep, distant glow pulse.
 * Gold box image with screen/lighten blend.
 * On section entry → window._distantFireworks() fires once.
 */
export default function GoldEditionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px' });
  const fireworksFired = useRef(false);

  useEffect(() => {
    if (inView && !fireworksFired.current) {
      fireworksFired.current = true;
      // Small delay so section has faded in before fireworks bloom
      const t = setTimeout(() => {
        (window as any)._distantFireworks?.(1.2);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      data-room="collector"
      className="relative overflow-hidden"
      style={{
        background: 'var(--dark)',
        paddingBlock: 'clamp(8rem, 16vw, 16rem)',
      }}
    >
      {/* Collector chamber atmosphere — distant gold glow, deep vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, oklch(74% 0.12 80 / 0.07) 0%, transparent 65%),
            radial-gradient(ellipse 100% 100% at 50% 100%, oklch(23% 0.04 28 / 0.80) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle shimmer sweep across the whole chamber */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%', opacity: 0 }}
        animate={inView ? { x: '200%', opacity: [0, 0.06, 0] } : {}}
        transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.8 }}
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, oklch(84% 0.09 82 / 0.35) 50%, transparent 70%)',
          width: '50%',
        }}
      />

      <div className="relative z-10 container-custom">
        {/* Header */}
        <RevealBlock delay={0}>
          <div className="flex flex-col items-center text-center mb-14">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="h-px w-8"
                style={{ background: 'oklch(74% 0.12 80 / 0.50)' }}
              />
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
              <span
                className="h-px w-8"
                style={{ background: 'oklch(74% 0.12 80 / 0.50)' }}
              />
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

        {/* Gold box */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: [0, -8, 0] } : {}}
            transition={
              inView
                ? {
                    opacity: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.8,
                    },
                  }
                : {}
            }
            className="relative"
          >
            {/* Halo glow behind box */}
            <div
              aria-hidden
              className="absolute inset-0 -m-12 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, oklch(74% 0.12 80 / 0.15) 0%, transparent 65%)',
                filter: 'blur(20px)',
              }}
            />

            <img
              src="/images/TGIW_Gold_limited_edition.png"
              alt="The Great Indian Wedding — Gold Edition"
              className="relative"
              style={{
                height: 'clamp(180px, 26vw, 360px)',
                width: 'auto',
                filter: 'drop-shadow(0 24px 60px oklch(74% 0.12 80 / 0.30))',
                mixBlendMode: 'screen',
              }}
            />
          </motion.div>

          {/* Pedestal shadow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="w-32 h-2 rounded-full mt-3"
            style={{
              background:
                'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(74% 0.12 80 / 0.22) 0%, transparent 80%)',
              filter: 'blur(6px)',
            }}
          />
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
