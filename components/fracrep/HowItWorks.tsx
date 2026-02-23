"use client";

const steps = [
  {
    num: "1",
    title: "Strategy Session",
    desc: "We start with a 60-minute call to understand your offer, your ideal client, and the moment they need to experience before they hire you. We figure out exactly what to build.",
  },
  {
    num: "2",
    title: "We Build It",
    desc: "You get a fully functional, branded tool — assessment, calculator, audit, scorecard, diagnostic — built to reflect your methodology and positioned around your offer. Typically live within 2–3 weeks.",
  },
  {
    num: "3",
    title: "You Deploy It",
    desc: "Share it on LinkedIn. Add it to your website. Send it to cold prospects. Use it as a conversation starter. We show you how to get it in front of the right people.",
  },
  {
    num: "4",
    title: "We Iterate",
    desc: "Once it's live, we watch what's working and refine. When you're ready, we build the next one. You stay one request at a time — we stay focused on what moves the needle for you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">How It Works</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-14">
          Simple. Clean. No surprises.
        </h2>

        <div className="space-y-10">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F3F4F6] border border-gray-200 flex items-center justify-center">
                <span className="text-sm font-bold text-[#111827]">{step.num}</span>
              </div>
              <div className="pt-1.5">
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  Step {step.num} — {step.title}
                </h3>
                <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
