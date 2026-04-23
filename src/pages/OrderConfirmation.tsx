import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice, getShipByDate } from '../utils/formatters';
import { CONTACT_EMAIL, PREORDER } from '../utils/constants';

/**
 * Reservation confirmation — not an order receipt.
 * A quiet, ceremonial acknowledgement.
 */
export default function OrderConfirmation() {
  const { orderData } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderData) navigate('/');
  }, [orderData, navigate]);

  if (!orderData) return null;

  const depositTotal = orderData.items.reduce(
    (sum, i) => sum + PREORDER.depositAED * i.quantity,
    0,
  );

  return (
    <main className="pt-32 pb-24 min-h-screen bg-ivory">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="hairline" />
            <span className="eyebrow">Your seat is held</span>
            <span className="hairline" />
          </div>

          <h1 className="display-lg text-ink text-balance">
            Welcome to the
            <br />
            <span className="display-italic text-maroon">Founders Cohort.</span>
          </h1>

          <p className="text-ink-soft/70 font-light text-lg mt-8 max-w-md mx-auto">
            We have your name. We will write to you shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-ivory-deep rounded-2xl p-10 mb-10"
        >
          <div className="text-center mb-8 pb-8 border-b border-ink/10">
            <p className="text-xs uppercase tracking-luxe text-muted mb-3">Reservation</p>
            <p className="font-serif text-3xl text-maroon tracking-wide">
              {orderData.orderNumber}
            </p>
          </div>

          <div className="space-y-5 text-sm">
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Cohort</span>
              <span className="text-ink font-serif">{PREORDER.cohortName}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Ship-by</span>
              <span className="text-ink font-serif">
                {getShipByDate(PREORDER.cohortShipMonths * 30)}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Seats held</span>
              <span className="text-ink font-serif">
                {orderData.items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Deposit due</span>
              <span className="text-ink font-serif">{formatPrice(depositTotal)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t border-ink/10">
              <span className="text-muted">Remainder on ship</span>
              <span className="text-ink font-serif">
                {formatPrice(orderData.total - depositTotal)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8 mb-14"
        >
          <div>
            <p className="text-xs uppercase tracking-luxe text-muted mb-5">
              What happens next
            </p>
            <ol className="space-y-5 text-ink-soft/80 font-light leading-relaxed">
              <li className="flex gap-4">
                <span className="font-serif text-gold-deep">01</span>
                <span>We will write to <span className="text-ink">{orderData.shippingInfo.email}</span> within 24 hours to confirm and collect your deposit.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold-deep">02</span>
                <span>Your seat is locked into the Founders Cohort. Small batch. Hand-finished.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold-deep">03</span>
                <span>You will hear from us as production progresses. A final date before shipping.</span>
              </li>
              <li className="flex gap-4">
                <span className="font-serif text-gold-deep">04</span>
                <span>Your Shaadi arrives. The night begins.</span>
              </li>
            </ol>
          </div>

          <p className="text-muted text-xs font-light pt-4">
            Questions or changes? Write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-maroon hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/" className="btn-primary flex-1 text-center">
            Return home
          </Link>
          <Link to="/product" className="btn-secondary flex-1 text-center">
            Invite someone else
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
