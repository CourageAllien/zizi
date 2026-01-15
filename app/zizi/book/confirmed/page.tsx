"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Clock,
  Mail,
  Video,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function formatTime(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ConfirmedContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "there";
  const jobTitle = searchParams.get("jobTitle") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const calendarUrl = searchParams.get("calendarUrl") || "";

  const firstName = name.split(" ")[0];

  // Preparation tips for the call
  const prepTips = [
    {
      icon: FileText,
      title: "Have examples ready",
      description: "Bring specific examples of repetitive tasks you want automated",
    },
    {
      icon: Clock,
      title: "Know your time sinks",
      description: "Think about where you and your team spend the most time on manual work",
    },
    {
      icon: Sparkles,
      title: "Define success",
      description: "Consider what 'success' looks like for an AI system in your workflow",
    },
    {
      icon: Lightbulb,
      title: "Share past attempts",
      description: "If you've tried automation before, be ready to share what didn't work",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-950/30 via-[#0a0a0f] to-purple-950/20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            You&apos;re All Set, {firstName}!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400"
          >
            Your discovery call has been booked. Check your email for
            confirmation and AI insights tailored for your role{jobTitle ? ` as ${jobTitle}` : ""}.
          </motion.p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 mb-8 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-semibold">{formatDate(date)}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Time</div>
                <div className="font-semibold">{formatTime(time)} (15 min)</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-semibold">Zoom Meeting</div>
              </div>
            </div>
          </div>

          {/* Add to Calendar Button */}
          {calendarUrl && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Add to Google Calendar
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-900/30 to-cyan-900/20 border border-purple-500/20 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-purple-400" />
            What Happens Next
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">1.</span>
              <span>Check your email for the confirmation with company-wide AI insights</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">2.</span>
              <span>24 hours before: You&apos;ll receive department-specific AI recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">3.</span>
              <span>2 hours before: Personal AI assistance tips for your role</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold">4.</span>
              <span>20 minutes before: Final reminder with the Zoom link</span>
            </li>
          </ul>
        </motion.div>

        {/* Email Confirmation Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-start gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl mb-8"
        >
          <Mail className="w-6 h-6 text-cyan-400 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Check Your Inbox</h4>
            <p className="text-gray-400 text-sm">
              We&apos;ve sent you a confirmation email with the Zoom link and
              personalized AI insights for your company. If you don&apos;t see
              it, check your spam folder.
            </p>
          </div>
        </motion.div>

        {/* Preparation Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Before Our Call
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {prepTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-900/30 border border-gray-800/50 rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gray-800/50 text-gray-400">
                  <tip.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-500">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </motion.div>

        {/* Footer Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-12"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Zizi
          </div>
          <p className="text-sm text-gray-500 mt-1">
            AI Systems, Built for You
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
          <div className="animate-pulse text-cyan-400">Loading...</div>
        </div>
      }
    >
      <ConfirmedContent />
    </Suspense>
  );
}
