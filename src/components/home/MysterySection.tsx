import RevealBlock from '../cinematic/RevealBlock';

/**
 * "We will not tell you what is inside. That part is yours to open."
 * The ceremony of restraint — what makes a gift a gift.
 * Minimal. Deliberate. The quietest room.
 */
export default function MysterySection() {
  return (
    <section
      data-room="mystery"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(8rem, 16vw, 15rem)' }}
    >
      {/* Mystery light — barely-there glow, enigmatic */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, oklch(91% 0.06 72 / 0.10) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 container-custom text-center">
        <RevealBlock delay={0}>
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="hairline" />
            <span className="eyebrow">The mystery</span>
            <span className="hairline" />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.18} y={28}>
          <p
            className="cg-headline text-maroon text-balance max-w-3xl mx-auto"
            style={{ lineHeight: 1.25 }}
          >
            We will not tell you
            <br />
            what is inside.
          </p>
        </RevealBlock>

        {/* Gold rule — a pause */}
        <RevealBlock delay={0.42}>
          <div className="gold-rule-v mx-auto my-10" />
        </RevealBlock>

        <RevealBlock delay={0.55} y={18}>
          <p
            className="cg-large text-maroon/60 text-balance max-w-2xl mx-auto"
            style={{ lineHeight: 1.45, fontStyle: 'italic' }}
          >
            That part is yours to open.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.72}>
          <p
            className="mt-12 text-maroon/35 max-w-xs mx-auto"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              lineHeight: 2.2,
            }}
          >
            What we can tell you:
            <br />
            it will last the whole evening.
            <br />
            And the memory will last longer.
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
