"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LeadGenHero() {
  return (
    <section className="relative min-h-screen bg-[#fafafa] text-black pt-20 pb-32 flex items-center">
      {/* Dotted Pattern Background - sparse on left, dense on right */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {Array.from({ length: 300 }).map((_, i) => {
            // More dots on the right side
            const x = Math.pow(Math.random(), 1.5) * 100; // Bias towards right
            const y = Math.random() * 100;
            // Size increases from left to right
            const size = 1 + (x / 100) * 5;
            // Opacity increases from left to right
            const opacity = 0.05 + (x / 100) * 0.25;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-gray-800"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: opacity,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            Your next client is already looking for a reason to trust you.
            <br />
            <span className="text-gray-600">Give them one.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            We build done-for-you lead gen tools that attract your ideal clients, prove your expertise, and sell your high-ticket offer — before you ever get on a call.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/book"
              className="bg-black text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-gray-900 transition-colors"
            >
              Book a Strategy Call
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
