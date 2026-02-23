"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  PlayCircle,
  ClipboardList,
  FileText,
  Layout,
  Magnet,
  BarChart2,
  Users,
} from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const tools = [
  {
    icon: Calculator,
    title: "Preview Tools & Calculators",
    description:
      "Let prospects calculate ROI, see savings, compare options. Capture leads while delivering value.",
    tag: "Lead Capture",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    icon: PlayCircle,
    title: "Interactive Demos",
    description:
      "Let prospects experience your product before a sales call. Shorten cycles, increase close rates.",
    tag: "Conversion",
    tagColor: "bg-green-500/20 text-green-400",
  },
  {
    icon: ClipboardList,
    title: "Assessments & Quizzes",
    description:
      "Qualify leads automatically. Score prospects. Surface pain points before you ever talk.",
    tag: "Lead Qualification",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
  {
    icon: FileText,
    title: "Proposal Generators",
    description:
      "Turn intake forms into branded proposals in minutes, not hours. Close faster.",
    tag: "Sales Enablement",
    tagColor: "bg-orange-500/20 text-orange-400",
  },
  {
    icon: Layout,
    title: "Campaign Landing Pages",
    description:
      "High-converting pages for every launch. Product releases, webinars, promos.",
    tag: "Campaigns",
    tagColor: "bg-pink-500/20 text-pink-400",
  },
  {
    icon: Magnet,
    title: "Lead Magnets",
    description:
      "Interactive templates, tools, and resources that capture emails and build your list.",
    tag: "Top of Funnel",
    tagColor: "bg-cyan-500/20 text-cyan-400",
  },
  {
    icon: BarChart2,
    title: "Benchmark Tools",
    description:
      "Show prospects how they compare to industry standards. Create urgency.",
    tag: "Conversion",
    tagColor: "bg-green-500/20 text-green-400",
  },
  {
    icon: Users,
    title: "Client Portals",
    description:
      "Onboarding flows, self-service dashboards, customer tools.",
    tag: "Post-Sale",
    tagColor: "bg-yellow-500/20 text-yellow-400",
  },
];

export default function PartnerWhatWeBuild() {
  return (
    <section id="what-we-build" className="py-24 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Build
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              AI-powered assets for every stage of your sales and marketing
              funnel.
            </p>
          </div>
          <p className="text-center text-sm text-[#737373] mb-16">
            These are examples. If it helps you sell, we build it.
          </p>
        </AnimateOnScroll>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool, index) => (
            <AnimateOnScroll key={index} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="h-full bg-[#141414] border border-[#262626] rounded-xl p-5 group hover:border-[#22c55e]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center group-hover:bg-[#22c55e]/20 transition-colors">
                    <tool.icon className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${tool.tagColor}`}
                  >
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-[#a1a1a1] leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-[#a1a1a1] mb-4">Don't see what you need?</p>
            <a
              href="#trial-form"
              className="inline-flex items-center gap-2 px-6 py-3 text-[#22c55e] border border-[#22c55e]/30 rounded-lg hover:bg-[#22c55e]/10 transition-all duration-200"
            >
              Tell Us Your Idea
              <span className="text-lg">→</span>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

