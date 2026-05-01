import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PRODUCT, TESTIMONIALS, CONTACT_EMAIL } from '../utils/constants';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import StarRating from '../components/common/StarRating';

const TABS = ['Overview', "What's Included", 'Specifications', 'How to Play', 'Shipping & Returns'];

const RELATED = [
  { title: 'Standard Edition', price: 899, badge: 'In Stock', image: '/images/TGIW_Box.png' },
  { title: 'Gold Limited Edition', price: 0, badge: 'Request Pricing', image: '/images/TGIW_Gold_limited_edition.png' },
];

function ImageGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className="relative bg-gradient-to-br from-dark-text to-dark-surface rounded-2xl overflow-hidden aspect-square flex items-center justify-center cursor-zoom-in group"
        onClick={() => setLightbox(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={PRODUCT.images[activeIdx]}
            alt={`TGIW product image ${activeIdx + 1}`}
            className="object-contain p-8 max-h-96 transition-transform duration-300 group-hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1A1A1A/D4AF37?text=TGIW'; }}
          />
        </AnimatePresence>
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Click to enlarge
        </div>

        {/* Nav arrows */}
        {PRODUCT.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => (p - 1 + PRODUCT.images.length) % PRODUCT.images.length); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Previous image"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => (p + 1) % PRODUCT.images.length); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Next image"
            >›</button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {PRODUCT.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${i === activeIdx ? 'border-brand-gold shadow-gold scale-105' : 'border-border-divider hover:border-brand-gold/50'}`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-contain bg-dark-text/5 p-1"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1A1A1A/D4AF37?text=IMG'; }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <motion.img
              src={PRODUCT.images[activeIdx]}
              alt="TGIW enlarged"
              className="max-h-[85vh] max-w-[85vw] object-contain"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1A1A1A/D4AF37?text=TGIW'; }}
            />
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl"
              aria-label="Close lightbox"
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabContent({ tab }: { tab: string }) {
  switch (tab) {
    case 'Overview':
      return (
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p>The Great Indian Wedding Board Game is the world's first luxury board game built entirely around the grandeur and complexity of Indian weddings. Designed for 4–8 players, it immerses your group in the rituals, drama, and celebration that define one of the world's most vibrant cultural institutions.</p>
          <p>From the Mehendi ceremony to the Baraat entry, from negotiating the dowry to managing the wedding budget — TGIW captures it all with rich gameplay mechanics, culturally authentic card decks, and premium components that elevate every game night into a celebration.</p>
          <p>The game is designed for HNI audiences, collectors, and anyone who wants to bring the joy of an Indian wedding to their living room — no wedding invitation required.</p>
        </div>
      );
    case "What's Included":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Multiple Game Boards', 'Themed boards for each ceremony phase'],
            ['6+ Card Decks', 'Color-coded sets per wedding event'],
            ['80+ Coins & Tokens', 'Gold and silver-grey premium coins'],
            ['20+ Ceremonial Elements', 'Garlands, glasses, ritual miniatures'],
            ['Instruction Manual', 'Illustrated rulebook (EN/HI)'],
            ['Quick Start Guide', 'Get playing in 5 minutes'],
            ['Special Props', 'Microphone, DJ console token + more'],
            ['Dice Set', 'Custom branded dice'],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-3 p-4 bg-soft-bg rounded-xl">
              <span className="text-brand-gold text-lg mt-0.5">✦</span>
              <div>
                <p className="font-semibold text-dark-text text-sm">{title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'Specifications':
      return (
        <div className="space-y-3">
          {[
            ['Players', '4–8'],
            ['Game Duration', '60–120 minutes (variable)'],
            ['Recommended Age', '15+'],
            ['Language', 'English / Hindi'],
            ['SKU', 'TGIW-STD-001'],
            ['Edition', 'Standard'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center py-3 border-b border-border-divider">
              <span className="text-gray-500 text-sm">{label}</span>
              <span className="font-semibold text-dark-text text-sm">{value}</span>
            </div>
          ))}
        </div>
      );
    case 'How to Play':
      return (
        <div className="space-y-5 text-gray-600">
          <div>
            <h4 className="font-semibold text-dark-text mb-2">Setup (10 minutes)</h4>
            <p className="text-sm leading-relaxed">Each player selects a wedding role (Bride's family, Groom's family, Guests, Vendors). Place the main board in the center, distribute starting coins and role cards, and shuffle each ceremony deck.</p>
          </div>
          <div>
            <h4 className="font-semibold text-dark-text mb-2">Turn Sequence</h4>
            <p className="text-sm leading-relaxed">Roll dice to advance through wedding stages. Draw event cards, complete ceremony challenges, negotiate with other players, and manage your budget. Each ceremony phase unlocks new game mechanics.</p>
          </div>
          <div>
            <h4 className="font-semibold text-dark-text mb-2">Victory Conditions</h4>
            <p className="text-sm leading-relaxed">The player (or team) who successfully completes all wedding rituals with the most prestige points and remaining budget wins. Multiple victory tracks keep competition engaging throughout.</p>
          </div>
        </div>
      );
    case 'Shipping & Returns':
      return (
        <div className="space-y-5 text-sm text-gray-600">
          {[
            { title: '🚚 Shipping', content: 'Standard shipping to Dubai is included in the 899 AED price. Estimated delivery: 3–5 business days from order confirmation. Tracking information provided once dispatched.' },
            { title: '↩️ Returns', content: '30-day money-back guarantee from purchase date. Items must be in original, unused condition. Return shipping arranged and covered. Refund processed within 5–7 business days.' },
            { title: '🔄 Exchange', content: '14-day exchange window for defects or damaged items. Free replacement shipping. Initiate at info@celebratetgiw.com with proof of purchase and photos.' },
            { title: '🛡️ Warranty', content: '1-year manufacturer warranty covering component defects. Does not cover normal wear, misuse, or water damage. Claim via email with proof of purchase.' },
          ].map(({ title, content }) => (
            <div key={title} className="bg-soft-bg rounded-xl p-5">
              <h4 className="font-semibold text-dark-text mb-2">{title}</h4>
              <p className="leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const inView = useInView(detailRef, { once: true, margin: '-80px' });

  const handleAddToCart = () => {
    addToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      quantity: qty,
      image: PRODUCT.images[0],
      edition: PRODUCT.edition,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="pt-20 pb-16">
      {/* Product Hero */}
      <section className="max-w-container mx-auto px-5 md:px-10 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery />
          </motion.div>

          {/* Right: details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StarRating rating={5} size="md" />
                <span className="text-sm text-gray-500">({TESTIMONIALS.length} reviews)</span>
                <span className="text-xs bg-brand-green/10 text-brand-green border border-brand-green/30 px-2 py-0.5 rounded-full">In Stock</span>
              </div>
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-dark-text leading-tight">
                {PRODUCT.name}
              </h1>
              <p className="text-brand-gold font-medium mt-2">{PRODUCT.tagline}</p>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif font-bold text-4xl text-brand-red">
                  {formatPrice(PRODUCT.price)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Including shipping to Dubai · 3–5 business days</p>
            </div>

            <p className="text-gray-600 leading-relaxed">{PRODUCT.description}</p>

            {/* Qty + Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-dark-text">Quantity</label>
                <div className="flex items-center border border-border-divider rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-soft-bg transition-colors text-lg font-bold"
                    aria-label="Decrease quantity"
                  >−</button>
                  <span className="px-4 font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-soft-bg transition-colors text-lg font-bold"
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-full font-semibold text-base transition-all duration-300 ${addedToCart ? 'bg-brand-green text-white' : 'btn-primary'}`}
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => { handleAddToCart(); navigate('/checkout'); }}
                  className="flex-1 btn-secondary py-4"
                >
                  Buy Now
                </button>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}?subject=TGIW Gold Edition Inquiry`}
                className="btn-outline-gold block text-center py-3 text-sm"
              >
                Request Gold Edition Info
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: '🛡️', label: '1-Year Warranty' },
                { icon: '↩️', label: '30-Day Returns' },
                { icon: '🚚', label: 'Free Shipping' },
              ].map(({ icon, label }) => (
                <div key={label} className="text-center bg-soft-bg rounded-xl p-3">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section ref={detailRef} className="max-w-container mx-auto px-5 md:px-10 py-12 border-t border-border-divider">
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-brand-red text-white'
                  : 'bg-soft-bg text-gray-500 hover:bg-border-divider'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabContent tab={activeTab} />
        </motion.div>
      </section>

      {/* Related */}
      <section className="max-w-container mx-auto px-5 md:px-10 py-12 border-t border-border-divider">
        <h2 className="font-serif font-bold text-2xl text-dark-text mb-8">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          {RELATED.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-border-divider overflow-hidden shadow-sm cursor-pointer"
            >
              <div className="bg-gradient-to-br from-dark-text to-dark-surface aspect-square flex items-center justify-center p-6">
                <img
                  src={p.image}
                  alt={p.title}
                  className="max-h-36 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/1A1A1A/D4AF37?text=TGIW'; }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-dark-text">{p.title}</h3>
                <p className="text-brand-red font-bold mt-1">{p.price > 0 ? formatPrice(p.price) : p.badge}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-container mx-auto px-5 md:px-10 py-12 border-t border-border-divider">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif font-bold text-2xl text-dark-text">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <StarRating rating={5} size="lg" />
            <span className="font-bold text-dark-text">5.0</span>
            <span className="text-gray-400 text-sm">/ 5.0</span>
          </div>
        </div>
        <div className="space-y-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-border-divider p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center font-serif font-bold text-brand-gold">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-dark-text text-sm">{t.author}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={t.rating} size="sm" />
                  {t.verified && (
                    <span className="text-xs bg-brand-green/10 text-brand-green border border-brand-green/30 px-2 py-0.5 rounded-full">✓ Verified</span>
                  )}
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed italic">"{t.quote}"</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
