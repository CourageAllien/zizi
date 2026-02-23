"use client";

const examples = [
  {
    title: "Leadership Gap Assessment",
    who: "A leadership coach",
    desc: "Directors and VPs find out where their blind spots are. They book a call to understand how to fix it.",
  },
  {
    title: "Cash Flow Clarity Calculator",
    who: "A fractional CFO",
    desc: "Founders upload their numbers and see where money is leaking. They hire her to fix it.",
  },
  {
    title: "Ad Audit Scorecard",
    who: "A marketing consultant",
    desc: "Ecom brands diagnose why their ads aren't converting. He closes them on a done-for-you engagement.",
  },
  {
    title: "ROI Forecasting Dashboard",
    who: "A SaaS consultant",
    desc: "Prospects input their current metrics and see projected ROI. They visualize the impact before the sales call.",
  },
  {
    title: "Team Performance Diagnostic",
    who: "An HR consultant",
    desc: "A platform that analyzes team dynamics, identifies bottlenecks, and generates custom reports. Companies audit their teams before hiring.",
  },
  {
    title: "Workflow Optimizer",
    who: "An operations consultant",
    desc: "An interactive tool that maps current processes, identifies inefficiencies, and suggests optimized workflows instantly.",
  },
  {
    title: "Market Positioning Analyzer",
    who: "A brand strategist",
    desc: "Analyzes a company's messaging, compares it to competitors, and generates a positioning strategy report.",
  },
  {
    title: "Customer Journey Mapper",
    who: "A CRO expert",
    desc: "Businesses input their funnel data and get a visual breakdown of drop-off points, friction areas, and optimization opportunities.",
  },
];

export default function WhatYouCouldBuild() {
  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">What You Could Build</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-14">
          The tool is the handshake.
          <br />
          Your offer is the relationship.
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="bg-[#FAFAFA] border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
            >
              <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-2">{ex.who}</p>
              <h3 className="text-base font-bold text-[#111827] mb-2">{ex.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{ex.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
