import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sparklePositions = [
  { top: '15%', left: '10%', delay: 0 },
  { top: '25%', left: '85%', delay: 0.5 },
  { top: '70%', left: '5%', delay: 1 },
  { top: '80%', left: '90%', delay: 0.7 },
  { top: '45%', left: '92%', delay: 1.3 },
  { top: '10%', left: '60%', delay: 0.3 },
  { top: '90%', left: '30%', delay: 0.9 },
  { top: '55%', left: '3%', delay: 1.5 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-dark-text to-dark-surface flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 40%),
                            radial-gradient(circle at 80% 20%, #C41E3A 0%, transparent 35%),
                            radial-gradient(circle at 60% 80%, #003D66 0%, transparent 30%)`,
        }}
      />

      {/* Sparkles */}
      {sparklePositions.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-brand-gold"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-container mx-auto px-5 md:px-10 w-full pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="inline-block text-brand-gold text-sm font-semibold tracking-widest uppercase mb-4 border border-brand-gold/30 px-3 py-1 rounded-full">
                A Grand Indian Wedding — At Your Table
              </span>
            </motion.div>

            <motion.h1
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <span className="gold-shimmer">Celebrate Your</span>
              <br />
              <span className="text-white">Shaadi</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              Invite your Party, Celebrate your Shaadi.
              <br />
              <span className="text-brand-gold font-medium">The Great Indian Wedding</span>
              <br />
              The bucket-list experience — brought to you.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            >
              <Link to="/product" className="btn-primary text-base px-8 py-3.5">
                Experience The Shaadi
              </Link>
              <Link to="/product" className="btn-outline-gold text-base px-8 py-3.5">
                Get Yours — 899 AED
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              {[
                { value: '4–8', label: 'Guests' },
                { value: '200+', label: 'Components' },
                { value: '5★', label: 'Rated' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-brand-gold font-serif font-bold text-2xl">{stat.value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product */}
          <div className="flex justify-center items-center relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              {/* Glow behind box */}
              <div className="absolute inset-0 rounded-full blur-3xl bg-brand-gold/20 scale-110" />

              <motion.img
                src="/images/TGIW_Box.png"
                alt="The Great Indian Wedding Experience Box"
                className="relative z-10 w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.src = 'https://placehold.co/400x400/1A1A1A/D4AF37?text=TGIW';
                }}
              />

              {/* Floating badges */}
              <motion.div
                className="absolute -left-4 top-1/4 bg-brand-gold text-dark-text text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Bucket-list experience
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-1/3 bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                899 AED
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-brand-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
