import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PRODUCT, PREORDER, CONTACT_EMAIL, TESTIMONIALS } from '../utils/constants';
import { formatPrice, getShipByDate } from '../utils/formatters';
import { useCart } from '../context/CartContext';

/**
 * The reserve page.
 * Still mystery-first: one box, shot once.
 * No components, no how-to-play, no tabs.
 * Just the invitation.
 */
export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const reserve = () => {
    addToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      quantity: qty,
      image: PRODUCT.images[0],
      edition: PRODUCT.edition,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const reserveAndGo = () => {
    reserve();
    setTimeout(() => navigate('/checkout'), 300);
  };

  return (
    <main className="bg-ivory">
      {/* Hero — the box, alone */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden grain">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,165,58,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 80% 80%, rgba(107,27,46,0.08) 0%, transparent 55%)
            `,
          }}
        />

        <div className="container-custom grid md:grid-cols-2 gap-16 items-center relative">
          {/* Image */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center order-2 md:order-1"
          >
            <motion.div
              className="absolute w-[110%] aspect-square rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(232,165,58,0.28) 0%, rgba(217,126,31,0.08) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img
              src={PRODUCT.images[0]}
              alt={PRODUCT.name}
              className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/500x500/F0E6D2/6B1B2E?text=TGIW';
              }}
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2 space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="hairline" />
              <span className="eyebrow">{PRODUCT.cohort}</span>
            </div>

            <h1 className="display-lg text-ink text-balance">
              {PRODUCT.name.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="display-italic text-maroon">
                {PRODUCT.name.split(' ').slice(-1)}
              </span>
            </h1>

            <p className="text-ink-soft/80 text-lg font-light leading-relaxed max-w-md">
              {PRODUCT.tagline}
            </p>

            <div className="space-y-1 pt-2 text-ink-soft/70 font-light">
              <p>
                <span className="font-serif text-maroon text-xl">
                  {formatPrice(PRODUCT.price)}
                </span>{' '}
                <span className="text-sm">· full price</span>
              </p>
              <p className="text-sm">
                {formatPrice(PREORDER.depositAED)} refundable deposit to reserve
              </p>
              <p className="text-sm">
                Ships {getShipByDate(PREORDER.cohortShipMonths * 30)}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-luxe text-muted">Seats</span>
                <div className="flex items-center border border-ink/15 rounded-full">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1.5 hover:text-maroon transition-colors text-lg"
                    aria-label="Decrease"
                  >−</button>
                  <span className="px-3 text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1.5 hover:text-maroon transition-colors text-lg"
                    aria-label="Increase"
                  >+</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={reserveAndGo}
                className="btn-primary flex-1"
              >
                Reserve now
              </button>
              <button
                onClick={reserve}
                className={`btn-secondary flex-1 transition-all duration-500 ${
                  added ? 'bg-maroon text-ivory' : ''
                }`}
              >
                {added ? 'Added' : 'Add to reservation'}
              </button>
            </div>

            <p className="text-xs text-muted font-light pt-2 max-w-md leading-relaxed">
              A deposit holds your seat. The balance is only collected when your Shaadi ships. Refundable any time before production begins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three whispered notes — no reveal */}
      <NotesSection />

      {/* One line of voice */}
      <VoiceSection />

      {/* Gold whisper */}
      <GoldWhisper />
    </main>
  );
}

function NotesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const notes = [
    {
      n: '01',
      label: 'Made small',
      text: 'Hand-finished in limited runs. Numbered for the Founders Cohort.',
    },
    {
      n: '02',
      label: 'Made to keep',
      text: 'Materials chosen to age well. Not a game. A keepsake.',
    },
    {
      n: '03',
      label: 'Made for a table',
      text: 'Designed for four to eight guests and one unforgettable evening.',
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-ivory-deep">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 md:gap-20 max-w-5xl mx-auto">
          {notes.map((note, i) => (
            <motion.div
              key={note.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className="text-start"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-serif text-gold-deep/70 text-sm tracking-luxe">
                  {note.n}
                </span>
                <span className="h-px flex-1 bg-gold/20" />
              </div>
              <h3 className="font-serif text-2xl text-ink mb-4 tracking-editorial">
                {note.label}
              </h3>
              <p className="text-ink-soft/80 font-light leading-relaxed">
                {note.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const quote = TESTIMONIALS[0];

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-custom max-w-3xl text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-ink text-2xl md:text-4xl leading-tight tracking-editorial text-balance"
        >
          <span className="text-gold/60 text-5xl font-serif align-top leading-none">“</span>
          <span className="display-italic">{quote.quote}</span>
          <span className="text-gold/60 text-5xl font-serif align-top leading-none">”</span>
        </motion.blockquote>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3 text-sm tracking-wide text-muted"
        >
          <span>{quote.author}</span>
          <span className="h-px w-6 bg-gold/50" />
          <span>{quote.location}</span>
        </motion.div>
      </div>
    </section>
  );
}

function GoldWhisper() {
  return (
    <section className="section-padding bg-maroon-deep text-ivory">
      <div className="container-custom max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-gold/50" />
          <span className="eyebrow !text-gold-light">Arriving later</span>
          <span className="h-px w-12 bg-gold/50" />
        </div>
        <h2 className="display-lg text-ivory mb-8 text-balance">
          A <span className="display-italic text-gold-light">gold</span> one
          <br />
          is being made.
        </h2>
        <p className="text-ivory/70 font-light text-lg mb-8 max-w-md mx-auto">
          Numbered. Kept small. Offered first to those who ask quietly.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=TGIW Gold · Waitlist`}
          className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-gold/50 text-gold-light font-light tracking-wide hover:bg-gold hover:text-maroon-deep transition-all duration-500"
        >
          Quietly ask
        </a>
      </div>
    </section>
  );
}
