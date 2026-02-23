"use client";

import { Globe, Music2, Mail, MessageSquare, Figma, FileText, Car } from "lucide-react";

const apps = [
  { name: "Spotify", icon: Music2, color: "text-green-500", customIcon: null },
  { 
    name: "Gmail", 
    icon: Mail, 
    color: "text-red-500",
    customIcon: (
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ 
            background: "linear-gradient(to right, #EA4335 0%, #EA4335 33%, #FBBC04 33%, #FBBC04 66%, #4285F4 66%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>M</span>
        </div>
      </div>
    )
  },
  { name: "Slack", icon: MessageSquare, color: "text-purple-500", customIcon: null },
  { name: "Figma", icon: Figma, color: "text-pink-500", customIcon: null },
  { name: "Notion", icon: FileText, color: "text-black", customIcon: null },
  { name: "Uber", icon: Car, color: "text-black", customIcon: null },
];

export default function IntegrationDiagram() {
  const centerX = 50; // Percentage
  const centerY = 50; // Percentage

  const appPositions = [
    { x: 20, y: 20 }, // Top-left
    { x: 80, y: 20 }, // Top-right
    { x: 20, y: 50 }, // Middle-left
    { x: 80, y: 50 }, // Middle-right
    { x: 20, y: 80 }, // Bottom-left
    { x: 80, y: 80 }, // Bottom-right
  ];

  return (
    <section className="bg-[#fafafa] text-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative" style={{ minHeight: "600px" }}>
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {appPositions.map((pos, index) => (
              <line
                key={index}
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${pos.x}%`}
                y2={`${pos.y}%`}
                stroke="#000"
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>

          {/* Central AgentOne Icon */}
          <div
            className="absolute"
            style={{
              left: `${centerX}%`,
              top: `${centerY}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* App Icons positioned around center */}
          {apps.map((app, index) => {
            const pos = appPositions[index];
            const rotation = (Math.random() - 0.5) * 6; // Slight rotation
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
                <div className="bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow min-w-[120px]">
                  <div className="flex flex-col items-center gap-2">
                    {app.customIcon || <app.icon className={`w-8 h-8 ${app.color}`} />}
                    <span className="text-xs font-medium text-gray-700">
                      {app.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Text */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <p className="text-gray-700 text-lg">
              One AI connecting everything you use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

