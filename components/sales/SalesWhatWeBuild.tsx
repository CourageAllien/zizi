"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Eye, Monitor, ClipboardCheck, FileText, 
  BarChart3, Magnet, BookOpen, Users,
  ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";

const categories = [
  {
    id: "preview",
    label: "Preview Tools",
    icon: Eye,
    tagline: "Let prospects analyze fit, calculate ROI, and compare options — all in one experience.",
    examples: [
      '"See How We Fit Your Business" analyzers',
      "ROI and savings calculators",
      "Industry benchmark comparisons",
      "Cost comparison tools",
      "Payback period projectors",
      '"You vs. Best Practices" tools',
    ],
    whyItWorks: 'Prospects stop asking "is it worth it?" when they analyze the answer themselves. One tool answers the CFO\'s ROI question AND the VP\'s "how do we compare?" question.',
  },
  {
    id: "demos",
    label: "Interactive Demos",
    icon: Monitor,
    tagline: "Let them experience it before the call.",
    examples: [
      "Self-guided product tours",
      "Sandbox environments",
      '"Try before you buy" experiences',
      "Interactive feature showcases",
      "Simulation tools",
    ],
    whyItWorks: "Prospects who play with your product close 3x faster than those who just watch a demo.",
  },
  {
    id: "assessments",
    label: "Assessments",
    icon: ClipboardCheck,
    tagline: "Position yourself as the expert.",
    examples: [
      'Maturity assessments ("How advanced is your sales process?")',
      'Readiness quizzes ("Are you ready for [solution]?")',
      "Diagnostic tools",
      "Benchmarking assessments",
      "Gap analysis tools",
    ],
    whyItWorks: "Prospects self-qualify AND you capture exactly what they need before the first call.",
  },
  {
    id: "proposals",
    label: "Proposals",
    icon: FileText,
    tagline: "Close faster with instant, custom proposals.",
    examples: [
      "AI-powered proposal builders",
      "Dynamic pricing configurators",
      "Custom quote generators",
      "SOW generators",
      "Package recommendation tools",
    ],
    whyItWorks: "The sales team that sends the proposal first usually wins.",
  },
  {
    id: "benchmarks",
    label: "Benchmarks",
    icon: BarChart3,
    tagline: "Create urgency with data.",
    examples: [
      "Industry benchmark tools",
      "Competitor comparison pages",
      '"How do you stack up?" assessments',
      "Performance gap analyzers",
      "Market positioning tools",
    ],
    whyItWorks: "Nothing motivates action like seeing you're behind your peers.",
  },
  {
    id: "magnets",
    label: "Lead Magnets",
    icon: Magnet,
    tagline: "Top-of-funnel fuel that actually works.",
    examples: [
      "Interactive templates",
      "Personalized playbooks",
      "Dynamic checklists",
      "Resource libraries",
      "Assessment-gated content",
    ],
    whyItWorks: "Generic PDFs get ignored. Interactive tools get used — and shared.",
  },
  {
    id: "enablement",
    label: "Enablement",
    icon: BookOpen,
    tagline: "Arm your reps with weapons.",
    examples: [
      "Objection handler tools",
      "Competitive battlecards",
      "Discovery question generators",
      "Email sequence builders",
      "Call script assistants",
    ],
    whyItWorks: "Your worst rep performs like your best when they have the right tools.",
  },
  {
    id: "portals",
    label: "Client Portals",
    icon: Users,
    tagline: "From closed-won to activated.",
    examples: [
      "Customer onboarding flows",
      "Self-service portals",
      "Progress trackers",
      "Resource hubs",
      "Check-in schedulers",
    ],
    whyItWorks: "Fast onboarding = lower churn = higher LTV.",
  },
];

export default function SalesWhatWeBuild() {
  const [activeTab, setActiveTab] = useState("preview");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeCategory = categories.find((c) => c.id === activeTab)!;
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);

  return (
    <section id="what-we-build" className="py-24 md:py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            Our Toolkit
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            What We Build
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
            Every tool designed for one purpose: <span className="text-white font-medium">helping you close more deals.</span>
          </p>
          <p className="text-sm text-[var(--color-text-muted)] max-w-3xl mx-auto">
            These are just examples of what we build — not the limit. If it helps you sell, we&apos;ll build it. 
            Custom tools, niche use cases, weird ideas? Bring them. We&apos;re tool-agnostic and build whatever your sales process needs.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {visibleCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:text-white border border-[var(--color-border)] hover:border-emerald-500/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
          
          {categories.length > 6 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {showAllCategories ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show All Categories <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Active Category Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl p-8">
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-white font-medium text-center mb-8">
              {activeCategory.tagline}
            </p>

            {/* Examples Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {activeCategory.examples.map((example, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-[var(--color-text-secondary)] text-sm">{example}</span>
                </div>
              ))}
            </div>

            {/* Why it works */}
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <p className="text-sm text-emerald-400 font-medium uppercase tracking-wider mb-2">
                Why it works
              </p>
              <p className="text-white leading-relaxed">
                {activeCategory.whyItWorks}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              Don&apos;t See What You Need?
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
              We build whatever helps you sell. The categories above are just starting points. 
              Need something custom? Something weird? Something your competitor definitely doesn&apos;t have?
            </p>
            <p className="text-white font-medium mb-6">
              Tell us the problem. We&apos;ll build the solution.
            </p>
            <a
              href="#free-tool"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Request Anything
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


