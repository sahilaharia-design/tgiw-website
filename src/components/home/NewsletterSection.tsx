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
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-32 bg-maroon-deep text-ivory relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(232,165,58,0.25) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-gold/50" />
            <span className="eyebrow !text-gold-light">The guest list</span>
            <span className="h-px w-12 bg-gold/50" />
          </div>

          <h2 className="display-lg text-ivory mb-6 text-balance">
            First to be <span className="display-italic text-gold-light">invited.</span>
          </h2>

          <p className="text-ivory/70 mb-10 font-light text-lg">
            News from the Shaadi. Only when there is something worth saying.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif italic text-xl text-gold-light"
            >
              You are on the guest list.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Your email"
                  className="w-full px-6 py-4 rounded-full bg-ivory/5 border border-ivory/15 text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-all duration-500"
                  aria-label="Email address"
                />
                {error && <p className="text-gold-light/80 text-xs mt-2 ps-4">{error}</p>}
              </div>
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-gold text-maroon-deep font-medium tracking-wide hover:bg-gold-light transition-all duration-500 whitespace-nowrap"
              >
                Add me
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
