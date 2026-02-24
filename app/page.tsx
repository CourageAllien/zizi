import { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import WhatWeBuild from "@/components/WhatWeBuild";
import WhoItsFor from "@/components/WhoItsFor";
import Differentiation from "@/components/Differentiation";
import HomePricing from "@/components/HomePricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import FreeToolOffer from "@/components/FreeToolOffer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ZiziCo — Your AI Ops Team",
  description:
    "We build AI systems that complement the work you are doing and helps add revenue. Unlimited builds. Maintained forever.",
  openGraph: {
    title: "ZiziCo — Your AI Ops Team",
    description:
      "We build AI systems that complement the work you are doing and helps add revenue. Unlimited builds. Maintained forever.",
    url: "https://zizi.so",
    siteName: "ZiziCo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZiziCo — Your AI Ops Team",
    description:
      "We build AI systems that complement the work you are doing and helps add revenue.",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="what-we-build">
          <WhatWeBuild />
        </div>
        <WhoItsFor />
        <Differentiation />
        <FreeToolOffer />
        <div id="pricing">
          <HomePricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
