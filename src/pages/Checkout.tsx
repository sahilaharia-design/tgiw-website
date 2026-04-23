import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice, generateReservationNumber, getShipByDate } from '../utils/formatters';
import { EMIRATES, CONTACT_EMAIL, PREORDER } from '../utils/constants';

const reservationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(9, 'Valid phone number required'),
  address: z.string().min(5, 'Address is required'),
  emirate: z.string().min(1, 'Please select an emirate'),
  notes: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

function Field({
  label,
  error,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-luxe text-muted">
        {label}
        {required && <span className="text-maroon ms-1">*</span>}
      </label>
      <input
        className={`w-full bg-transparent border-b py-3 text-ink font-light focus:outline-none transition-colors duration-500 ${
          error ? 'border-maroon' : 'border-ink/20 focus:border-maroon'
        }`}
        {...props}
      />
      {error && <p className="text-maroon text-xs font-light">{error}</p>}
    </div>
  );
}

function SelectFieldBare({
  label,
  error,
  required,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs uppercase tracking-luxe text-muted">
        {label}
        {required && <span className="text-maroon ms-1">*</span>}
      </label>
      <select
        className={`w-full bg-transparent border-b py-3 text-ink font-light focus:outline-none transition-colors duration-500 ${
          error ? 'border-maroon' : 'border-ink/20 focus:border-maroon'
        }`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="text-maroon text-xs font-light">{error}</p>}
    </div>
  );
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { setOrderData } = useCheckout();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationForm>({ resolver: zodResolver(reservationSchema) });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const depositTotal = items.reduce(
    (sum, i) => sum + PREORDER.depositAED * i.quantity,
    0,
  );
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const onSubmit = (data: ReservationForm) => {
    const order = {
      orderNumber: generateReservationNumber(),
      items: [...items],
      shippingInfo: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        emirate: data.emirate,
        instructions: data.notes,
      },
      total,
      timestamp: new Date(),
    };
    setOrderData(order);
    clearCart();
    navigate('/order-confirmation');
  };

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
            <span className="eyebrow">Reserve your Shaadi</span>
            <span className="hairline" />
          </div>
          <h1 className="display-lg text-ink text-balance">
            Tell us <span className="display-italic text-maroon">where to send</span> your night.
          </h1>
          <p className="text-ink-soft/70 font-light mt-6 max-w-md mx-auto">
            A deposit holds your seat. The balance is only collected when your Shaadi is ready to ship.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Field
                  label="Full name"
                  required
                  placeholder="Aisha Mohammed Al-Rashid"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
              </div>
              <Field
                label="Email"
                type="email"
                required
                placeholder="aisha@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Field
                label="Phone"
                type="tel"
                required
                placeholder="+971 50 123 4567"
                error={errors.phone?.message}
                {...register('phone')}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Shipping address"
                  required
                  placeholder="Villa 12, Jumeirah 3"
                  error={errors.address?.message}
                  {...register('address')}
                />
              </div>
              <SelectFieldBare
                label="Emirate"
                required
                options={EMIRATES}
                error={errors.emirate?.message}
                {...register('emirate')}
              />
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-luxe text-muted mb-2">
                  A note for us (optional)
                </label>
                <textarea
                  className="w-full bg-transparent border-b border-ink/20 py-3 text-ink font-light focus:outline-none focus:border-maroon transition-colors duration-500 resize-none"
                  rows={2}
                  placeholder="Anything we should know"
                  {...register('notes')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isSubmitting ? 'Holding your seat...' : `Pay deposit · ${formatPrice(depositTotal)}`}
            </button>

            <p className="text-xs text-muted text-center font-light leading-relaxed">
              Our team will confirm your reservation and collect the deposit within 24 hours.
              <br />
              Full refund available any time before production begins.
              <br />
              Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-maroon hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </motion.form>

          {/* Reservation summary */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-ivory-deep rounded-2xl p-8 sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <span className="eyebrow">{PREORDER.cohortName}</span>
              </div>

              <h3 className="font-serif text-2xl text-ink tracking-editorial mb-1">
                {itemCount} seat{itemCount > 1 ? 's' : ''} held
              </h3>
              <p className="text-muted text-sm mb-8">
                Expected ship-by · {getShipByDate(PREORDER.cohortShipMonths * 30)}
              </p>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-ink-soft/80">
                  <span>Full price · per seat</span>
                  <span>{formatPrice(PREORDER.totalAED)}</span>
                </div>
                <div className="flex justify-between text-ink-soft/80">
                  <span>Refundable deposit · per seat</span>
                  <span>{formatPrice(PREORDER.depositAED)}</span>
                </div>
                <div className="flex justify-between text-ink-soft/80">
                  <span>Remainder on ship · per seat</span>
                  <span>{formatPrice(PREORDER.remainderAED)}</span>
                </div>
              </div>

              <div className="border-t border-ink/10 pt-5">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs uppercase tracking-luxe text-muted">Pay today</p>
                  </div>
                  <span className="font-serif text-2xl text-maroon">
                    {formatPrice(depositTotal)}
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
