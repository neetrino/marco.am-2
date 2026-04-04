import { HeroSection } from '../components/HeroSection';
import { TopCategories } from '../components/TopCategories';
import { FeaturedProductsTabs } from '../components/FeaturedProductsTabs';
import { BrandsSection } from '../components/BrandsSection';
import { AppDownloadSection } from '../components/AppDownloadSection';
import { PromoCardsSection } from '../components/PromoCardsSection';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero — yellow brick-wall bg, 3 product panels */}
      <HeroSection />

      {/* 2. REELS — category circles */}
      <TopCategories />

      {/* 3. Հatuk Arajarkner (Special Offers) + NORUYTNNER (New Arrivals) */}
      <FeaturedProductsTabs />

      {/* 4. BRENDNER — brand logos */}
      <BrandsSection />

      {/* 5. App download — yellow section */}
      <AppDownloadSection />

      {/* 6. Promo cards — sofa + smartphones */}
      <PromoCardsSection />
    </div>
  );
}
