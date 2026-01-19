"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, Phone } from "lucide-react";

// Stripe payment links - replace with your actual Stripe links
const STRIPE_LINKS = {
  starter: "https://buy.stripe.com/your-starter-link",
  growth: "https://buy.stripe.com/your-growth-link",
  scale: "https://buy.stripe.com/your-scale-link",
};

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "/month",
    description: "Best for solo founders and early-stage sales teams",
    features: [
      "1 active request at a time",
      "48-72 hour turnaround",
      "Unlimited revisions",
      "Hosting included",
      "Pause or cancel anytime",
    ],
    cta: "Subscribe",
    stripeLink: STRIPE_LINKS.starter,
    popular: false,
  },
  {
    name: "Growth",
    price: "$5,000",
    period: "/month",
    description: "Best for growing sales teams and RevOps",
    features: [
      "2 active requests at a time",
      "24-48 hour turnaround",
      "Priority queue",
      "Analytics included",
      "White-label option",
      "Dedicated Slack channel",
      "Pause or cancel anytime",
    ],
    cta: "Subscribe",
    stripeLink: STRIPE_LINKS.growth,
    popular: true,
  },
  {
    name: "Scale",
    price: "$10,000",
    period: "/month",
    description: "Best for agencies and enterprise teams",
    features: [
      "4 active requests at a time",
      "Same-day starts",
      "Dedicated builder",
      "Custom integrations",
      "Quarterly strategy calls",
      "Pause or cancel anytime",
    ],
    cta: "Subscribe",
    stripeLink: STRIPE_LINKS.scale,
    popular: false,
  },
];

export default function SalesPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[var(--color-bg-secondary)] relative overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] -z-10" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm font-medium text-emerald-400 mb-6">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            One subscription. Unlimited tools. No surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {/* Popular glow effect */}
              {plan.popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-emerald-500/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />
              )}

              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-[var(--color-bg-primary)] border-emerald-500/50 hover:border-emerald-400"
                    : "bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-emerald-500/30"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-xl font-semibold text-white mb-2 pt-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-[var(--color-text-muted)]">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="text-[var(--color-text-secondary)] text-sm mb-8">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-[var(--color-text-secondary)] text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - Links to Stripe */}
                <a
                  href={plan.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3.5 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                      : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* One-time build option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-2xl">
            <p className="text-[var(--color-text-secondary)]">
              Need a one-time build? We do that too.{" "}
              <span className="text-white font-medium">Starting at $5,000.</span>
            </p>
            <a
              href="/sales/book"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 font-medium rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" />
              Book a Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
