import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Gold Edition — whispered, not sold.
 * Waitlist only. No pricing. No list of features.
 */
export default function LimitedEditionShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setJoined(true);
  };

  return (
    <section className="section-padding bg-ivory-deep relative overflow-hidden">
      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="hairline" />
            <span className="eyebrow">Arriving later</span>
            <span className="hairline" />
          </div>

          <h2 className="display-lg text-ink mb-8 text-balance">
            A <span className="display-italic text-gold-deep">gold</span> one
            <br />
            is being made.
          </h2>

          <p className="text-ink-soft/70 text-lg font-light leading-relaxed mb-10 max-w-md mx-auto">
            Numbered. Kept small. Offered first to those who ask quietly.
          </p>

          {joined ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-maroon font-serif italic text-lg"
            >
              Your name is on the list.
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-6 py-4 rounded-full bg-transparent border border-ink/15 text-ink placeholder-muted/60 focus:outline-none focus:border-maroon transition-all duration-500"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-ink text-ivory font-light tracking-wide hover:bg-maroon transition-all duration-500"
              >
                Quietly ask
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
