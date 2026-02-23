"use client";

import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Calculator, TrendingUp, FileText } from "lucide-react";

const examples = [
  {
    icon: FileText,
    title: "Leadership Gap Assessment",
    description: "A leadership coach builds a 'Leadership Gap Assessment' — Directors and VPs find out where their blind spots are. They book a call to understand how to fix it.",
  },
  {
    icon: Calculator,
    title: "Cash Flow Clarity Calculator",
    description: "A fractional CFO builds a 'Cash Flow Clarity Calculator' — founders upload their numbers and see where money is leaking. They hire her to fix it.",
  },
  {
    icon: TrendingUp,
    title: "Ad Audit Scorecard",
    description: "A marketing consultant builds an 'Ad Audit Scorecard' — ecom brands diagnose why their ads aren't converting. He closes them on a done-for-you engagement.",
  },
];

export default function WhatYouCouldBuild() {
  return (
    <section id="what-you-could-build" className="py-20 md:py-32 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            What You Could Build
          </h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {examples.map((example, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <div className="bg-[#fafafa] border border-gray-300 rounded-2xl p-8 hover:border-black transition-colors">
                <example.icon className="w-12 h-12 text-black mb-4" />
                <h3 className="text-xl font-bold text-black mb-3">
                  {example.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {example.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <p className="text-center text-xl font-semibold text-black mt-12">
            The tool is the handshake. Your offer is the relationship.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
