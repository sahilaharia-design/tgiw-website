import RevealBlock from '../cinematic/RevealBlock';

/**
 * Three memories, three roman numerals.
 * The rhythm of a shaadi night — chai at the entrance, eat more, story again.
 * No product explanation. Just the feeling of remembering.
 */
const MEMORIES = [
  {
    numeral: 'i',
    line: 'The chai that appeared before you asked.',
  },
  {
    numeral: 'ii',
    line: '"Eat more." — said four times before the main course.',
  },
  {
    numeral: 'iii',
    line: 'That one story you have heard a hundred times, told again, perfectly.',
  },
];

export default function MemorySection() {
  return (
    <section
      data-room="parchment"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(6rem, 12vw, 11rem)' }}
    >
      {/* Soft parchment warmth — amber from the top center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 5%, oklch(84% 0.09 82 / 0.14) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 container-custom">
        <RevealBlock delay={0}>
          <div className="flex items-center justify-center gap-4 mb-14 text-center">
            <span className="hairline" />
            <span className="eyebrow">Why it stays</span>
            <span className="hairline" />
          </div>
        </RevealBlock>

        <div className="max-w-2xl mx-auto flex flex-col gap-14">
          {MEMORIES.map(({ numeral, line }, i) => (
            <RevealBlock key={numeral} delay={0.12 + i * 0.18} y={20}>
              <div className="flex items-start gap-8">
                {/* Roman numeral — ceremonial index mark */}
                <span
                  className="flex-shrink-0 text-gold/40 select-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                    lineHeight: 1.7,
                    letterSpacing: '0.05em',
                    minWidth: '1.6rem',
                    textAlign: 'right',
                  }}
                >
                  {numeral}
                </span>

                {/* Divider hairline */}
                <div
                  className="flex-shrink-0 w-px bg-gold/25 self-stretch mt-1"
                  aria-hidden
                />

                {/* Memory line */}
                <p className="cg-large text-maroon/80 text-balance" style={{ lineHeight: 1.38 }}>
                  {line}
                </p>
              </div>

              {/* Thin separator between items */}
              {i < MEMORIES.length - 1 && (
                <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              )}
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
