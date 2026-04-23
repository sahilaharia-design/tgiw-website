import RevealBlock from '../cinematic/RevealBlock';

/**
 * "For families who don't send invitations. They send experiences."
 * Single thought. Large. Unhurried.
 */
export default function PositioningSection() {
  return (
    <section
      data-room="parchment"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(7rem, 15vw, 14rem)' }}
    >
      {/* Warm honeyed light — diya warmth from the upper left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 15% 10%, oklch(84% 0.09 82 / 0.16) 0%, transparent 60%)',
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
              <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent flex-shrink-0 mt-1" />
              <p
                className="text-maroon/55 leading-relaxed text-balance"
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
