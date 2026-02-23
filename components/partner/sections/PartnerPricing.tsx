"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const trialFeatures = [
  "1 custom AI-powered tool or asset",
  "Your choice: calculator, demo, landing page, etc.",
  "Delivered in 5-7 days",
  "2 rounds of revisions",
  "You own everything",
];

const partnershipFeatures = [
  "Unlimited build requests",
  "1-2 active builds at a time",
  "48-72 hour turnaround",
  "Continuous optimization & A/B testing",
  "Weekly strategy calls",
  "Dedicated Slack channel",
  "Monthly performance reports",
  "Unlimited revisions",
  "Pause or cancel anytime",
];

const faqs = [
  {
    question: "What if I just need one tool?",
    answer:
      "The trial build is perfect. Get your tool, no strings attached.",
  },
  {
    question: "Can I upgrade from trial to partnership?",
    answer:
      "Absolutely. Most clients do. We'll apply learnings from your trial to the partnership.",
  },
  {
    question: "What counts as a 'build'?",
    answer:
      "One tool, one landing page, one asset. Complex systems may count as multiple builds — we'll always be upfront.",
  },
];

export default function PartnerPricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
              Start with a trial. Upgrade when you're ready.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Trial Card */}
          <AnimateOnScroll delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#141414] border border-[#262626] rounded-2xl p-8 h-full flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Trial Build
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$750</span>
                  <span className="text-[#737373]">one-time</span>
                </div>
                <p className="text-[#a1a1a1] mt-3">
                  Test us out with a single build
                </p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  {trialFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <span className="text-[#a1a1a1]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-[#737373] mb-6">
                  <span className="text-white font-medium">Best for:</span>{" "}
                  Teams who want to see quality before committing
                </p>
              </div>

              <a
                href="#trial-form"
                className="block w-full py-3 text-center font-semibold text-[#22c55e] border border-[#22c55e]/30 rounded-xl hover:bg-[#22c55e]/10 transition-all duration-200"
              >
                Start Trial Build
              </a>

              <p className="text-center text-xs text-[#737373] mt-4">
                No commitment. Love it? We'll talk partnership.
              </p>
            </motion.div>
          </AnimateOnScroll>

          {/* Partnership Card */}
          <AnimateOnScroll delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative bg-gradient-to-b from-[#141414] to-[#0d1a0d] border border-[#22c55e]/30 rounded-2xl p-8 h-full flex flex-col overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#22c55e]/10 rounded-full blur-[60px]" />

              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#22c55e] rounded-full text-xs font-semibold text-white">
                  <Star className="w-3 h-3" />
                  Most Value
                </span>
              </div>

              <div className="mb-6 relative">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Partnership
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$2,500</span>
                  <span className="text-[#737373]">/month</span>
                </div>
                <p className="text-[#a1a1a1] mt-3">
                  Your ongoing sales asset team
                </p>
              </div>

              <div className="flex-grow relative">
                <ul className="space-y-3 mb-8">
                  {partnershipFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                      <span className="text-[#a1a1a1]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-[#737373] mb-6">
                  <span className="text-white font-medium">Best for:</span>{" "}
                  Teams with ongoing campaigns and launches
                </p>
              </div>

              <a
                href="/partner/book"
                className="group flex items-center justify-center gap-2 w-full py-3 text-center font-semibold text-white bg-[#22c55e] rounded-xl hover:bg-[#16a34a] transition-all duration-200"
              >
                Book a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-center text-xs text-[#737373] mt-4">
                Let's discuss how we can help your team.
              </p>
            </motion.div>
          </AnimateOnScroll>
        </div>

        {/* FAQ Quick Questions */}
        <AnimateOnScroll delay={0.3}>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#141414] border border-[#262626] rounded-xl p-5"
              >
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-[#a1a1a1] text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

