"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll } from "../partner/AnimateOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What counts as one request?",
    answer: "One tool at a time. Once it's built and you're happy, you submit the next one. There's no limit to how many tools we build for you over time — we just focus on one at a time so the work is done properly.",
  },
  {
    question: "How long does each build take?",
    answer: "Most tools are live within 2–3 weeks depending on complexity. Simpler builds (scorecards, assessments) can be faster.",
  },
  {
    question: "What kind of tools can you build?",
    answer: "Assessments, scorecards, calculators, audits, diagnostics, quizzes, ROI tools, and more. If it helps your ideal client understand their problem and naturally leads to your offer, we can build it.",
  },
  {
    question: "Do I need to know what I want built?",
    answer: "No. The strategy session is exactly for this. We'll figure out what makes the most sense for your offer and audience.",
  },
  {
    question: "What if I want to make changes after it's live?",
    answer: "Included. Revisions, tweaks, copy changes — all part of the retainer. We want it to convert, which means we iterate until it does.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No lock-in, no cancellation fees. We'd rather earn your business every month than trap you into a contract.",
  },
];

export default function LeadGenFAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-[var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Common Questions
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-[var(--color-border)]"
              >
                <AccordionTrigger className="text-left text-white hover:text-[var(--color-primary)]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--color-text-secondary)] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

