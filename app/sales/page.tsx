"use client";

import SalesNavbar from "@/components/sales/SalesNavbar";
import SalesHero from "@/components/sales/SalesHero";
import SalesProblem from "@/components/sales/SalesProblem";
import SalesSolution from "@/components/sales/SalesSolution";
import SalesHowItWorks from "@/components/sales/SalesHowItWorks";
import SalesWhatWeBuild from "@/components/sales/SalesWhatWeBuild";
import SalesExamples from "@/components/sales/SalesExamples";
import SalesTestimonials from "@/components/sales/SalesTestimonials";
import SalesWhyUs from "@/components/sales/SalesWhyUs";
import SalesPricing from "@/components/sales/SalesPricing";
import SalesFAQ from "@/components/sales/SalesFAQ";
import SalesFinalCTA from "@/components/sales/SalesFinalCTA";
import SalesFooter from "@/components/sales/SalesFooter";

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      <SalesNavbar />
      <SalesHero />
      <SalesProblem />
      <SalesSolution />
      <SalesHowItWorks />
      <SalesWhatWeBuild />
      <SalesExamples />
      <SalesTestimonials />
      <SalesWhyUs />
      <SalesPricing />
      <SalesFAQ />
      <SalesFinalCTA />
      <SalesFooter />
    </main>
  );
}
