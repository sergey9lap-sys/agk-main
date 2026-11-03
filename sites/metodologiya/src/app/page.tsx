import { Hero } from "@/sections/Hero";
import { Corporations } from "@/sections/Corporations";
import { ForWhom } from "@/sections/ForWhom";
import { WhatIsMethodology } from "@/sections/WhatIsMethodology";
import { HowItWorks } from "@/sections/HowItWorks";
import { Problems } from "@/sections/Problems";
import { Testimonials } from "@/sections/Testimonials";
import { AlumniEmployers, FamousAlumni } from "@/sections/FamousAlumni";
import { Pricing } from "@/sections/Pricing";
import { PaymentOptions } from "@/sections/PaymentOptions";
import { FAQ } from "@/sections/FAQ";
import { ContactCTA } from "@/sections/ContactCTA";
import { Footer } from "@/sections/Footer";
import { ExpertIntro } from "@/sections/ExpertIntro";
import { NichesAndFormats } from "@/sections/NichesAndFormats";
import { ExpertResults } from "@/sections/ExpertResults";
import { MethodologistCareer } from "@/sections/MethodologistCareer";
import { EntrepreneurResults } from "@/sections/EntrepreneurResults";
import { Myths } from "@/sections/Myths";
import { MethodologyRoadmap } from "@/sections/MethodologyRoadmap";




export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Hero />
      <WhatIsMethodology />
      <Corporations />
      <ForWhom />
      <ExpertResults />
      <MethodologistCareer />
      <AlumniEmployers />
      <EntrepreneurResults />
      <Myths />
      <NichesAndFormats />
      <Problems />
      <Testimonials />
      <HowItWorks />
      <MethodologyRoadmap />
      {/* CourseSchedule is intentionally hidden for the current landing version. */}
      {/* <CourseSchedule /> */}
      <Pricing />
      <PaymentOptions />
      <ExpertIntro />
      <FamousAlumni />
      <FAQ />
      <ContactCTA />
      <Footer />
    </main>
  );
}
