"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

export default function SubscribePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // In production, this would redirect to Stripe Checkout
    // For now, redirect to a Stripe payment link
    window.location.href = "https://buy.stripe.com/your-stripe-link"; // Replace with actual Stripe link
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Start Building Your First Tool
          </h1>
          <p className="text-lg text-gray-600">
            $549/month • Cancel anytime • No contracts
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12 mb-8 max-w-2xl mx-auto">
          <div className="text-5xl font-bold text-black mb-2">$549</div>
          <div className="text-lg text-gray-600 mb-8">/ month</div>

          <ul className="space-y-4 mb-8 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Unlimited builds (one active request at a time)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Strategy included</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Full design and development</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Unlimited revisions per build</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">→</span>
              <span>Cancel anytime</span>
            </li>
          </ul>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-black text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Redirecting to checkout..." : "Subscribe Now"}
          </button>

          {/* Trust Elements */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-black" />
                Secure payment via Stripe
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-black" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-black" />
                No long-term contracts
              </span>
            </div>
          </div>
        </div>

        {/* Alternative */}
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-3">
            Not ready to commit? Try us first.
          </p>
          <Link
            href="/zizi/book"
            className="text-black font-medium hover:underline"
          >
            Book a Strategy Call First →
          </Link>
        </div>
      </div>
    </main>
  );
}

