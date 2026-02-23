"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What counts as one request?",
    answer:
      "One tool at a time. Once it's built and you're happy, you submit the next one. There's no limit to how many tools we build for you over time — we just focus on one at a time so the work is done properly.",
  },
  {
    question: "How long does each build take?",
    answer:
      "Most tools are live within 2–3 weeks depending on complexity. Simpler builds (scorecards, assessments) can be faster.",
  },
  {
    question: "What kind of tools can you build?",
    answer:
      "Assessments, scorecards, calculators, audits, diagnostics, quizzes, ROI tools, and more. If it helps your ideal client understand their problem and naturally leads to your offer, we can build it.",
  },
  {
    question: "Do I need to know what I want built?",
    answer:
      "No. The strategy session is exactly for this. We'll figure out what makes the most sense for your offer and audience.",
  },
  {
    question: "What if I want to make changes after it's live?",
    answer:
      "Included. Revisions, tweaks, copy changes — all part of the retainer. We want it to convert, which means we iterate until it does.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. No lock-in, no cancellation fees. We'd rather earn your business every month than trap you into a contract.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white border-t border-gray-200 py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <p className="text-xs tracking-[0.15em] uppercase text-[#9CA3AF] font-medium mb-4">FAQ</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#111827] leading-[1.15] tracking-tight mb-12">
          Common Questions
        </h2>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left py-5 group"
              >
                <span className="text-base font-medium text-[#111827] pr-8 group-hover:text-[#2563EB] transition-colors">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <svg
                    className={`w-3 h-3 text-[#6B7280] transition-transform duration-200 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-5">
                  <p className="text-[#6B7280] text-base leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
