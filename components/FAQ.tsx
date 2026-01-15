"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does unlimited requests work?",
    answer:
      "You can submit as many requests as you want. We work on them one at a time (or two in parallel for complex builds), completing each before moving to the next. Most requests are completed in 3-7 days. There's no limit to how many systems we'll build for you.",
  },
  {
    question: "What's your typical turnaround time?",
    answer:
      "Most AI systems ship within 3-7 days. Simple automations might be done in 48 hours. Complex integrations might take 2 weeks. We'll always give you a clear timeline upfront.",
  },
  {
    question: "What if I don't like what you build?",
    answer:
      "We iterate until you're happy. Unlimited revisions are included. We don't consider a project done until it's working exactly how you need it.",
  },
  {
    question: "What tools and platforms do you work with?",
    answer:
      "We're tool-agnostic. Common integrations include: Slack, HubSpot, Salesforce, Notion, Airtable, Google Workspace, Zapier, Make, n8n, custom APIs, OpenAI, Anthropic, and more. If you use it, we can probably connect to it.",
  },
  {
    question: "Do you replace our existing tools?",
    answer:
      "No — we enhance them. We build AI layers on top of what you already use. No migrations, no retraining your team. Your workflow stays familiar; it just gets smarter.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "A small, senior team. No outsourcing, no junior developers learning on your dime. Every system is built by experienced engineers who understand both AI and business operations.",
  },
  {
    question: "What happens if something breaks?",
    answer:
      "We fix it. Maintenance is included in your subscription. We monitor your systems, update them when APIs change, and respond quickly when issues arise. No extra charges.",
  },
  {
    question: "Can I pause my subscription?",
    answer:
      "Yes. If you need to slow down, you can pause billing. Your systems keep running, and we'll handle critical maintenance. When you're ready to build again, just unpause.",
  },
  {
    question: "Is there a contract or minimum commitment?",
    answer:
      "No contracts. Month-to-month. We earn your business every month. You can cancel anytime with no penalties.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-medium text-white pr-8 group-hover:text-[var(--color-primary)] transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-primary)]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--color-text-secondary)] leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-[var(--color-bg-primary)]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full text-sm font-medium text-[var(--color-accent)] mb-6">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Questions? Answers.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)] p-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[var(--color-text-secondary)] mt-10"
        >
          Still have questions?{" "}
          <a
            href="mailto:hello@zizi.so"
            className="text-[var(--color-primary)] hover:underline"
          >
            Email us
          </a>
        </motion.p>
      </div>
    </section>
  );
}
