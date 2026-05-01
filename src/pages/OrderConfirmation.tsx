import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice, getEstimatedDelivery } from '../utils/formatters';
import { CONTACT_EMAIL } from '../utils/constants';

function Confetti() {
  const colors = ['#D4AF37', '#C41E3A', '#FFA500', '#003D66', '#1B6E2C'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: '-10px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

export default function OrderConfirmation() {
  const { orderData } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    // If no order data, redirect home
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <main className="pt-28 pb-20 min-h-screen bg-soft-bg">
      <Confetti />
      <div className="max-w-2xl mx-auto px-5 md:px-10">
        {/* Success card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-3xl border border-border-divider p-8 md:p-12 text-center mb-8"
        >
          {/* Animated checkmark */}
          <motion.div
            className="w-24 h-24 rounded-full bg-brand-green/10 border-4 border-brand-green mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <motion.span
              className="text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              ✓
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-dark-text mb-2">
              Order Received!
            </h1>
            <p className="text-gray-500 text-lg mb-6">
              Thank you for your purchase. Your celebration is on its way! 🎉
            </p>

            {/* Order number */}
            <div className="inline-block bg-soft-bg border border-border-divider rounded-2xl px-6 py-4 mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Order Number</p>
              <p className="font-serif font-bold text-xl text-brand-red tracking-wider">
                {orderData.orderNumber}
              </p>
            </div>

            <p className="text-gray-500 text-sm">
              A confirmation email will be sent to <span className="text-brand-gold font-semibold">{CONTACT_EMAIL}</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-3xl border border-border-divider p-6 md:p-8 mb-6"
        >
          <h2 className="font-serif font-bold text-xl text-dark-text mb-6">Order Details</h2>

          {/* Items */}
          <div className="space-y-4 mb-6">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-dark-text to-dark-surface rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/56x56/1A1A1A/D4AF37?text=T'; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-dark-text text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">Qty: {item.quantity} · {item.edition} Edition</p>
                </div>
                <span className="font-serif font-bold text-dark-text">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border-divider pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{formatPrice(orderData.total)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-brand-green">Included</span>
            </div>
            <div className="flex justify-between font-bold text-dark-text text-base pt-1 border-t border-border-divider mt-1">
              <span>Total Paid</span>
              <span className="text-brand-red font-serif text-lg">{formatPrice(orderData.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-gradient-to-br from-dark-text to-dark-surface rounded-3xl p-6 md:p-8 mb-8"
        >
          <h2 className="font-serif font-bold text-xl text-white mb-5">What Happens Next</h2>
          <div className="space-y-4">
            {[
              { icon: '📧', step: 'Confirmation email sent to your inbox.' },
              { icon: '📞', step: 'Our team will contact you within 24 hours to arrange payment.' },
              { icon: '📦', step: `Estimated delivery: ${getEstimatedDelivery()}` },
              { icon: '📱', step: 'Tracking info shared once your order ships.' },
            ].map(({ icon, step }, i) => (
              <div key={i} className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-white/50 text-xs">
            Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-gold hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/" className="btn-primary flex-1 text-center py-4 text-base">
            Return to Home
          </Link>
          <Link to="/product" className="btn-secondary flex-1 text-center py-4 text-base">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
