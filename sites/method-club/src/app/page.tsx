import { Hero } from "@/sections/Hero";
import { MarketGrowth } from "@/sections/MarketGrowth";
import { EducationEngine } from "@/sections/EducationEngine";
import { MarketSplit } from "@/sections/MarketSplit";
import { ExpertIntro } from "@/sections/ExpertIntro";
import { WhatIsClub } from "@/sections/WhatIsClub";
import { DynamicLibrary } from "@/sections/DynamicLibrary";
import { MaterialFeed } from "@/sections/MaterialFeed";
import { EcosystemAudience } from "@/sections/EcosystemAudience";
import { SuccessStories } from "@/sections/SuccessStories";
import { Testimonials } from "@/sections/Testimonials";
import { PriceOfInaction } from "@/sections/PriceOfInaction";
import { Pricing } from "@/sections/Pricing";
import { VisionersApply } from "@/sections/VisionersApply";
import { VisionersBonuses } from "@/sections/VisionersBonuses";
import { VisionersIntro } from "@/sections/VisionersIntro";
import { VisionersWhatAwaits } from "@/sections/VisionersWhatAwaits";
import { FAQ } from "@/sections/FAQ";
import { JoinPricingCTA } from "@/sections/JoinPricingCTA";
import { ContactCTA } from "@/sections/ContactCTA";
import { Footer } from "@/sections/Footer";
import { getStructuredData } from "@/lib/seo";

export default function Home() {
  const structuredData = getStructuredData();

  return (
    <main className="min-h-screen bg-bg">
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <Hero />
      <MarketGrowth />
      <EducationEngine />
      <PriceOfInaction />
      <MarketSplit />
      <WhatIsClub />
      <DynamicLibrary />
      <MaterialFeed />
      <EcosystemAudience />
      <Pricing />
      <VisionersIntro />
      <VisionersWhatAwaits />
      <VisionersBonuses />
      <VisionersApply />
      <SuccessStories />
      <ExpertIntro />
      <Testimonials />
      <FAQ />
      <JoinPricingCTA />
      <ContactCTA />
      <Footer />
    </main>
  );
}
