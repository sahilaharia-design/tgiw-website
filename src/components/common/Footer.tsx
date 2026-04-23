import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../../utils/constants';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ivory-deep text-ink pt-24 pb-10 border-t border-ink/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-ink text-2xl tracking-editorial">TGIW</span>
              <span className="text-xs uppercase tracking-luxe text-muted">
                Celebrate your Shaadi
              </span>
            </Link>
            <p className="text-ink-soft/70 font-light max-w-md leading-relaxed">
              A grand Indian wedding, brought to your table.
              <br />
              Reservations open for the Founders Cohort.
            </p>
            <p className="mt-6 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-maroon hover:text-maroon-deep transition-colors duration-500"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-luxe text-muted mb-5">Navigate</p>
            <ul className="space-y-3 text-sm text-ink-soft/80">
              <li>
                <Link to="/" className="hover:text-maroon transition-colors duration-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-maroon transition-colors duration-500">
                  The Shaadi
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-maroon transition-colors duration-500">
                  Your reservation
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-maroon transition-colors duration-500">
                  Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted font-light tracking-wide">
          <p>© {new Date().getFullYear()} TGIW · The Great Indian Wedding</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-maroon transition-colors duration-500">Terms</a>
            <a href="#" className="hover:text-maroon transition-colors duration-500">Privacy</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-maroon transition-colors duration-500">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
