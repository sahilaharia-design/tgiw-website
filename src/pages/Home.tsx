import HeroSection        from '../components/home/HeroSection';
import EveningSection     from '../components/home/EveningSection';
import MemorySection      from '../components/home/MemorySection';
import RevealSection      from '../components/home/RevealSection';
import PositioningSection from '../components/home/PositioningSection';
import MysterySection     from '../components/home/MysterySection';
import CohortSection      from '../components/home/CohortSection';
import GoldEditionSection from '../components/home/GoldEditionSection';
import FAQSection         from '../components/home/FAQSection';
import GuestListSection   from '../components/home/GuestListSection';

/**
 * Landing page — 10 ceremonial rooms in sequence.
 * Section order mirrors the HTML design exactly.
 * No layout, typography, or section order changes — only cinematic depth added.
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <EveningSection />
      <MemorySection />
      <RevealSection />
      <PositioningSection />
      <MysterySection />
      <CohortSection />
      <GoldEditionSection />
      <FAQSection />
      <GuestListSection />
    </main>
  );
}
