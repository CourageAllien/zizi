"use client";

import { useState } from "react";
import { Mic, ArrowUp, Plus, Mail, Calendar } from "lucide-react";

export default function AgentOneHero() {
  const [command, setCommand] = useState("");

  const suggestions = [
    { icon: Plus, text: "" },
    { icon: Mail, text: "Summarize Today's Emails" },
    { icon: Mail, text: "Send email" },
    { icon: Calendar, text: "Block Deep Work Time", date: "31" },
  ];

  return (
    <section className="relative min-h-screen bg-[#fafafa] text-black pt-20 pb-32">
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Main Headline */}
        <div className="text-center mb-12 mt-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Finally, an AI that does.
            <br />
            Not just talks.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            AgentOne is the first Action AI – it does things for you across apps, devices, and the web.
          </p>
        </div>

        {/* AI Command Input */}
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-3">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Ask AgentOne to do something..."
              className="flex-1 bg-gray-200 rounded-2xl px-6 py-4 text-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            <button className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                <ArrowUp className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Suggested Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-6 justify-center">
            {suggestions.map((suggestion, index) => {
              if (index === 0) {
                // Just the plus icon button
                return (
                  <button
                    key={index}
                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg w-10 h-10 text-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                );
              }
              return (
                <button
                  key={index}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 transition-colors"
                >
                  {suggestion.date ? (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{suggestion.date}</span>
                    </>
                  ) : (
                    <suggestion.icon className="w-4 h-4" />
                  )}
                  {suggestion.text && <span>{suggestion.text}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

