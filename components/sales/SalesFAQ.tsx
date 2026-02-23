"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How fast will I receive my first tool?",
    answer:
      "Most requests are delivered in 48-72 hours. Complex builds may take 4-5 days. We'll always give you a timeline upfront.",
  },
  {
    question: "What if I don't like what you build?",
    answer:
      "Unlimited revisions are included in every plan. We iterate until you're thrilled. No extra cost.",
  },
  {
    question: "How does the request queue work?",
    answer:
      "Add as many requests as you want. We work through them based on your plan's active request limit. Finish one, start the next.",
  },
  {
    question: "Can I pause my subscription?",
    answer:
      "Yes. Pause anytime and keep your remaining days. Unpause when you're ready.",
  },
  {
    question: "What do I actually own?",
    answer:
      "Everything. Code, designs, content — it's all yours. We can host it or hand over the files.",
  },
  {
    question: "Do you integrate with our CRM?",
    answer:
      "Yes. We build tools that integrate with HubSpot, Salesforce, Pipedrive, Zapier, and more.",
  },
  {
    question: "Who actually builds this stuff?",
    answer:
      "We're a small team of AI-native builders who use Cursor, Claude, and modern AI tools to ship fast without sacrificing quality.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-[var(--color-border)] hover:border-emerald-500/20 rounded-xl overflow-hidden transition-all duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
      >
        <span className="text-white font-medium pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? "text-emerald-400" : "text-[var(--color-text-muted)]"}`} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 bg-[var(--color-bg-secondary)]">
              <div className="pt-2 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SalesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Questions? Answers.
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


