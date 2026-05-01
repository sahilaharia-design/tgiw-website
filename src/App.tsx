import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

function NotFound() {
  return (
    <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-7xl mb-6">🎲</div>
        <h1 className="font-serif font-bold text-4xl text-dark-text mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-8">This card hasn't been dealt yet.</p>
        <a href="/" className="btn-primary">Return to Home</a>
      </div>
    </main>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
