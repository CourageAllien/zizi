"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Check,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Target,
  Zap,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const BENEFITS = [
  {
    icon: Target,
    text: "Discuss your high-ticket offer and ideal client",
  },
  {
    icon: Zap,
    text: "Learn what lead gen tools we'd build for you",
  },
  {
    icon: Rocket,
    text: "See how the $549/month partnership works",
  },
];

// Nigerian Time (WAT = UTC+1) availability: 9:00 AM to 2:00 AM
const NIGERIA_UTC_OFFSET = 1;
const AVAILABILITY_START_HOUR_WAT = 9;
const AVAILABILITY_END_HOUR_WAT = 26;

function generateAllTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

function isWithinNigerianAvailability(localDate: Date, localTimeStr: string): boolean {
  const [hours, minutes] = localTimeStr.split(":").map(Number);
  const localDateTime = new Date(localDate);
  localDateTime.setHours(hours, minutes, 0, 0);
  
  const utcHours = localDateTime.getUTCHours();
  const utcMinutes = localDateTime.getUTCMinutes();
  
  let nigerianHours = utcHours + NIGERIA_UTC_OFFSET;
  if (nigerianHours < 0) nigerianHours += 24;
  
  const normalizedNigerianHours = nigerianHours < AVAILABILITY_START_HOUR_WAT && nigerianHours < 3 
    ? nigerianHours + 24 
    : nigerianHours;
  
  const nigerianTimeValue = normalizedNigerianHours + (utcMinutes / 60);
  return nigerianTimeValue >= AVAILABILITY_START_HOUR_WAT && nigerianTimeValue < AVAILABILITY_END_HOUR_WAT;
}

function getAvailableTimeSlots(selectedDate: Date): string[] {
  const allSlots = generateAllTimeSlots();
  const now = new Date();
  
  return allSlots.filter(timeStr => {
    if (!isWithinNigerianAvailability(selectedDate, timeStr)) {
      return false;
    }
    
    if (selectedDate.toDateString() === now.toDateString()) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);
      const bufferTime = new Date(now.getTime() + 60 * 60 * 1000);
      if (slotTime <= bufferTime) {
        return false;
      }
    }
    
    return true;
  });
}

function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "your local time";
  }
}

const LOADING_MESSAGES = [
  "Setting up your strategy call...",
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
  current.setDate(current.getDate() + 1);

  while (dates.length < count) {
    const day = current.getDay();
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

export default function StrategyCallBookingPage() {
  const [step, setStep] = useState<"calendar" | "form">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userTimezone, setUserTimezone] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    offer: "",
    idealClient: "",
    currentLeadGen: "",
  });

  useEffect(() => {
    setUserTimezone(getUserTimezone());
  }, []);

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

  const calendarDates = useMemo(() => {
    const allDates = getNextWeekdays(28);
    const startIndex = calendarWeekOffset * 7;
    return allDates.slice(startIndex, startIndex + 14);
  }, [calendarWeekOffset]);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableTimeSlots(selectedDate);
  }, [selectedDate]);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const response = await fetch("/api/leadgen/book", {
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

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsConfirmed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-gradient-to-br from-[var(--color-primary)]/30 via-[#0a0a0a] to-[var(--color-accent)]/20 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
            <Check className="w-10 h-10 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Strategy Call Booked!</h1>
          <p className="text-gray-400 mb-6">
            We&apos;ve sent a confirmation to <span className="text-white">{formData.email}</span>.
            Looking forward to discussing how we can help build lead gen tools for your business.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime && formatTime(selectedTime)}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-[var(--color-primary)]/30 via-[#0a0a0a] to-[var(--color-accent)]/20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Strategy Call
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let&apos;s discuss your high-ticket offer and how we can build lead gen tools that attract your ideal clients.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6 text-center"
            >
              <benefit.icon className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-3" />
              <p className="text-sm text-gray-400">{benefit.text}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === "calendar" ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[var(--color-primary)]" />
                    Select a Date
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCalendarWeekOffset(Math.max(0, calendarWeekOffset - 1))}
                      disabled={calendarWeekOffset === 0}
                      className="p-2 rounded-lg hover:bg-[var(--color-bg-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCalendarWeekOffset(calendarWeekOffset + 1)}
                      className="p-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-4 mb-6">
                  {calendarDates.map((date, index) => {
                    const { day, num } = formatDateShort(date);
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    const isToday = date.toDateString() === new Date().toDateString();

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        className={`p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                            : "bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                        } ${isToday ? "ring-2 ring-[var(--color-primary)]/50" : ""}`}
                      >
                        <div className="text-xs text-gray-400 mb-1">{day}</div>
                        <div className="text-lg font-semibold">{num}</div>
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                      Available Times ({userTimezone})
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-3 rounded-lg border transition-all ${
                            selectedTime === time
                              ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                              : "bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                          }`}
                        >
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>
                    {availableTimeSlots.length === 0 && (
                      <p className="text-gray-400 text-sm">No available times for this date.</p>
                    )}
                  </motion.div>
                )}

                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <button
                      onClick={handleContinue}
                      className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-8"
            >
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <h2 className="text-2xl font-bold mb-6">Tell Us About Yourself</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)]"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What&apos;s your high-ticket offer? *
                  </label>
                  <textarea
                    name="offer"
                    value={formData.offer}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] resize-none"
                    placeholder="e.g., $5k leadership coaching program for executives..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Who is your ideal client? *
                  </label>
                  <textarea
                    name="idealClient"
                    value={formData.idealClient}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] resize-none"
                    placeholder="e.g., Directors and VPs at mid-size companies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What&apos;s your current lead gen approach?
                  </label>
                  <textarea
                    name="currentLeadGen"
                    value={formData.currentLeadGen}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-primary)] resize-none"
                    placeholder="e.g., Referrals, LinkedIn outreach, content marketing..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {LOADING_MESSAGES[loadingMessageIndex]}
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

