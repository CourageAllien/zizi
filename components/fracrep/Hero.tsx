"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white">
      {/* Hero content */}
      <div className="pt-16 pb-8 text-center px-6 sm:px-10">
        {/* Announcement bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-[#111827]" />
          <span className="text-xs tracking-[0.15em] uppercase text-[#6B7280] font-medium">
            Now accepting new clients
          </span>
          <span className="text-xs text-[#6B7280]">—</span>
          <Link href="/zizi/book" className="text-xs tracking-[0.15em] uppercase text-[#2563EB] font-medium hover:underline">
            Book a Call
          </Link>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-bold text-[#111827] leading-[1.1] tracking-tight max-w-4xl mx-auto mb-6">
          Your Next Client Is Already Looking for a Reason to Trust You.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> Give Them One.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
          We build done-for-you lead gen tools that attract your ideal clients,
          prove your expertise, and sell your high-ticket offer — before you ever
          get on a call.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
          <Link
            href="/zizi/book"
            className="px-6 py-3 bg-[#2563EB] text-white text-sm font-medium rounded-md hover:bg-[#1D4ED8] transition-colors shadow-sm"
          >
            Book a Strategy Call
          </Link>
          <Link
            href="/subscribe"
            className="px-6 py-3 bg-white text-[#111827] text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Start for $549
          </Link>
        </div>
      </div>

      {/* Dotted grid + Product mockup area */}
      <div className="relative overflow-hidden">
        {/* Dotted grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Product mockup */}
        <div className="relative z-10 px-6 sm:px-10 pt-8 pb-0">
          <div className="max-w-4xl mx-auto">
            <div
              className="bg-white rounded-t-xl border border-gray-200 shadow-2xl overflow-hidden"
              style={{ transform: "perspective(1200px) rotateX(2deg) rotateY(-1deg)", transformOrigin: "center bottom" }}
            >
              {/* Mockup top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/80">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border border-gray-200 rounded-md px-4 py-1 text-xs text-[#9CA3AF] w-64 text-center">
                    zizico.app/your-tool
                  </div>
                </div>
              </div>

              {/* Mockup content */}
              <div className="p-6 sm:p-8 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Z</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111827]">Leadership Gap Assessment</div>
                    <div className="text-xs text-[#9CA3AF]">Built for coaching clients</div>
                  </div>
                </div>

                {/* Fake dashboard cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs text-[#9CA3AF] mb-1">Leads Captured</div>
                    <div className="text-lg font-bold text-[#111827]">247</div>
                    <div className="text-xs text-[#22C55E]">↑ 34%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs text-[#9CA3AF] mb-1">Completion Rate</div>
                    <div className="text-lg font-bold text-[#111827]">78%</div>
                    <div className="text-xs text-[#22C55E]">↑ 12%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs text-[#9CA3AF] mb-1">Calls Booked</div>
                    <div className="text-lg font-bold text-[#111827]">52</div>
                    <div className="text-xs text-[#22C55E]">↑ 28%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs text-[#9CA3AF] mb-1">Revenue</div>
                    <div className="text-lg font-bold text-[#111827]">$41k</div>
                    <div className="text-xs text-[#22C55E]">↑ 19%</div>
                  </div>
                </div>

                {/* Fake question preview */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-3">Assessment Preview</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-[#2563EB] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="text-sm text-[#374151]">How would you rate your team's communication?</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-gray-200" />
                      <div className="text-sm text-[#374151]">Do you have a formal feedback process?</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-gray-200" />
                      <div className="text-sm text-[#374151]">How often do you conduct 1-on-1 meetings?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust logos bar */}
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-gray-200">
          {["Bizal", "Zortcloud", "Bulletproof Mgmt", "GDnD Consultants", "Kevs Kitchen"].map(
            (company) => (
              <div
                key={company}
                className="flex items-center justify-center py-5 px-4"
              >
                <span className="text-sm font-semibold text-[#9CA3AF] tracking-wide">
                  {company}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
