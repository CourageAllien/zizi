"use client";

import Link from "next/link";
import AnimateOnScroll from "../partner/AnimateOnScroll";
import { Compass, Music2, Mail, MessageSquare, Figma, FileText, Car } from "lucide-react";

const apps = [
  { name: "Spotify", icon: Music2, color: "bg-green-500" },
  { 
    name: "Gmail", 
    icon: Mail, 
    color: "bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500",
    customIcon: (
      <span className="text-white font-bold text-lg">M</span>
    )
  },
  { name: "Slack", icon: MessageSquare, color: "bg-purple-500" },
  { name: "Figma", icon: Figma, color: "bg-pink-500" },
  { name: "Notion", icon: FileText, color: "bg-black" },
  { name: "Uber", icon: Car, color: "bg-black" },
];

export default function WhatSiriShouldBe() {
  const centerX = 50;
  const centerY = 50;

  const appPositions = [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 50 },
    { x: 75, y: 50 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#f5f5f0] text-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <AnimateOnScroll>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                What Siri + AI should be.
              </h2>
              <Link
                href="#how-it-works"
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors mb-6"
              >
                See how it works
              </Link>
            </AnimateOnScroll>
          </div>
          <div>
            <AnimateOnScroll delay={0.1}>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                We&apos;re building the first AI assistant that acts instead of talks — controls your home, organizes your life, and automates your work.
              </p>
            </AnimateOnScroll>

            {/* Integration Diagram */}
            <div className="relative" style={{ minHeight: "400px" }}>
              {/* SVG for connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {appPositions.map((pos, index) => (
                  <line
                    key={index}
                    x1="20%"
                    y1="50%"
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="#000"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                ))}
              </svg>

              {/* Central Icon */}
              <div
                className="absolute"
                style={{
                  left: "20%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                }}
              >
                <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center shadow-lg">
                  <Compass className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* App Icons */}
              {apps.map((app, index) => {
                const pos = appPositions[index];
                const rotation = (Math.random() - 0.5) * 8;
                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      zIndex: 5,
                    }}
                  >
                    <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow min-w-[100px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 ${app.color} rounded flex items-center justify-center`}>
                          {app.customIcon || <app.icon className="w-6 h-6 text-white" />}
                        </div>
                        <span className="text-xs font-medium text-black">
                          {app.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-gray-700 mt-8 text-sm">
              One AI connecting everything you use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

