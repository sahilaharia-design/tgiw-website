import RevealBlock from '../cinematic/RevealBlock';

/**
 * Three memories, three roman numerals.
 * Rich warm golden-parchment background — noticeably honeyed, not pale.
 * Gold accents at full visibility.
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
      style={{
        paddingBlock: 'clamp(6rem, 12vw, 11rem)',
        background: 'oklch(89% 0.06 68)',
      }}
    >
      {/* Warm marigold bloom from upper center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 68% 50% at 50% 0%,   oklch(76% 0.22 72  / 0.45) 0%, transparent 58%),
            radial-gradient(ellipse 40% 30% at 90% 90%,  oklch(72% 0.22 65  / 0.20) 0%, transparent 55%)
          `,
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
                {/* Roman numeral */}
                <span
                  className="flex-shrink-0 select-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                    lineHeight: 1.7,
                    letterSpacing: '0.05em',
                    minWidth: '1.6rem',
                    textAlign: 'right',
                    color: 'var(--gold)',
                  }}
                >
                  {numeral}
                </span>

                {/* Divider */}
                <div
                  className="flex-shrink-0 self-stretch mt-1"
                  style={{ width: '1px', background: 'oklch(74% 0.125 80 / 0.70)' }}
                  aria-hidden
                />

                {/* Memory line */}
                <p className="cg-large text-maroon text-balance" style={{ lineHeight: 1.38 }}>
                  {line}
                </p>
              </div>

              {i < MEMORIES.length - 1 && (
                <div
                  className="mt-14 h-px w-full"
                  style={{
                    background: 'linear-gradient(to right, transparent, oklch(74% 0.125 80 / 0.55), transparent)',
                  }}
                />
              )}
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
