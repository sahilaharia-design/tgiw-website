import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <main className="pt-28 pb-20 min-h-screen bg-soft-bg">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-dark-text mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-400 mb-10">
            {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-3xl border border-border-divider"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="font-serif font-bold text-2xl text-dark-text mb-3">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Discover the TGIW board game and add it to your cart.</p>
            <Link to="/product" className="btn-primary">Explore The Game</Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-border-divider p-5 flex gap-5 items-start"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-dark-text to-dark-surface flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/96x96/1A1A1A/D4AF37?text=TGIW'; }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-dark-text text-sm md:text-base leading-snug">{item.name}</h3>
                          <span className="inline-block mt-1 text-xs bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full capitalize">
                            {item.edition} Edition
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-brand-red transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Qty */}
                        <div className="flex items-center border border-border-divider rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1.5 hover:bg-soft-bg transition-colors text-sm font-bold"
                            aria-label="Decrease"
                          >−</button>
                          <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1.5 hover:bg-soft-bg transition-colors text-sm font-bold"
                            aria-label="Increase"
                          >+</button>
                        </div>
                        <span className="font-serif font-bold text-lg text-brand-red">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex justify-between pt-2">
                <Link to="/product" className="text-brand-blue text-sm font-medium hover:underline">
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-gray-400 text-sm hover:text-brand-red transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl border border-border-divider p-6 sticky top-28">
                <h2 className="font-serif font-bold text-xl text-dark-text mb-6">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
                    <span className="font-medium text-dark-text">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping to Dubai</span>
                    <span className="text-brand-green font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Estimated Delivery</span>
                    <span className="font-medium text-dark-text">3–5 business days</span>
                  </div>
                </div>

                <div className="border-t border-border-divider my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-dark-text">Total</span>
                  <span className="font-serif font-bold text-2xl text-brand-red">{formatPrice(total)}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-primary w-full py-4 text-base"
                >
                  Proceed to Checkout
                </button>

                {/* Trust */}
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span>🔒 Secure checkout</span>
                  <span>✓ 30-day returns</span>
                </div>
              </div>

              {/* Coupon placeholder */}
              <div className="bg-white rounded-2xl border border-border-divider p-5">
                <p className="text-sm font-semibold text-dark-text mb-3">Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-border-divider rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                    disabled
                  />
                  <button className="px-4 py-2 bg-soft-bg text-gray-400 rounded-full text-sm cursor-not-allowed">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Coupon codes available in next update.</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
