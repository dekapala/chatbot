import { BusinessGallery } from "@/components/BusinessGallery";
import { FeatureTabs } from "@/components/FeatureTabs";
import { Hero } from "@/components/Hero";
import { PricingCalculator } from "@/components/PricingCalculator";
import { Testimonials } from "@/components/Testimonials";
import { UseCases } from "@/components/UseCases";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureTabs />
      <UseCases />
      <BusinessGallery />
      <PricingCalculator />
      <Testimonials />
      <Footer />
    </>
  );
}
