"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We were spending hours building one-off sales tools in Google Sheets. Now we just submit a request and it's done in 2 days. Game changer for our small team.",
    name: "Sarah M.",
    role: "Founder",
    company: "SaaS Startup",
  },
  {
    quote: "The ROI calculator alone paid for 6 months of the subscription in the first week. Prospects finally get why we're worth it.",
    name: "James K.",
    role: "Head of Sales",
    company: "B2B Platform",
  },
  {
    quote: "I was skeptical about the 48-hour turnaround. Then they delivered an interactive demo in 36 hours that was better than what our dev team quoted 6 weeks for.",
    name: "Michael R.",
    role: "VP Sales",
    company: "Enterprise Software",
  },
  {
    quote: "We've tried design agencies, dev shops, no-code tools. Nothing comes close to the speed and quality here. This is how sales enablement should work.",
    name: "Lisa T.",
    role: "RevOps Lead",
    company: "Growth Agency",
  },
];

export default function SalesTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-[200px] -z-10" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What Sales Teams Are Saying
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-emerald-500/30 rounded-2xl transition-all duration-300">
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 text-emerald-400" />
                </div>

                {/* Quote Text */}
                <p className="text-white text-lg leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
