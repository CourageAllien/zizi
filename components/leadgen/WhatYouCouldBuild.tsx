"use client";

import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Calculator, TrendingUp, FileText, BarChart3, Users, Zap, Target, Brain } from "lucide-react";

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
  {
    icon: BarChart3,
    title: "ROI Forecasting Dashboard",
    description: "A SaaS consultant builds an interactive dashboard where prospects input their current metrics and see projected ROI from implementing their system. Prospects visualize the impact before the sales call.",
  },
  {
    icon: Users,
    title: "Team Performance Diagnostic Platform",
    description: "An HR consultant builds a comprehensive platform that analyzes team dynamics, identifies bottlenecks, and generates custom reports. Companies use it to audit their teams before hiring for transformation.",
  },
  {
    icon: Zap,
    title: "Automated Workflow Builder",
    description: "An operations consultant creates an interactive tool that maps out a company's current processes, identifies inefficiencies, and suggests optimized workflows. Prospects see their transformation roadmap instantly.",
  },
  {
    icon: Target,
    title: "Market Positioning Analyzer",
    description: "A brand strategist builds a tool that analyzes a company's messaging, compares it to competitors, and generates a positioning strategy report. Founders use it to understand their market position before hiring for rebranding.",
  },
  {
    icon: Brain,
    title: "Customer Journey Mapping Tool",
    description: "A conversion optimization expert creates an interactive journey mapper where businesses input their funnel data and get a visual breakdown of drop-off points, friction areas, and optimization opportunities with specific recommendations.",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {examples.map((example, index) => (
            <AnimateOnScroll key={index} delay={index * 0.05}>
              <div className="bg-[#fafafa] border border-gray-300 rounded-2xl p-6 hover:border-black transition-colors h-full flex flex-col">
                <example.icon className="w-10 h-10 text-black mb-4" />
                <h3 className="text-lg font-bold text-black mb-3">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                  {example.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.4}>
          <p className="text-center text-xl font-semibold text-black mt-12">
            The tool is the handshake. Your offer is the relationship.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
