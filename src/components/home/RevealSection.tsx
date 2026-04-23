import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealBlock from '../cinematic/RevealBlock';

/**
 * Ceremonial artifact reveal.
 * The closed box — radial spotlight halo, pedestal shadow, slow float.
 * "A celebration delivered before the celebration."
 */
export default function RevealSection() {
  const boxRef = useRef<HTMLDivElement>(null);
  const boxInView = useInView(boxRef, { once: true, margin: '-12% 0px' });

  return (
    <section
      data-room="spotlight"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(7rem, 14vw, 14rem)' }}
    >
      {/* Spotlight beam — straight down from ceiling */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 70% at 50% -10%, oklch(84% 0.09 82 / 0.22) 0%, transparent 55%),
            radial-gradient(ellipse 30% 40% at 50% 50%, oklch(97.5% 0.009 68 / 0.60) 0%, transparent 65%)
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
          <h2
            className="cg-headline text-maroon text-center text-balance max-w-3xl mx-auto mb-6"
          >
            A celebration <em>delivered</em>
            <br />
            before the celebration.
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.3}>
          <p
            className="text-center text-maroon/55 max-w-md mx-auto mb-20 text-balance"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              lineHeight: 1.9,
              textTransform: 'uppercase',
            }}
          >
            You will know what is inside the moment you open it.
            <br />
            Not before.
          </p>
        </RevealBlock>

        {/* Box artifact */}
        <div ref={boxRef} className="flex flex-col items-center">
          {/* Spotlight halo behind box */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              width: 'clamp(280px, 40vw, 520px)',
              height: 'clamp(280px, 40vw, 520px)',
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, oklch(84% 0.09 82 / 0.20) 0%, oklch(74% 0.13 80 / 0.06) 45%, transparent 70%)',
              borderRadius: '50%',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={boxInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          {/* Box — slow float animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              boxInView
                ? {
                    opacity: 1,
                    y: [0, -10, 0],
                  }
                : {}
            }
            transition={
              boxInView
                ? {
                    opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                    y: {
                      duration: 5.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.2,
                    },
                  }
                : {}
            }
            className="relative"
            style={{ zIndex: 2 }}
          >
            <img
              src="/images/TGIW_Box.png"
              alt="The Great Indian Wedding — closed box"
              className="w-auto"
              style={{
                height: 'clamp(200px, 28vw, 380px)',
                filter: 'drop-shadow(0 32px 64px oklch(33% 0.13 12 / 0.22))',
              }}
            />
          </motion.div>

          {/* Pedestal shadow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={boxInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="w-40 h-3 rounded-full mt-4"
            style={{
              background:
                'radial-gradient(ellipse 100% 100% at 50% 50%, oklch(33% 0.13 12 / 0.18) 0%, transparent 80%)',
              filter: 'blur(8px)',
            }}
          />
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
