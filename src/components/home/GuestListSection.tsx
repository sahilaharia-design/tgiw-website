import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Guest List — email capture.
 * On successful submit → window._celebrate() fires.
 * Simple ivory-deep room. Ceremonial close of the page journey.
 */
export default function GuestListSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    // Simulate async submission — replace with real endpoint
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
    (window as any)._celebrate?.();
    (window as any)._distantFireworks?.();
  }

  return (
    <section
      ref={ref}
      data-room="guestlist"
      className="relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(8rem, 16vw, 14rem)',
        background: `linear-gradient(
          160deg,
          oklch(90% 0.055 68) 0%,
          oklch(86% 0.07 72)  50%,
          oklch(88% 0.06 65) 100%
        )`,
      }}
    >
      {/* Saffron-rose bloom — celebratory arrival glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 0%,   oklch(76% 0.22 72 / 0.38) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 12% 90%,  oklch(52% 0.28 345 / 0.16) 0%, transparent 55%),
            radial-gradient(ellipse 35% 30% at 90% 88%,  oklch(72% 0.22 65 / 0.18) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="hairline" />
              <span className="eyebrow">The guest list</span>
              <span className="hairline" />
            </div>

            <h2 className="cg-headline text-maroon text-balance mb-6">
              Be the first
              <br />
              <em>to know.</em>
            </h2>

            <p
              className="text-maroon/50 mb-12 text-balance"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 2.0,
              }}
            >
              New cohort openings · Gold Edition availability
              <br />
              · Early access invitations
            </p>
          </motion.div>

          {/* Form or success */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 items-stretch max-w-sm mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border border-gold/40 px-5 py-4 text-maroon placeholder-maroon/30 focus:outline-none focus:border-gold/70 transition-colors duration-400"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-shrink-0"
                  style={{ paddingInline: '1.8rem' }}
                >
                  {loading ? '···' : 'Join'}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <div className="gold-rule-v" />
                <p
                  className="cg-body text-maroon/70"
                  style={{ fontStyle: 'italic' }}
                >
                  You're on the list.
                </p>
                <p
                  className="text-maroon/40"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                  }}
                >
                  We'll write when the doors open.
                </p>
                <div className="gold-rule-v" />
              </motion.div>
            )}
          </motion.div>

          {/* Fine print */}
          {!submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6 text-maroon/25"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.52rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              No marketing. Only invitations.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
