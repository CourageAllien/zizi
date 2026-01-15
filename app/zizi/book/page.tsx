"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Zap,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Target,
    text: "See how AI can transform your specific workflow",
  },
  {
    icon: Zap,
    text: "Learn how we'd build an AI system to solve it",
  },
  {
    icon: Users,
    text: "Get honest feedback on whether Zizi is right for you",
  },
];

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const LOADING_MESSAGES = [
  "Setting up your call...",
  "Processing your request...",
  "Scheduling your meeting...",
  "Almost there...",
  "Confirming your booking...",
];

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function getNextWeekdays(count: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  let current = new Date(today);
  current.setDate(current.getDate() + 1); // Start from tomorrow

  while (dates.length < count) {
    const day = current.getDay();
    // Only include weekdays (Mon-Fri)
    if (day !== 0 && day !== 6) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function formatDateShort(date: Date): { day: string; num: number } {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days[date.getDay()],
    num: date.getDate(),
  };
}

function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function ZiziBookingPage() {
  const [step, setStep] = useState<"calendar" | "form">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    challenge: "",
    idealOutcome: "",
  });

  // Cycle through loading messages
  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setLoadingMessageIndex(0);
    }
  }, [isSubmitting]);

  // Generate calendar dates
  const calendarDates = useMemo(() => {
    const allDates = getNextWeekdays(28); // 4 weeks of weekdays
    const startIndex = calendarWeekOffset * 7;
    return allDates.slice(startIndex, startIndex + 14);
  }, [calendarWeekOffset]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep("form");
    }
  };

  const handleBack = () => {
    setStep("calendar");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/zizi/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: formatDateISO(selectedDate),
          time: selectedTime,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to confirmation page with booking data
      const params = new URLSearchParams({
        bookingId: data.bookingId,
        name: formData.name,
        email: formData.email,
        jobTitle: formData.jobTitle,
        date: formatDateISO(selectedDate),
        time: selectedTime,
        calendarUrl: data.calendarUrl || "",
      });

      window.location.href = `/zizi/book/confirmed?${params.toString()}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-950/30 via-[#0a0a0f] to-purple-950/20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            15-Minute Discovery Call
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Let&apos;s See If We Can Build It For You
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            This isn&apos;t a sales pitch. It&apos;s a real conversation about
            whether an AI system makes sense for your challenge. We&apos;ll
            show you exactly how AI can help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                In 15 minutes, you&apos;ll learn:
              </h3>
              <ul className="space-y-4">
                {BENEFITS.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                      <benefit.icon className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300">{benefit.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Pricing badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-4"
            >
              <span className="text-gray-500 text-sm">
                Starting at{" "}
                <span className="text-cyan-400 font-semibold">$2,199/mo</span> •
                Unlimited builds
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Calendar/Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {step === "calendar" ? (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        Select a Date & Time
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCalendarWeekOffset(Math.max(0, calendarWeekOffset - 1))
                          }
                          disabled={calendarWeekOffset === 0}
                          className="p-2 rounded-lg hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCalendarWeekOffset(calendarWeekOffset + 1)}
                          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Date Grid */}
                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {calendarDates.map((date, index) => {
                        const { day, num } = formatDateShort(date);
                        const isSelected =
                          selectedDate?.toDateString() === date.toDateString();

                        return (
                          <motion.button
                            key={date.toISOString()}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            onClick={() => handleDateSelect(date)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                              isSelected
                                ? "bg-cyan-500 text-white"
                                : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                            }`}
                          >
                            <span className="text-xs opacity-70">{day}</span>
                            <span className="text-lg font-semibold">{num}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Available times for{" "}
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </h3>
                        <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                          {TIME_SLOTS.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => handleTimeSelect(time)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                selectedTime === time
                                  ? "bg-cyan-500 text-white"
                                  : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                              }`}
                            >
                              {formatTime(time)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Continue Button */}
                    <motion.button
                      onClick={handleContinue}
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        selectedDate && selectedTime
                          ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700"
                          : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    {/* Form Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={handleBack}
                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h2 className="text-xl font-semibold">
                          Your Information
                        </h2>
                        <p className="text-sm text-gray-400">
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          at {selectedTime && formatTime(selectedTime)}
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Your Role / Job Title *
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none"
                          placeholder="e.g., Marketing Director, Operations Manager, CEO"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          What&apos;s your biggest challenge with work and
                          revenue generation that AI can help with right now? *
                        </label>
                        <textarea
                          name="challenge"
                          value={formData.challenge}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none resize-none"
                          placeholder="e.g., We spend hours manually processing customer inquiries and categorizing support tickets..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Describe your ideal outcome{" "}
                          <span className="text-gray-600">(optional)</span>
                        </label>
                        <textarea
                          name="idealOutcome"
                          value={formData.idealOutcome}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors outline-none resize-none"
                          placeholder="e.g., An AI that automatically categorizes and routes tickets, cutting response time by 50%..."
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                        >
                          {error}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {LOADING_MESSAGES[loadingMessageIndex]}
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Book Discovery Call
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By booking, you agree to receive emails about your call.
                        No spam, ever.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Zizi
          </div>
          <p className="text-sm text-gray-500 mt-1">AI Systems, Built for You</p>
        </motion.div>
      </div>
    </div>
  );
}
