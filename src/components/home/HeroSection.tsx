import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

/**
 * Mystery-first hero.
 * No product. No box. No components.
 * Just the feeling of stepping under the mandap — warm, vast, hushed.
 */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-ivory overflow-hidden grain flex items-center"
    >
      {/* Warm radial light — the glow of a thousand diyas off-screen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,165,58,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 100%, rgba(107,27,46,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 80%, rgba(217,126,31,0.10) 0%, transparent 55%)
          `,
        }}
      />

      {/* Slow drifting marigold motes — atmosphere, not decoration */}
      {Array.from({ length: 14 }).map((_, i) => {
        const seed = (i * 97) % 100;
        const seed2 = (i * 53) % 100;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-marigold/50"
            style={{ top: `${seed}%`, left: `${seed2}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 8 + (i % 5),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Devanagari-inspired ornament — faint, ceremonial */}
      <motion.div
        aria-hidden
        className="absolute top-[18%] start-1/2 -translate-x-1/2 text-gold/15 select-none"
        style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(12rem, 28vw, 28rem)', lineHeight: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        ॐ
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom w-full text-center pt-32 pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-4">
            <span className="hairline" />
            <span className="eyebrow">By invitation · Dubai · 2026</span>
            <span className="hairline" />
          </div>

          <h1 className="display-xl text-ink text-balance max-w-5xl">
            A <span className="display-italic text-maroon">Shaadi</span>,
            <br />
            at your table.
          </h1>

          <p className="max-w-xl text-ink-soft/80 text-lg md:text-xl leading-relaxed font-light text-balance">
            Invite your party.
            <br />
            Celebrate your Shaadi.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 items-center pt-6"
          >
            <Link to="/product" className="btn-primary">
              Reserve yours
            </Link>
            <Link
              to="/product"
              className="text-ink-soft/70 text-sm tracking-wide hover:text-maroon transition-colors duration-500 underline-offset-8 hover:underline"
            >
              The first cohort ships in 90 days →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll whisper */}
      <motion.div
        className="absolute bottom-10 start-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span className="text-[10px] uppercase tracking-luxe text-ink-soft/50">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
