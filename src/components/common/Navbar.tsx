import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const NAV_LINKS = [
  { label: 'The Shaadi', to: '/product' },
  { label: 'Questions', to: '/#faq' },
  { label: 'Guest list', to: '/#contact' },
];

type Lang = 'EN' | 'AR';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('EN');
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Scaffolding only — flips direction, real translations are future work
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'AR' ? 'ar' : 'en';
  }, [lang]);

  const scrolledBg = scrolled ? 'bg-ivory/92 backdrop-blur-md shadow-soft' : 'bg-transparent';

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolledBg}`}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-custom h-20 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-serif text-ink text-xl tracking-editorial">
            TGIW
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-luxe text-muted">
            Celebrate your Shaadi
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-ink/80 hover:text-maroon text-sm tracking-wide transition-colors duration-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {/* Language toggle */}
          <div className="hidden sm:flex items-center gap-1 text-xs tracking-luxe">
            <button
              onClick={() => setLang('EN')}
              className={`transition-colors duration-500 ${
                lang === 'EN' ? 'text-maroon' : 'text-muted hover:text-ink'
              }`}
              aria-pressed={lang === 'EN'}
            >
              EN
            </button>
            <span className="text-muted/40">/</span>
            <button
              onClick={() => setLang('AR')}
              className={`transition-colors duration-500 ${
                lang === 'AR' ? 'text-maroon' : 'text-muted hover:text-ink'
              }`}
              aria-pressed={lang === 'AR'}
            >
              AR
            </button>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-ink/80 hover:text-maroon transition-colors duration-500 text-sm tracking-wide"
            aria-label="Reservation"
          >
            Reservation
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -end-4 bg-maroon text-ivory text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>

          <Link
            to="/product"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon text-ivory text-sm tracking-wide hover:bg-maroon-deep transition-all duration-500"
          >
            Reserve
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ink p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-px bg-current transition-all duration-500 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-px bg-current transition-all duration-500 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-px bg-current transition-all duration-500 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-ivory/95 backdrop-blur border-t border-ink/10"
          >
            <nav className="container-custom py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-ink text-base tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 text-xs tracking-luxe pt-2">
                <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'text-maroon' : 'text-muted'}>EN</button>
                <span className="text-muted/40">/</span>
                <button onClick={() => setLang('AR')} className={lang === 'AR' ? 'text-maroon' : 'text-muted'}>AR</button>
              </div>
              <Link to="/product" className="btn-primary text-center mt-2">
                Reserve yours
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
