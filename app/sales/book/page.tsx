"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Zap,
  TrendingUp,
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
    text: "See exactly how we'd build a sales tool for your process",
  },
  {
    icon: TrendingUp,
    text: "Learn which tools would have the biggest impact on your pipeline",
  },
  {
    icon: Zap,
    text: "Get a roadmap for your custom sales toolkit",
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
    if (!isWithinNigerianAvailability(selectedDate, timeStr)) return false;
    if (selectedDate.toDateString() === now.toDateString()) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hours, minutes, 0, 0);
      const bufferTime = new Date(now.getTime() + 60 * 60 * 1000);
      if (slotTime <= bufferTime) return false;
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
  return { day: days[date.getDay()], num: date.getDate() };
}

function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function SalesBookingPage() {
  const [step, setStep] = useState<"calendar" | "form">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calendarWeekOffset, setCalendarWeekOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [userTimezone, setUserTimezone] = useState<string>("");
  const [isBooked, setIsBooked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    currentChallenge: "",
    toolsInterested: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/sales/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      setIsBooked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/30 via-[#0a0a0f] to-teal-950/20 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">You&apos;re Booked! 🎉</h1>
          <p className="text-gray-400 mb-6">
            We&apos;ve sent a confirmation to <span className="text-white">{formData.email}</span>.
            <br />
            Looking forward to discussing how we can build your sales advantage.
          </p>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-6">
            <p className="text-sm text-emerald-400 font-medium mb-1">Your Call</p>
            <p className="text-white">
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}{" "}
              at {selectedTime && formatTime(selectedTime)}
            </p>
          </div>
          <a
            href="/sales"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Sales Tools
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/30 via-[#0a0a0f] to-teal-950/20 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <a href="/sales" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Sales Tools
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            15-Minute Sales Strategy Call
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
            Let&apos;s Build Your Sales Advantage
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Quick call to understand your sales process and show you exactly which tools would have the biggest impact on your pipeline.
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
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">
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
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                      <benefit.icon className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300">{benefit.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-4"
            >
              <span className="text-gray-500 text-sm">
                Starting at{" "}
                <span className="text-emerald-400 font-semibold">$2,500/mo</span> •
                Unlimited sales tools
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
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                        Select a Date & Time
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCalendarWeekOffset(Math.max(0, calendarWeekOffset - 1))}
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

                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {calendarDates.map((date, index) => {
                        const { day, num } = formatDateShort(date);
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        return (
                          <motion.button
                            key={date.toISOString()}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            onClick={() => handleDateSelect(date)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                              isSelected
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                            }`}
                          >
                            <span className="text-xs opacity-70">{day}</span>
                            <span className="text-lg font-semibold">{num}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {selectedDate && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                        <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Available times for{" "}
                          {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                        </h3>
                        {userTimezone && (
                          <p className="text-xs text-gray-500 mb-3">Times shown in your timezone: {userTimezone}</p>
                        )}
                        {availableTimeSlots.length > 0 ? (
                          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                            {availableTimeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                  selectedTime === time
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                                }`}
                              >
                                {formatTime(time)}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-gray-500">
                            <p>No available times for this date.</p>
                            <p className="text-sm mt-1">Please select another date.</p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    <motion.button
                      onClick={handleContinue}
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        selectedDate && selectedTime
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700"
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
                    <div className="flex items-center gap-4 mb-6">
                      <button onClick={handleBack} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div>
                        <h2 className="text-xl font-semibold">Your Information</h2>
                        <p className="text-sm text-gray-400">
                          {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at{" "}
                          {selectedTime && formatTime(selectedTime)}
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Work Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Company *</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                            placeholder="Acme Inc"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Your Role *</label>
                          <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                            placeholder="Head of Sales, Founder, etc."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Sales Team Size</label>
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                        >
                          <option value="">Select team size</option>
                          <option value="solo">Just me</option>
                          <option value="2-5">2-5 reps</option>
                          <option value="6-20">6-20 reps</option>
                          <option value="20+">20+ reps</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          What&apos;s your biggest sales challenge right now? *
                        </label>
                        <textarea
                          name="currentChallenge"
                          value={formData.currentChallenge}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none resize-none"
                          placeholder="e.g., Prospects ask about ROI but we cannot quantify it, or Demos take too long to set up"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Which tools are you most interested in? <span className="text-gray-600">(optional)</span>
                        </label>
                        <textarea
                          name="toolsInterested"
                          value={formData.toolsInterested}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none resize-none"
                          placeholder="e.g., ROI calculator, interactive demo, proposal generator..."
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
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {LOADING_MESSAGES[loadingMessageIndex]}
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            Book Strategy Call
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By booking, you agree to receive emails about your call. No spam, ever.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            ZiziCo Sales
          </div>
          <p className="text-sm text-gray-500 mt-1">AI-Powered Sales Tools</p>
        </motion.div>
      </div>
    </div>
  );
}
