import { Metadata } from "next";
import Header from "@/components/fracrep/Header";
import Hero from "@/components/fracrep/Hero";
import Problem from "@/components/fracrep/Problem";
import TheShift from "@/components/fracrep/TheShift";
import WhatWeDo from "@/components/fracrep/WhatWeDo";
import HowItWorks from "@/components/fracrep/HowItWorks";
import WhoThisIsFor from "@/components/fracrep/WhoThisIsFor";
import WhatYouCouldBuild from "@/components/fracrep/WhatYouCouldBuild";
import Pricing from "@/components/fracrep/Pricing";
import FAQ from "@/components/fracrep/FAQ";
import FinalCTA from "@/components/fracrep/FinalCTA";
import Footer from "@/components/fracrep/Footer";

export const metadata: Metadata = {
  title: "ZiziCo — Lead Gen Tools",
  description:
    "We build done-for-you lead gen tools that attract your ideal clients, prove your expertise, and sell your high-ticket offer — before you ever get on a call.",
  openGraph: {
    title: "ZiziCo — Lead Gen Tools",
    description:
      "We build done-for-you lead gen tools that attract your ideal clients, prove your expertise, and sell your high-ticket offer — before you ever get on a call.",
    url: "https://zizi.so/lead-gen",
    siteName: "ZiziCo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZiziCo — Lead Gen Tools",
    description:
      "Done-for-you lead gen tools for high-ticket coaches, consultants, and service businesses.",
  },
};

export default function LeadGenPage() {
  return (
    <div className="light-page" style={{ background: "#f5f5f5", color: "#111827", position: "relative", zIndex: 200 }}>
      <main className="max-w-[1200px] mx-auto bg-white min-h-screen border-x border-gray-200 shadow-sm">
        <Header />
        <Hero />
        <div id="problem">
          <Problem />
        </div>
        <TheShift />
        <WhatWeDo />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <WhoThisIsFor />
        <div id="what-you-could-build">
          <WhatYouCouldBuild />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}

