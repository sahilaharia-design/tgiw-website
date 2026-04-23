import RevealBlock from '../cinematic/RevealBlock';

/**
 * "Some evenings stay with you."
 * Full-bleed moment — rose-silk light, single sentence, breathing vignette.
 */
export default function EveningSection() {
  return (
    <section
      data-room="rose-silk"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(7rem, 14vw, 13rem)' }}
    >
      {/* Silk gradient — rose-warm light from top-right, honeyed shadow lower-left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 80% 10%,  oklch(83% 0.048 34 / 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 10% 90%,  oklch(74% 0.125 80 / 0.10) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom text-center">
        <RevealBlock delay={0}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="hairline" />
            <span className="eyebrow">The feeling</span>
            <span className="hairline" />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.15} y={36}>
          <p
            className="cg-display text-maroon text-balance max-w-4xl mx-auto"
            style={{ lineHeight: 1.12 }}
          >
            Some evenings
            <br />
            <em>stay with you.</em>
          </p>
        </RevealBlock>

        <RevealBlock delay={0.45}>
          <div className="gold-rule-v mx-auto mt-14" />
        </RevealBlock>
      </div>
    </section>
  );
}
