"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Image, Mic, ArrowRight, MessageSquare, Settings, Lightbulb, BarChart3, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";

const featureTags = [
  { icon: MessageSquare, text: "Customer Outreach" },
  { icon: Settings, text: "Internal Workflows" },
  { icon: Lightbulb, text: "Knowledge Hub" },
  { icon: BarChart3, text: "Deal Tracker" },
  { icon: TrendingUp, text: "Growth Agent" },
  { icon: Building2, text: "CRM Assistant" },
];

export default function OrrenHero() {
  const [command, setCommand] = useState("");

  return (
    <section className="relative min-h-screen bg-white text-black pt-32 pb-20 flex items-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Introducing Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="text-sm text-gray-500">Introducing ZiziCo</span>
          <Link
            href="/book"
            className="bg-gray-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Try now →
          </Link>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight"
        >
          Your next client is already looking for a reason to trust you.
          <br />
          <span className="text-gray-600">Give them one.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We build done-for-you lead gen tools that attract your ideal clients, prove your expertise, and sell your high-ticket offer — before you ever get on a call.
        </motion.p>

        {/* Command Input Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="relative bg-gray-800 rounded-lg p-4 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Image className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="| Automate my client onboarding flow and send progress reports weekly."
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
            />
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <ArrowRight className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {featureTags.map((tag, index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 hover:border-gray-400 transition-colors"
            >
              <tag.icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{tag.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg text-gray-700 mb-8">
            Trusted by the teams redefining productivity.
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
            {[
              "Bizal", "Zortcloud", "Bulletproof Management", "GDnD Consultants", "Kevs Kitchen"
            ].map((company, index) => (
              <div key={index} className="text-gray-800 font-medium text-sm">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

