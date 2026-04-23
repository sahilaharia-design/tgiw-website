import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { PRODUCT, PREORDER } from '../../utils/constants';

/**
 * The one moment we show the box.
 * Closed. Still. Lit from above.
 * No components. No mechanics. No reveal.
 */
export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-maroon-deep text-ivory"
      style={{ minHeight: '120vh' }}
    >
      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 40%, rgba(232,165,58,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(184,146,62,0.2) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative container-custom py-32 md:py-44 grid md:grid-cols-2 gap-16 items-center">
        {/* Copy side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold/60" />
            <span className="eyebrow !text-gold-light">{PRODUCT.cohort}</span>
          </div>

          <h2 className="display-lg text-ivory text-balance">
            What arrives
            <br />
            <span className="display-italic text-gold-light">is a night.</span>
          </h2>

          <p className="text-ivory/70 text-lg md:text-xl leading-relaxed font-light max-w-md">
            We will not tell you what is inside.
            <br />
            That part is yours to open.
          </p>

          <div className="pt-4 space-y-2 text-ivory/60 text-sm tracking-wide">
            <p>
              <span className="text-gold-light">AED {PREORDER.totalAED}</span> — total
            </p>
            <p>
              <span className="text-gold-light">AED {PREORDER.depositAED}</span> — refundable deposit to reserve
            </p>
            <p>Ships in {PREORDER.cohortShipMonths} months · Dubai</p>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Link
              to="/product"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gold text-maroon-deep font-medium tracking-wide transition-all duration-500 hover:bg-gold-light hover:shadow-glow-gold"
            >
              Reserve your Shaadi
            </Link>
            <Link
              to="/product"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-ivory/20 text-ivory/90 font-light tracking-wide transition-all duration-500 hover:bg-ivory/5"
            >
              The quiet details →
            </Link>
          </div>
        </motion.div>

        {/* Image side — closed box only */}
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="relative flex items-center justify-center"
        >
          {/* Pool of light behind */}
          <motion.div
            className="absolute w-[120%] aspect-square rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(232,165,58,0.35) 0%, rgba(217,126,31,0.12) 35%, transparent 65%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.img
            src={PRODUCT.images[0]}
            alt="The Great Indian Wedding"
            className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/500x500/4A1220/D9B96A?text=TGIW';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
