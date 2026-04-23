import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import CinematicLayers from './components/cinematic/CinematicLayers';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

function NotFound() {
  return (
    <main className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <h1 className="cg-headline text-maroon mb-4">This room is not yet open.</h1>
        <p className="text-muted font-light text-sm mb-10 tracking-wide">The door you tried does not exist.</p>
        <a href="/" className="btn-primary">Return to the entrance</a>
      </div>
    </main>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Global cinematic environment — fixed layers behind everything */}
      <CinematicLayers />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <CheckoutProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </CheckoutProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
