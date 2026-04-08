import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const VALUES = [
  {
    icon: '✦',
    title: 'Premium Quality',
    desc: 'High-end components, luxury packaging, and meticulous craftsmanship that rivals collector board games worldwide.',
    color: 'brand-gold',
  },
  {
    icon: '🪔',
    title: 'Cultural Celebration',
    desc: 'Deep Indian wedding aesthetics woven into every game mechanic, card, and component. Authentically crafted.',
    color: 'brand-red',
  },
  {
    icon: '🎉',
    title: 'Social Gaming',
    desc: 'Designed for parties, gatherings, and celebrations. Perfect for 4–8 players and unforgettable game nights.',
    color: 'marigold',
  },
  {
    icon: '👑',
    title: "Collector's Item",
    desc: 'Limited Gold Edition available. A showpiece for any collection and the ultimate luxury gifting choice.',
    color: 'deep-purple',
  },
];

export default function ValueProposition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-soft-bg">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-dark-text">Why TGIW?</h2>
          <p className="section-subtitle">
            More than a board game — a cultural experience, a collector's pride, a celebration starter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-8 border border-border-divider card-hover text-center group"
            >
              <div className="text-4xl mb-5">{v.icon}</div>
              <h3 className="font-serif font-bold text-xl text-dark-text mb-3">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
