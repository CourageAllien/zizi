"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">Getting Started</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-6">
          Your competitors are still cold pitching.
          <br className="hidden sm:block" />
          You could be sending them a tool that sells for you.
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg mb-10 leading-relaxed">
          Start for $549. Cancel anytime. First tool live in weeks.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex px-8 py-3 bg-[#2563EB] text-white text-sm font-medium rounded-md hover:bg-[#1D4ED8] transition-colors shadow-sm"
        >
          Let's Build Your First Tool
        </Link>
      </div>
    </section>
  );
}
