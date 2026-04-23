import RevealBlock from '../cinematic/RevealBlock';

/**
 * "For families who don't send invitations. They send experiences."
 * Single thought. Large. Unhurried.
 * Rich warm amber-saffron background — feels celebratory and golden.
 */
export default function PositioningSection() {
  return (
    <section
      data-room="parchment"
      className="relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(7rem, 15vw, 14rem)',
        background: `linear-gradient(
          145deg,
          oklch(88% 0.07 68) 0%,
          oklch(84% 0.09 72) 45%,
          oklch(86% 0.08 65) 100%
        )`,
      }}
    >
      {/* Marigold bloom from upper left — diya warmth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 10% 5%,  oklch(76% 0.22 72 / 0.38) 0%, transparent 55%),
            radial-gradient(ellipse 45% 40% at 88% 92%, oklch(72% 0.22 65 / 0.28) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-4 mb-12">
              <span className="hairline" />
              <span className="eyebrow">For whom</span>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.18} y={32}>
            <h2
              className="cg-display text-maroon text-balance"
              style={{ lineHeight: 1.1 }}
            >
              For families who don't send{' '}
              <em>invitations.</em>
              <br />
              They send <em>experiences.</em>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.42}>
            <div className="mt-14 flex items-start gap-6 max-w-xl">
              <div
                className="flex-shrink-0 mt-1"
                style={{
                  width: '1px',
                  height: '72px',
                  background: 'linear-gradient(to bottom, oklch(72% 0.22 65 / 0.80), transparent)',
                }}
              />
              <p
                className="text-maroon/65 leading-relaxed text-balance"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  lineHeight: 2.0,
                  textTransform: 'uppercase',
                }}
              >
                For the diaspora who dream of one.
                <br />
                For the curious who have always wondered.
                <br />
                For anyone who wants to host a night worth remembering.
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
