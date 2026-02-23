"use client";

export default function WhatWeDo() {
  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">What We Do</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-10">
          A dedicated tool-building partner for high-ticket businesses.
        </h2>
        <div className="space-y-5 text-[#4B5563] text-base sm:text-lg leading-relaxed mb-10">
          <p>
            You tell us what you need.
            <br />
            We build it.
            <br />
            You give it away.
            <br />
            It brings in leads.
          </p>
        </div>

        <p className="text-sm font-semibold text-[#111827] uppercase tracking-wider mb-5">
          Every month, you get:
        </p>
        <div className="space-y-4">
          {[
            "Unlimited tool builds (one active request at a time)",
            "Strategy included — we figure out what to build and why",
            "Full design and development handled for you",
            "Conversion-focused — every tool is built to move people toward your paid offer",
            "Iterations and refinements as you learn what works",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#2563EB] mt-0.5 font-medium">→</span>
              <span className="text-[#4B5563] text-base sm:text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
