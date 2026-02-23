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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight">
          Common Questions
        </h2>
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left py-5 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
              >
                <span className="text-lg sm:text-xl font-medium text-gray-900 pr-8">
                  {faq.question}
                </span>
                <span className="text-2xl text-gray-400 flex-shrink-0 font-light">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-5 px-2">
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
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

