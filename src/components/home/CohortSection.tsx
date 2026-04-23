import { Link } from 'react-router-dom';
import RevealBlock from '../cinematic/RevealBlock';
import { PREORDER } from '../../utils/constants';

/**
 * Pricing table — Founders Cohort.
 * Deep emerald background — the ceremonial gathering room.
 * Ivory text, full-opacity gold borders.
 */
const STATS = [
  { value: `AED ${PREORDER.depositAED}`,               label: 'Deposit to reserve'   },
  { value: `AED ${PREORDER.totalAED}`,                  label: 'Total when it ships'  },
  { value: `${PREORDER.cohortShipMonths * 30} days`,    label: 'To your door'         },
  { value: `${PREORDER.cohortSize}`,                    label: 'Founders seats only'  },
];

export default function CohortSection() {
  return (
    <section
      data-room="cohort"
      className="dark-section relative overflow-hidden"
      style={{
        paddingBlock: 'clamp(7rem, 14vw, 13rem)',
        background: `linear-gradient(
          160deg,
          oklch(22% 0.14 165) 0%,
          oklch(20% 0.16 175) 50%,
          oklch(18% 0.12 180) 100%
        )`,
      }}
    >
      {/* Emerald bloom + warm gold corner */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 75% 55% at 50% -5%, oklch(28% 0.14 165 / 0.55) 0%, transparent 58%),
            radial-gradient(ellipse 40% 35% at 88% 88%, oklch(72% 0.22 65  / 0.22) 0%, transparent 55%)
          `,
        }}
      />

      <div className="relative z-10 container-custom">
        {/* Header */}
        <RevealBlock delay={0}>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-8">
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
                {PREORDER.cohortName}
              </span>
              <span
                className="h-px w-10"
                style={{ background: 'oklch(84% 0.09 82 / 0.70)' }}
              />
            </div>
            <h2
              className="cg-headline text-balance max-w-2xl mb-6"
              style={{ color: 'oklch(96% 0.02 65)' }}
            >
              Reserve your seat.
              <br />
              <em style={{ color: 'oklch(76% 0.22 72)' }}>
                Your Shaadi ships in 90 days.
              </em>
            </h2>
            <p
              className="max-w-sm text-balance"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 2.0,
                color: 'oklch(84% 0.09 82 / 0.60)',
              }}
            >
              A refundable deposit holds your place.
              <br />
              Balance collected when production begins.
            </p>
          </div>
        </RevealBlock>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto mb-14"
          style={{ gap: '1px', background: 'oklch(84% 0.09 82 / 0.35)', border: '1px solid oklch(84% 0.09 82 / 0.35)' }}
        >
          {STATS.map(({ value, label }, i) => (
            <RevealBlock key={label} delay={0.10 + i * 0.08}>
              <div
                className="flex flex-col items-center text-center gap-3 p-8 md:p-10"
                style={{ background: 'oklch(22% 0.14 165)' }}
              >
                <span
                  className="cg-large"
                  style={{ fontStyle: 'normal', fontWeight: 300, color: 'oklch(76% 0.22 72)' }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'oklch(84% 0.09 82 / 0.70)',
                  }}
                >
                  {label}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* CTAs */}
        <RevealBlock delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/product"
              className="btn-saffron"
              onClick={() => (window as any)._celebrate?.()}
            >
              Reserve · AED {PREORDER.depositAED}
            </Link>
            <Link
              to="/product"
              className="btn-ghost"
              style={{
                color: 'oklch(84% 0.09 82)',
                borderColor: 'oklch(84% 0.09 82 / 0.45)',
              }}
            >
              What's inside?
            </Link>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.65}>
          <p
            className="text-center mt-8"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'oklch(84% 0.09 82 / 0.35)',
            }}
          >
            Full refund anytime before production begins · No payment today beyond deposit
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
