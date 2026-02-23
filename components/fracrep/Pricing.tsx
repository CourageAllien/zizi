"use client";

import Link from "next/link";

export default function Pricing() {
  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">Pricing</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-14">
          One plan. Everything included.
        </h2>

        <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-8 sm:p-10 mb-10">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl sm:text-6xl font-bold text-[#111827] tracking-tight">$549</span>
            <span className="text-lg text-[#9CA3AF]">/ month</span>
          </div>
          <p className="text-sm text-[#9CA3AF] mb-8">Cancel anytime. No contracts.</p>

          <div className="space-y-3 mb-8">
            {[
              "Unlimited builds (one active request at a time)",
              "Strategy included",
              "Full design and development",
              "Unlimited revisions per build",
              "Cancel anytime",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#2563EB] mt-0.5">→</span>
                <span className="text-[#4B5563] text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/subscribe"
              className="flex-1 text-center px-6 py-3 bg-[#2563EB] text-white text-sm font-medium rounded-md hover:bg-[#1D4ED8] transition-colors shadow-sm"
            >
              Start for $549
            </Link>
            <Link
              href="/zizi/book"
              className="flex-1 text-center px-6 py-3 bg-white text-[#111827] text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Book a Strategy Call First
            </Link>
          </div>
        </div>

        <p className="text-[#6B7280] text-base leading-relaxed text-center">
          No contracts. No hidden fees. No per-project quotes. Just a simple
          monthly partnership that pays for itself the first time it books you a
          call.
        </p>
      </div>
    </section>
  );
}
