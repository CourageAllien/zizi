import OrrenHeader from "@/components/orren/Header";
import OrrenHero from "@/components/orren/Hero";
import LeadGenProblem from "@/components/orren/Problem";
import TheShift from "@/components/orren/TheShift";
import WhatWeDo from "@/components/orren/WhatWeDo";
import LeadGenHowItWorks from "@/components/orren/HowItWorks";
import WhoThisIsFor from "@/components/orren/WhoThisIsFor";
import WhatYouCouldBuild from "@/components/orren/WhatYouCouldBuild";
import LeadGenPricing from "@/components/orren/Pricing";
import LeadGenFAQ from "@/components/orren/FAQ";
import LeadGenFinalCTA from "@/components/orren/FinalCTA";
import OrrenFooter from "@/components/orren/Footer";

export default function Home() {
  return (
    <>
      <OrrenHeader />
      <main className="bg-white">
        <OrrenHero />
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
      <OrrenFooter />
    </>
  );
}
