"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Mail, Calendar, Mic, ArrowUp } from "lucide-react";

export default function LeadGenHero() {
  const [command, setCommand] = useState("");

  return (
    <section className="relative min-h-screen bg-[#f5f5f0] text-black pt-20 pb-32 flex items-center">
      {/* Dotted Pattern Background - dense in center, fades out */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {Array.from({ length: 400 }).map((_, i) => {
            // Dense in center, sparse at edges
            const centerX = 50;
            const centerY = 50;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Size decreases from center
            const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const size = Math.max(1, 4 - (distFromCenter / 50) * 3);
            const opacity = Math.max(0.1, 0.4 - (distFromCenter / 50) * 0.3);
            
            return (
              <div
                key={i}
                className="absolute rounded-full bg-black"
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
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Your next client is already looking for a reason to trust you.
            <br />
            <span className="text-gray-600">Give them one.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            We build done-for-you lead gen tools that attract your ideal clients, prove your expertise, and sell your high-ticket offer — before you ever get on a call.
          </motion.p>

          {/* AI Command Input - matching AgentOne style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Ask AgentOne to do something..."
                className="flex-1 bg-white rounded-2xl px-6 py-4 text-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 border border-gray-200"
              />
              <button className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors flex-shrink-0">
                <div className="flex items-center gap-1">
                  <Mic className="w-5 h-5" />
                  <ArrowUp className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Suggested Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-6 justify-center">
              <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 hover:border-black transition-colors">
                <Plus className="w-5 h-5 text-black" />
              </button>
              <button className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200 hover:border-black transition-colors">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-sm text-black">Summarize Today&apos;s Emails</span>
              </button>
              <button className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200 hover:border-black transition-colors">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-sm text-black">Send email</span>
              </button>
              <button className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200 hover:border-black transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-black">Block Deep Work Time</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
