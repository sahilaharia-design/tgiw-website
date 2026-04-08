import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice, generateOrderNumber, getEstimatedDelivery } from '../utils/formatters';
import { EMIRATES, CONTACT_EMAIL } from '../utils/constants';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(9, 'Valid UAE phone required'),
  address: z.string().min(5, 'Address is required'),
  address2: z.string().optional(),
  emirate: z.string().min(1, 'Please select an emirate'),
  zipCode: z.string().optional(),
  instructions: z.string().optional(),
  sameAsBilling: z.boolean().optional(),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const STEPS = ['Shipping', 'Payment', 'Confirmation'];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            i + 1 === step ? 'bg-brand-red text-white' :
            i + 1 < step ? 'bg-brand-green/20 text-brand-green' :
            'bg-gray-100 text-gray-400'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
              i + 1 < step ? 'bg-brand-green border-brand-green text-white' :
              i + 1 === step ? 'bg-white border-white text-brand-red' :
              'border-gray-300 text-gray-400'
            }`}>
              {i + 1 < step ? '✓' : i + 1}
            </span>
            {s}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 ${i + 1 < step ? 'bg-brand-green' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, error, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string; error?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-dark-text">
        {label}{required && <span className="text-brand-red ml-1">*</span>}
      </label>
      <input
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
          error
            ? 'border-brand-red focus:ring-brand-red/20 bg-brand-red/5'
            : 'border-border-divider focus:border-brand-gold focus:ring-brand-gold/20'
        }`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand-red text-xs flex items-center gap-1"
        >
          <span>⚠</span> {error}
        </motion.p>
      )}
    </div>
  );
}

