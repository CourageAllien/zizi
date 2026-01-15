"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "revenue",
    name: "Revenue",
    icon: "💰",
    items: [
      {
        pain: '"Our sales team spends hours researching prospects"',
        solution: "AI Lead Research Agent",
        description:
          "Automatically enriches every new lead with company data, recent news, tech stack, and personalized talking points.",
      },
      {
        pain: '"We forget to follow up and deals go cold"',
        solution: "Smart Follow-up System",
        description:
          "AI monitors your pipeline and drafts perfectly-timed follow-ups based on prospect behavior and deal stage.",
      },
      {
        pain: '"Our proposals take days to put together"',
        solution: "Proposal Generator",
        description:
          "Turn a 30-minute call into a polished proposal. AI pulls from your calls, templates, and pricing to draft in minutes.",
      },
    ],
  },
  {
    id: "ops",
    name: "Operations",
    icon: "⚙️",
    items: [
      {
        pain: '"We waste hours on manual data entry"',
        solution: "Automated Data Processing",
        description:
          "Extract data from emails, forms, and documents. Auto-populate your CRM, spreadsheets, and databases.",
      },
      {
        pain: '"Our reports take forever to compile"',
        solution: "AI Report Generator",
        description:
          "Connect your data sources. Get beautiful, accurate reports generated automatically — daily, weekly, or on-demand.",
      },
      {
        pain: '"Too many apps, nothing talks to each other"',
        solution: "Integration Hub",
        description:
          "We connect your tools so data flows automatically. No more copy-paste between systems.",
      },
    ],
  },
  {
    id: "people",
    name: "People",
    icon: "👥",
    items: [
      {
        pain: '"Onboarding new hires is chaos"',
        solution: "AI Onboarding Assistant",
        description:
          "New employees get a personal AI guide that answers questions, schedules meetings, and walks them through your processes.",
      },
      {
        pain: '"Our team can\'t find information"',
        solution: "Internal Knowledge Bot",
        description:
          "Train an AI on your docs, Notion, Slack history. Your team gets instant answers without hunting through folders.",
      },
      {
        pain: '"Scheduling is a nightmare"',
        solution: "Smart Scheduling",
        description:
          "AI coordinates across calendars, time zones, and preferences. No more 10-email chains to book a meeting.",
      },
    ],
  },
  {
    id: "customer",
    name: "Customer",
    icon: "💬",
    items: [
      {
        pain: '"Support tickets pile up"',
        solution: "AI Support Triage",
        description:
          "Automatically categorize, prioritize, and draft responses. Your team handles complex issues; AI handles the rest.",
      },
      {
        pain: '"Customers ask the same questions repeatedly"',
        solution: "Smart FAQ Bot",
        description:
          "AI chatbot trained on your product that actually understands context and gives helpful answers.",
      },
      {
        pain: '"We\'re reactive, not proactive with customers"',
        solution: "Customer Health Monitor",
        description:
          "AI analyzes usage patterns and flags at-risk accounts before they churn. Suggests intervention strategies.",
      },
    ],
  },
  {
    id: "founders",
    name: "Founders",
    icon: "🚀",
    items: [
      {
        pain: '"I want to test this feature before we build it fully"',
        solution: "Rapid Prototyping",
        description:
          "We build working prototypes in days so you can test with real users before committing engineering resources to the full build.",
      },
      {
        pain: '"I need to validate this idea before investing more"',
        solution: "Feature Validation",
        description:
          "Get a functional MVP of your feature idea. Test it, get feedback, iterate — all before your dev team writes a single line of code.",
      },
      {
        pain: '"Board prep takes forever"',
        solution: "Board Deck Generator",
        description:
          "AI pulls from your tools to draft slides, charts, and talking points. You refine; we compile.",
      },
    ],
  },
];

export default function WhatWeBuild() {
  const [activeCategory, setActiveCategory] = useState("revenue");

  const activeItems =
    categories.find((c) => c.id === activeCategory)?.items || [];

  return (
    <section id="what-we-build" className="py-24 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full text-sm font-medium text-[var(--color-accent)] mb-6">
            What We Build
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            AI systems for every part
            <br />
            <span className="text-[var(--color-text-muted)]">of your business</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            These are real examples of what we build for clients. Each one
            started as a simple request.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                  : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/30"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {activeItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[var(--color-bg-tertiary)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all card-hover"
              >
                <p className="text-[var(--color-text-muted)] text-sm italic mb-5">
                  {item.pain}
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">{item.solution}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[var(--color-text-secondary)] mt-12"
        >
          Don&apos;t see what you need?{" "}
          <a href="#pricing" className="text-[var(--color-primary)] hover:underline">
            Tell us your problem
          </a>{" "}
          — we&apos;ll build it.
        </motion.p>
      </div>
    </section>
  );
}
