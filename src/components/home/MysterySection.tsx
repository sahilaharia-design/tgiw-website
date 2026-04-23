import RevealBlock from '../cinematic/RevealBlock';

/**
 * "We will not tell you what is inside. That part is yours to open."
 * Deep indigo-to-dark — midnight sky drama.
 * All text ivory/warm cream. The quietest but most dramatic room.
 */
export default function MysterySection() {
  return (
    <section
      data-room="mystery"
      className="dark-section relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(8rem, 16vw, 15rem)',
        background: `linear-gradient(
          180deg,
          oklch(22% 0.18 270) 0%,
          oklch(20% 0.16 290) 40%,
          oklch(18% 0.12 30)  100%
        )`,
      }}
    >
      {/* Sapphire-indigo radial bloom */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, oklch(30% 0.18 270 / 0.50) 0%, transparent 65%),
            radial-gradient(ellipse 80% 40% at 50% -5%, oklch(32% 0.22 18  / 0.30) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom text-center">
        <RevealBlock delay={0}>
          <div className="flex items-center justify-center gap-4 mb-12">
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
              The mystery
            </span>
            <span
              className="h-px w-10"
              style={{ background: 'oklch(84% 0.09 82 / 0.70)' }}
            />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.18} y={28}>
          <p
            className="cg-headline text-balance max-w-3xl mx-auto"
            style={{ lineHeight: 1.25, color: 'oklch(96% 0.02 65)' }}
          >
            We will not tell you
            <br />
            what is inside.
          </p>
        </RevealBlock>

        {/* Gold rule — a pause */}
        <RevealBlock delay={0.42} spring={false}>
          <div
            className="mx-auto my-10"
            style={{
              width: '1px',
              height: '72px',
              background: 'linear-gradient(to bottom, transparent, oklch(84% 0.09 82 / 0.85), transparent)',
            }}
          />
        </RevealBlock>

        <RevealBlock delay={0.55} y={18}>
          <p
            className="cg-large text-balance max-w-2xl mx-auto"
            style={{ lineHeight: 1.45, fontStyle: 'italic', color: 'oklch(76% 0.22 72)' }}
          >
            That part is yours to open.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.72}>
          <p
            className="mt-12 max-w-xs mx-auto"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              lineHeight: 2.2,
              color: 'oklch(84% 0.09 82 / 0.50)',
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
