"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimateOnScroll from "../AnimateOnScroll";

const faqs = [
  {
    question: "How does the trial work?",
    answer:
      "Tell us what you need — a calculator, demo, landing page, whatever. We build it in 5-7 days. You pay $750. If you love it, we can talk about an ongoing partnership. If not, no hard feelings — you keep the tool.",
  },
  {
    question: "What's included in the $2,500/month partnership?",
    answer:
      "Unlimited build requests (we work on 1-2 at a time), 48-72 hour turnaround, weekly strategy calls, dedicated Slack channel, ongoing optimization, and monthly reporting. Think of it as having a sales asset team on retainer.",
  },
  {
    question: "How fast do you deliver?",
    answer:
      "Trial builds: 5-7 days. Partnership builds: 48-72 hours on average. Complex tools may take longer — we'll always give you a timeline upfront.",
  },
  {
    question: "What if I need something urgently?",
    answer:
      "Partners get priority. If something's truly urgent, let us know and we'll do our best to expedite.",
  },
  {
    question: "What can you build?",
    answer:
      "Anything that helps your sales and marketing convert. Calculators, interactive demos, assessments, landing pages, proposal generators, lead magnets, client portals. If it helps you sell, we build it.",
  },
  {
    question: "Do I own what you build?",
    answer:
      "100%. Code, designs, assets — it's all yours. We can host it for you, or hand over the files. No lock-in, ever.",
  },
  {
    question: "Can I pause or cancel the partnership?",
    answer:
      "Yes. Pause anytime and keep your remaining days. Cancel anytime — no contracts, no penalties.",
  },
  {
    question: "Who actually builds this stuff?",
    answer:
      "We're a small team of AI-native builders. We use tools like Cursor and Claude to build fast without sacrificing quality. You get senior-level output at startup speed.",
  },
  {
    question: "What if I don't like what you build?",
    answer:
      "Unlimited revisions until you love it. We don't ship until you're happy.",
  },
  {
    question: "How is this different from hiring a developer or agency?",
    answer:
      "Developers are slow and expensive. Agencies charge $20K+ per project and disappear. We're fast, predictable, and always here — month after month.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#262626] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-white font-medium group-hover:text-[#22c55e] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#737373] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#22c55e]" : ""
          }`}
        />
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
            <p className="pb-5 text-[#a1a1a1] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PartnerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions & Answers
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
