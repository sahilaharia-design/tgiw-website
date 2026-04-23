import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Three whispered promises. No icons. No features.
 * Just feeling.
 */
const WHISPERS = [
  {
    n: '01',
    kicker: 'Warmth',
    line: 'The feeling of stepping into a wedding night where everyone knows your name.',
  },
  {
    n: '02',
    kicker: 'Craft',
    line: 'Made to be kept. Not played once — remembered often.',
  },
  {
    n: '03',
    kicker: 'Belonging',
    line: 'For those who miss home, and those who have always been curious about it.',
  },
];

export default function ValueProposition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-ivory-deep">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="hairline" />
            <span className="eyebrow">A night, not a product</span>
            <span className="hairline" />
          </div>
          <h2 className="display-lg text-ink text-balance">
            Some evenings <span className="display-italic text-maroon">stay</span> with you.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {WHISPERS.map((w, i) => (
            <motion.div
              key={w.n}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center md:text-start"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start mb-5">
                <span className="font-serif text-gold-deep/70 text-sm tracking-luxe">{w.n}</span>
                <span className="h-px flex-1 bg-gold/20" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 tracking-editorial">
                {w.kicker}
              </h3>
              <p className="text-ink-soft/80 text-base leading-relaxed font-light">
                {w.line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