function SelectField({ label, error, required, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string; error?: string; required?: boolean; options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-dark-text">
        {label}{required && <span className="text-brand-red ml-1">*</span>}
      </label>
      <select
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200 bg-white ${
          error
            ? 'border-brand-red focus:ring-brand-red/20'
            : 'border-border-divider focus:border-brand-gold focus:ring-brand-gold/20'
        }`}
        {...props}
      >
        <option value="">Select emirate...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand-red text-xs"
        >
          ⚠ {error}
        </motion.p>
      )}
    </div>
  );
}

function ShippingStep({ onNext }: { onNext: (data: ShippingFormData) => void }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { sameAsBilling: true },
  });
  const sameAsBilling = watch('sameAsBilling');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <h2 className="font-serif font-bold text-2xl text-dark-text">Shipping Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <InputField
            label="Full Name"
            required
            placeholder="Aisha Mohammed Al-Rashid"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
        </div>
        <InputField
          label="Email Address"
          type="email"
          required
          placeholder="aisha@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputField
          label="Phone Number"
          type="tel"
          required
          placeholder="+971 50 123 4567"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <div className="sm:col-span-2">
          <InputField
            label="Address Line 1"
            required
            placeholder="Villa 12, Jumeirah 3"
            error={errors.address?.message}
            {...register('address')}
          />
        </div>
        <div className="sm:col-span-2">
          <InputField
            label="Address Line 2"
            placeholder="Near Dubai Mall (optional)"
            {...register('address2')}
          />
        </div>
        <SelectField
          label="Emirate"
          required
          options={EMIRATES}
          error={errors.emirate?.message}
          {...register('emirate')}
        />
        <InputField
          label="ZIP / PO Box"
          placeholder="12345 (optional)"
          {...register('zipCode')}
        />
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-dark-text mb-1.5">Special Delivery Instructions</label>
          <textarea
            className="w-full border border-border-divider rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all resize-none"
            rows={3}
            placeholder="e.g. Call before delivery, leave at reception..."
            {...register('instructions')}
          />
        </div>
      </div>

      {/* Billing same as shipping */}
      <div className="flex items-center gap-3 p-4 bg-soft-bg rounded-xl border border-border-divider">
        <input
          type="checkbox"
          id="sameAsBilling"
          className="w-4 h-4 accent-brand-gold"
          defaultChecked
          {...register('sameAsBilling')}
        />
        <label htmlFor="sameAsBilling" className="text-sm text-gray-600">
          Billing address is the same as shipping address
        </label>
      </div>

      {!sameAsBilling && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-soft-bg rounded-xl border border-border-divider"
        >
          <p className="text-sm text-gray-500">Separate billing address form would appear here.</p>
        </motion.div>
      )}

      <button type="submit" className="btn-primary w-full py-4 text-base">
        Continue to Payment →
      </button>
    </form>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState<'stripe' | 'paypal' | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="font-serif font-bold text-2xl text-dark-text">Payment Method</h2>

      {/* Payment method selection */}
      <div className="space-y-3">
        {[
          { id: 'stripe', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex — powered by Stripe', icon: '💳' },
          { id: 'paypal', label: 'PayPal', sub: 'Fast checkout with your PayPal account', icon: '🅿️' },
        ].map(({ id, label, sub, icon }) => (
          <button
            key={id}
            onClick={() => setSelected(id as 'stripe' | 'paypal')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              selected === id ? 'border-brand-gold bg-brand-gold/5' : 'border-border-divider hover:border-brand-gold/40'
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="font-semibold text-dark-text text-sm">{label}</p>
              <p className="text-gray-400 text-xs">{sub}</p>
            </div>
            {selected === id && <span className="ml-auto text-brand-gold">✓</span>}
          </button>
        ))}
      </div>

      {/* Placeholder card form */}
      <AnimatePresence>
        {selected === 'stripe' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 p-6 bg-soft-bg rounded-2xl border border-border-divider"
          >
            <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider flex items-center gap-2">
              🔒 Payment gateway configuration in progress
            </p>
            <div className="space-y-3 opacity-60 pointer-events-none">
              <input placeholder="Card number" className="w-full border border-border-divider rounded-xl px-4 py-3 text-sm" disabled />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM / YY" className="border border-border-divider rounded-xl px-4 py-3 text-sm" disabled />
                <input placeholder="CVV" className="border border-border-divider rounded-xl px-4 py-3 text-sm" disabled />
              </div>
              <input placeholder="Cardholder name" className="w-full border border-border-divider rounded-xl px-4 py-3 text-sm" disabled />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security */}
      <div className="flex items-center gap-3 text-xs text-gray-400 justify-center">
        <span>🔒 256-bit SSL Encryption</span>
        <span>•</span>
        <span>PCI DSS Compliant</span>
        <span>•</span>
        <span>Secure Checkout</span>
      </div>

      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-full font-semibold text-base bg-soft-bg border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-dark-text transition-all duration-300"
        >
          Save Order & Contact for Payment
        </button>
        <p className="text-xs text-gray-400 text-center">
          We'll email {CONTACT_EMAIL} with your order. Payment details arranged within 24 hours.
        </p>
        <button
          onClick={onBack}
          className="w-full text-gray-400 text-sm hover:text-brand-red transition-colors py-2"
        >
          ← Back to Shipping
        </button>
      </div>
    </div>
  );
}

export default function Checkout() {
  const [step, setStep] = useState(1);
  const { items, total, clearCart } = useCart();
  const { setOrderData } = useCheckout();
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingNext = (_data: ShippingFormData) => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentNext = () => {
    const order = {
      orderNumber: generateOrderNumber(),
      items: [...items],
      shippingInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        emirate: 'Dubai',
      },
      total,
      timestamp: new Date(),
    };
    setOrderData(order);
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <main className="pt-28 pb-20 min-h-screen bg-soft-bg">
      <div className="max-w-container mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-dark-text mb-8 text-center">
            Checkout
          </h1>
          <ProgressBar step={step} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-3xl border border-border-divider p-6 md:p-8"
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              {step === 1 && <ShippingStep onNext={handleShippingNext} />}
              {step === 2 && <PaymentStep onNext={handlePaymentNext} onBack={() => setStep(1)} />}
            </motion.div>
          </div>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-white rounded-3xl border border-border-divider p-6 sticky top-28">
              <h3 className="font-serif font-bold text-lg text-dark-text mb-5">Order Review</h3>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex-shrink-0 bg-dark-text/5 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/1A1A1A/D4AF37?text=T'; }}
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-dark-text truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{item.edition} Edition</p>
                    </div>
                    <span className="text-sm font-semibold text-dark-text">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-divider pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-brand-green">Included</span>
                </div>
                <div className="flex justify-between font-bold text-dark-text text-base border-t border-border-divider pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-brand-red font-serif">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-5 text-xs text-gray-400 space-y-1">
                <p>📦 Estimated delivery: {getEstimatedDelivery()}</p>
                <p>✉️ Questions? {CONTACT_EMAIL}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
