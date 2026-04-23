import { Link } from 'react-router-dom';
import RevealBlock from '../cinematic/RevealBlock';
import { PREORDER } from '../../utils/constants';

/**
 * Pricing table — Founders Cohort.
 * AED 199 deposit / AED 899 total / 90 days / Limited 500.
 * Three quiet stats + one primary CTA + one ghost secondary.
 */
const STATS = [
  { value: `AED ${PREORDER.depositAED}`,   label: 'Deposit to reserve'       },
  { value: `AED ${PREORDER.totalAED}`,     label: 'Total when it ships'      },
  { value: `${PREORDER.cohortShipMonths * 30} days`, label: 'To your door'   },
  { value: `${PREORDER.cohortSize}`,        label: 'Founders seats only'     },
];

export default function CohortSection() {
  return (
    <section
      data-room="cohort"
      className="relative overflow-hidden room-light"
      style={{ paddingBlock: 'clamp(7rem, 14vw, 13rem)' }}
    >
      {/* Warm cohort glow — the readying-room before the ceremony */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, oklch(84% 0.09 82 / 0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 container-custom">
        {/* Header */}
        <RevealBlock delay={0}>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="hairline" />
              <span className="eyebrow">{PREORDER.cohortName}</span>
              <span className="hairline" />
            </div>
            <h2 className="cg-headline text-maroon text-balance max-w-2xl mb-6">
              Reserve your seat.
              <br />
              <em>Your Shaadi ships in 90 days.</em>
            </h2>
            <p
              className="text-maroon/50 max-w-sm text-balance"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 2.0,
              }}
            >
              A refundable deposit holds your place.
              <br />
              Balance collected when production begins.
            </p>
          </div>
        </RevealBlock>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/12 border border-gold/12 max-w-3xl mx-auto mb-14">
          {STATS.map(({ value, label }, i) => (
            <RevealBlock key={label} delay={0.1 + i * 0.08}>
              <div className="bg-ivory p-8 md:p-10 flex flex-col items-center text-center gap-3">
                <span
                  className="cg-large text-maroon"
                  style={{ fontStyle: 'normal', fontWeight: 300 }}
                >
                  {value}
                </span>
                <span
                  className="text-maroon/45"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
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
              className="btn-primary"
              onClick={() => (window as any)._celebrate?.()}
            >
              Reserve · AED {PREORDER.depositAED}
            </Link>
            <Link to="/product" className="btn-ghost">
              What's inside?
            </Link>
          </div>
        </RevealBlock>

        {/* Fine print */}
        <RevealBlock delay={0.65}>
          <p
            className="text-center text-maroon/30 mt-8"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Full refund anytime before production begins · No payment today beyond deposit
          </p>
        </RevealBlock>
      </div>
    </section>
  );
}
