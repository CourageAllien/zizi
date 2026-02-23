"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const buildTypes = [
  "Preview Tool / Calculator",
  "Interactive Demo",
  "Assessment / Quiz",
  "Landing Page",
  "Lead Magnet",
  "Proposal Generator",
  "Something Else",
];

// Block free email domains
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
];

function isCompanyEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.includes(domain);
}

export default function TrialRequestForm() {
  const [formData, setFormData] = useState({
    buildType: "",
    description: "",
    website: "",
    email: "",
    name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.buildType) {
      setError("Please select what you want us to build");
      return;
    }
    if (!formData.description || formData.description.length < 50) {
      setError("Please provide more details (at least 50 characters)");
      return;
    }
    if (!formData.email) {
      setError("Please enter your email");
      return;
    }
    if (!isCompanyEmail(formData.email)) {
      setError("Please use your company email (no Gmail, Yahoo, etc.)");
      return;
    }
    if (!formData.name) {
      setError("Please enter your name");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partner/trial-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="trial-form" className="py-24 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Trial Build
            </h2>
            <p className="text-lg text-[#a1a1a1]">
              Tell us what you need. We'll deliver in 5-7 days.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#22c55e]/20 via-transparent to-[#3b82f6]/20 rounded-3xl blur-xl opacity-50" />

            <div className="relative bg-[#141414] border border-[#262626] rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Build Type */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        What do you want us to build? *
                      </label>
                      <select
                        value={formData.buildType}
                        onChange={(e) =>
                          setFormData({ ...formData, buildType: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a type...</option>
                        {buildTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Describe what you need *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Be specific: What should it do? Who's it for? Any examples or references?"
                        rows={4}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white placeholder-[#737373] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all resize-none"
                      />
                      <p className="text-xs text-[#737373] mt-1">
                        Minimum 50 characters
                      </p>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Your website{" "}
                        <span className="text-[#737373] font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="yourcompany.com"
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white placeholder-[#737373] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                      />
                      <p className="text-xs text-[#737373] mt-1">
                        So we can match your brand
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Your name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white placeholder-[#737373] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Your email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@yourcompany.com"
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-white placeholder-[#737373] focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                      />
                      <p className="text-xs text-[#737373] mt-1">
                        Company email only — no Gmail, Yahoo, etc.
                      </p>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#22c55e] text-white font-semibold rounded-xl hover:bg-[#16a34a] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#22c55e]/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request — $750
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#737373]">
                      We'll review your request and send an invoice within 24
                      hours. Build starts when payment is received.
                    </p>

                    {/* Trust Elements */}
                    <div className="pt-4 border-t border-[#262626]">
                      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#a1a1a1]">
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#22c55e]" />
                          You own everything
                        </span>
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#22c55e]" />
                          2 revision rounds
                        </span>
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#22c55e]" />
                          Delivered in 5-7 days
                        </span>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-[#22c55e]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Request Received!
                    </h3>
                    <p className="text-[#a1a1a1] mb-6">
                      We'll review your request and send an invoice to{" "}
                      <span className="text-white font-medium">
                        {formData.email}
                      </span>{" "}
                      within 24 hours.
                    </p>
                    <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-4">
                      <p className="text-sm text-[#a1a1a1]">
                        <span className="text-[#22c55e] font-medium">
                          What happens next:
                        </span>{" "}
                        Once payment is received, we'll start building. Expect
                        your finished asset in 5-7 days.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

