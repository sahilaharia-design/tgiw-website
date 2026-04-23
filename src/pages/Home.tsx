import HeroSection from '../components/home/HeroSection';
import ValueProposition from '../components/home/ValueProposition';
import ProductShowcase from '../components/home/ProductShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import LimitedEditionShowcase from '../components/home/LimitedEditionShowcase';
import FAQSection from '../components/home/FAQSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <ProductShowcase />
      <TestimonialsSection />
      <LimitedEditionShowcase />
      <FAQSection />
      <NewsletterSection />
    </main>
  );
}
