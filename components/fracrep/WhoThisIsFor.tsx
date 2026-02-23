"use client";

export default function WhoThisIsFor() {
  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">Who This Is For</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-14">
          This works best if you are:
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* For you */}
          <div>
            <p className="text-sm font-semibold text-[#111827] uppercase tracking-wider mb-5">
              This is for you if:
            </p>
            <ul className="space-y-4">
              {[
                "You have a proven high-ticket offer ($5k+)",
                "You're tired of inconsistent, referral-dependent lead gen",
                "You want to be seen as the authority in your space",
                "You're ready to let a tool do the heavy lifting for you",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[#4B5563] text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for you */}
          <div>
            <p className="text-sm font-semibold text-[#111827] uppercase tracking-wider mb-5">
              This is NOT for you if:
            </p>
            <ul className="space-y-4">
              {[
                "You don't have a clear offer yet",
                "You're looking for a quick fix with no follow-through",
                "You want to stay anonymous — these tools put your thinking out in the world",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-[#DC2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#4B5563] text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
