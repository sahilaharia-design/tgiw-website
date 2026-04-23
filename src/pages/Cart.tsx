import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { PREORDER } from '../utils/constants';

/**
 * Reservation experience — not a shopping cart.
 * You are holding seats for a cohort that ships in 90 days.
 */
export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  const depositTotal = items.reduce((sum, i) => sum + PREORDER.depositAED * i.quantity, 0);

  return (
    <main className="pt-32 pb-24 min-h-screen bg-ivory">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hairline" />
            <span className="eyebrow">Your reservation</span>
            <span className="hairline" />
          </div>
          <h1 className="display-lg text-ink text-balance">
            {itemCount > 0 ? (
              <>
                You are <span className="display-italic text-maroon">holding a seat.</span>
              </>
            ) : (
              <>
                No seats <span className="display-italic text-maroon">yet.</span>
              </>
            )}
          </h1>
          {itemCount > 0 && (
            <p className="text-ink-soft/70 font-light mt-6 max-w-md mx-auto">
              {PREORDER.cohortName} · Ships in {PREORDER.cohortShipMonths} months
            </p>
          )}
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-ink-soft/70 text-lg font-light mb-10 max-w-md mx-auto">
              The Founders Cohort is open. Reserve your Shaadi with a refundable deposit.
            </p>
            <Link to="/product" className="btn-primary">Reserve yours</Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Seats held */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-ink/10 pb-8 flex gap-6 items-start"
                  >
                    <div className="w-28 h-28 flex-shrink-0 bg-parchment rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-3"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://placehold.co/112x112/F0E6D2/6B1B2E?text=TGIW';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl md:text-2xl text-ink tracking-editorial">
                        {item.name}
                      </h3>
                      <p className="text-muted text-sm mt-1">{PREORDER.cohortName}</p>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                          <span className="text-xs uppercase tracking-luxe text-muted">Seats</span>
                          <div className="flex items-center border border-ink/15 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1.5 hover:text-maroon transition-colors text-lg"
                              aria-label="Decrease"
                            >−</button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1.5 hover:text-maroon transition-colors text-lg"
                              aria-label="Increase"
                            >+</button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted text-xs tracking-wide hover:text-maroon transition-colors duration-500 underline underline-offset-4"
                        >
                          Release seat
                        </button>
                      </div>
                    </div>

                    <span className="font-serif text-xl text-maroon whitespace-nowrap">
                      {formatPrice(PREORDER.depositAED * item.quantity)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="pt-4">
                <Link
                  to="/product"
                  className="text-ink-soft/70 text-sm tracking-wide hover:text-maroon transition-colors duration-500 underline underline-offset-8"
                >
                  ← Back to the invitation
                </Link>
              </div>
            </div>

            {/* Reservation summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-ivory-deep rounded-2xl p-8 sticky top-32">
                <h2 className="font-serif text-xl text-ink mb-8 tracking-editorial">
                  Your reservation
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-ink-soft/80">
                    <span>Seats held</span>
                    <span className="text-ink">{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft/80">
                    <span>Full total</span>
                    <span className="text-ink">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft/80">
                    <span>Cohort</span>
                    <span className="text-ink">{PREORDER.cohortName}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft/80">
                    <span>Ships in</span>
                    <span className="text-ink">{PREORDER.cohortShipMonths} months</span>
                  </div>
                </div>

                <div className="border-t border-ink/10 my-6" />

                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-xs uppercase tracking-luxe text-muted mb-1">
                      Pay today
                    </p>
                    <p className="text-xs text-muted">Refundable deposit</p>
                  </div>
                  <span className="font-serif text-3xl text-maroon">
                    {formatPrice(depositTotal)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full"
                >
                  Hold my seat
                </button>

                <p className="text-center text-muted text-xs mt-5 leading-relaxed">
                  The balance of {formatPrice(PREORDER.remainderAED)} per seat is collected only when your Shaadi ships. Full refund any time before production begins.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
