import GradientBanner from "@/components/agentone/GradientBanner";
import LeadGenHeader from "@/components/leadgen/Header";
import LeadGenHero from "@/components/leadgen/Hero";
import LeadGenProblem from "@/components/leadgen/Problem";
import TheShift from "@/components/leadgen/TheShift";
import WhatWeDo from "@/components/leadgen/WhatWeDo";
import LeadGenHowItWorks from "@/components/leadgen/HowItWorks";
import WhoThisIsFor from "@/components/leadgen/WhoThisIsFor";
import WhatYouCouldBuild from "@/components/leadgen/WhatYouCouldBuild";
import LeadGenPricing from "@/components/leadgen/Pricing";
import LeadGenFAQ from "@/components/leadgen/FAQ";
import LeadGenFinalCTA from "@/components/leadgen/FinalCTA";
import WhatSiriShouldBe from "@/components/leadgen/WhatSiriShouldBe";
import LeadGenFooter from "@/components/leadgen/Footer";

export default function Home() {
  return (
    <>
      <GradientBanner />
      <LeadGenHeader />
      <main className="bg-[#f5f5f0]">
        <LeadGenHero />
        <WhatSiriShouldBe />
        <LeadGenProblem />
        <TheShift />
        <WhatWeDo />
        <LeadGenHowItWorks />
        <WhoThisIsFor />
        <WhatYouCouldBuild />
        <LeadGenPricing />
        <LeadGenFAQ />
        <LeadGenFinalCTA />
      </main>
      <LeadGenFooter />
    </>
  );
}
