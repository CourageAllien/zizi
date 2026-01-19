"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Shield,
  Zap,
  Clock,
  MessageSquare,
  BarChart,
  RefreshCw,
  Loader2,
} from "lucide-react";

const features = [
  { icon: Zap, text: "Unlimited build requests" },
  { icon: Clock, text: "48-72 hour turnaround" },
  { icon: MessageSquare, text: "Weekly strategy calls" },
  { icon: BarChart, text: "Monthly performance reports" },
  { icon: RefreshCw, text: "Continuous optimization" },
  { icon: Shield, text: "Pause or cancel anytime" },
];

export default function SubscribePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // In production, this would redirect to Stripe Checkout or similar
    // For now, redirect to a Stripe payment link or show a form
    window.location.href = "https://buy.stripe.com/your-stripe-link"; // Replace with actual Stripe link
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#22c55e]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-lg w-full">
        {/* Back Link */}
        <Link
          href="/partner"
          className="inline-flex items-center gap-2 text-[#a1a1a1] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Partner
        </Link>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141414] border border-[#262626] rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#22c55e]/10 rounded-full blur-[60px]" />

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full text-sm font-medium text-[#22c55e] mb-4">
                <CreditCard className="w-4 h-4" />
                Partnership Subscription
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Become a Partner
              </h1>
              <p className="text-[#a1a1a1]">
                Your always-on sales asset team
              </p>
            </div>

            {/* Price */}
            <div className="text-center mb-8 py-6 border-y border-[#262626]">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-white">$2,500</span>
                <span className="text-[#737373]">/month</span>
              </div>
              <p className="text-[#a1a1a1] text-sm mt-2">
                Billed monthly • Cancel anytime
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-[#22c55e]" />
                  </div>
                  <span className="text-[#a1a1a1]">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full py-4 bg-[#22c55e] text-white font-semibold rounded-xl hover:bg-[#16a34a] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting to checkout...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Subscribe Now
                </>
              )}
            </button>

            {/* Trust Elements */}
            <div className="mt-6 pt-6 border-t border-[#262626]">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#737373]">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#22c55e]" />
                  Secure payment via Stripe
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#22c55e]" />
                  Cancel anytime
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-[#22c55e]" />
                  No long-term contracts
                </span>
              </div>
            </div>

            {/* Alternative */}
            <div className="mt-8 text-center">
              <p className="text-[#737373] text-sm mb-3">
                Not ready to commit? Try us first.
              </p>
              <Link
                href="/partner#trial-form"
                className="text-[#22c55e] font-medium hover:underline"
              >
                Start with a $750 Trial Build →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Questions */}
        <p className="text-center text-[#737373] text-sm mt-6">
          Questions?{" "}
          <a
            href="mailto:hello@zizi.so"
            className="text-[#22c55e] hover:underline"
          >
            Email us
          </a>{" "}
          or{" "}
          <a
            href="https://calendly.com/courageoutbounder/ai-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#22c55e] hover:underline"
          >
            book a call
          </a>
        </p>
      </div>
    </div>
  );
}
