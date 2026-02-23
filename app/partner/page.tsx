import { Metadata } from "next";
import PartnerNavbar from "@/components/partner/PartnerNavbar";
import PartnerFooter from "@/components/partner/PartnerFooter";
import PartnerHero from "@/components/partner/sections/PartnerHero";
import PartnerProblem from "@/components/partner/sections/PartnerProblem";
import PartnerSolution from "@/components/partner/sections/PartnerSolution";
import PartnerHowItWorks from "@/components/partner/sections/PartnerHowItWorks";
import PartnerWhatWeBuild from "@/components/partner/sections/PartnerWhatWeBuild";
import PartnershipValue from "@/components/partner/sections/PartnershipValue";
import MonthlyDeliverables from "@/components/partner/sections/MonthlyDeliverables";
import PartnerPricing from "@/components/partner/sections/PartnerPricing";
import PartnerSocialProof from "@/components/partner/sections/PartnerSocialProof";
import PartnerFAQ from "@/components/partner/sections/PartnerFAQ";
import PartnerFinalCTA from "@/components/partner/sections/PartnerFinalCTA";
import TrialRequestForm from "@/components/partner/TrialRequestForm";

export const metadata: Metadata = {
  title: "ZiziCo — Your AI Sales & Marketing Partner",
  description:
    "We help you build AI-powered sales assets and tools for your marketing and sales campaigns. Trial build for $750, or partner with us at $2,500/month.",
  openGraph: {
    title: "ZiziCo — Your AI Sales & Marketing Partner",
    description:
      "We help you build AI-powered sales assets and tools for your marketing and sales campaigns.",
    url: "https://zizi.so/partner",
    siteName: "ZiziCo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZiziCo — Your AI Sales & Marketing Partner",
    description:
      "AI-powered sales assets for your marketing campaigns. Start with a $750 trial build.",
  },
};

export default function PartnerPage() {
  return (
    <>
      <PartnerNavbar />
      <main>
        <PartnerHero />
        <PartnerProblem />
        <PartnerSolution />
        <PartnerHowItWorks />
        <PartnerWhatWeBuild />
        <PartnershipValue />
        <MonthlyDeliverables />
        <PartnerPricing />
        <PartnerSocialProof />
        <PartnerFAQ />
        <TrialRequestForm />
        <PartnerFinalCTA />
      </main>
      <PartnerFooter />
    </>
  );
}

