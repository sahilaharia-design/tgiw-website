import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-brand-red to-brand-red-light relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 40%), radial-gradient(circle at 80% 50%, white 0%, transparent 40%)' }}
      />

      <div className="max-w-container mx-auto px-5 md:px-10 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <h2 className="font-serif font-bold text-white text-3xl md:text-4xl mb-3">Stay Updated</h2>
          <p className="text-white/80 mb-8">
            Be the first to know about new editions, restocks, and exclusive Dubai events.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 rounded-2xl px-8 py-6 text-white"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-semibold text-lg">You're on the list!</p>
              <p className="text-white/80 text-sm mt-1">We'll keep you updated with the latest from TGIW.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                  aria-label="Email address"
                />
                {error && <p className="text-white/80 text-xs mt-1 pl-4">{error}</p>}
              </div>
              <button type="submit" className="bg-brand-gold hover:bg-brand-gold-light text-dark-text font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
