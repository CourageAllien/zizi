import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import WhatWeBuild from "@/components/WhatWeBuild";
import Differentiation from "@/components/Differentiation";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import WhoItsFor from "@/components/WhoItsFor";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function AIOpsPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <WhatWeBuild />
        <Differentiation />
        <HowItWorks />
        <Pricing />
        <WhoItsFor />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

