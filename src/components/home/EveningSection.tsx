import RevealBlock from '../cinematic/RevealBlock';

/**
 * "Some evenings stay with you."
 * Deep rose-ruby background — night-wedding richness.
 * All text in warm ivory.
 */
export default function EveningSection() {
  return (
    <section
      data-room="rose-silk"
      className="dark-section relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(7rem, 14vw, 13rem)',
        background: `linear-gradient(
          135deg,
          oklch(28% 0.20 10) 0%,
          oklch(32% 0.18 18) 45%,
          oklch(35% 0.14 20) 100%
        )`,
      }}
    >
      {/* Rich magenta bloom from top-right */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 82% 8%,   oklch(52% 0.28 345 / 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 10% 92%,  oklch(72% 0.22 65  / 0.25) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom text-center">
        <RevealBlock delay={0}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <span
              className="h-px w-10"
              style={{ background: 'oklch(84% 0.09 82 / 0.70)' }}
            />
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'oklch(84% 0.09 82)',
              }}
            >
              The feeling
            </span>
            <span
              className="h-px w-10"
              style={{ background: 'oklch(84% 0.09 82 / 0.70)' }}
            />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.15} y={36}>
          <p
            className="cg-display text-balance max-w-4xl mx-auto"
            style={{
              lineHeight: 1.12,
              color: 'oklch(96% 0.02 65)',
            }}
          >
            Some evenings
            <br />
            <em style={{ color: 'oklch(76% 0.22 72)' }}>stay with you.</em>
          </p>
        </RevealBlock>

        <RevealBlock delay={0.45}>
          <div
            className="mx-auto mt-14"
            style={{
              width: '1px',
              height: '72px',
              background: 'linear-gradient(to bottom, transparent, oklch(84% 0.09 82 / 0.80), transparent)',
            }}
          />
        </RevealBlock>
      </div>
    </section>
  );
}
