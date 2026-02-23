// ZiziCo AI Ops - Booking System Constants

export const ZIZI_ZOOM_MEETING = {
  link: "https://us04web.zoom.us/j/6679291100?pwd=joYqzB59tVSa4HAay56YXWEiPuE4hI.1",
  meetingId: "667 929 1100",
  passcode: "EAvc7L",
};

export const ZIZI_PRICING = {
  monthly: 2199,
  description: "Unlimited builds. Maintained forever.",
  currency: "USD",
};

export const ZIZI_BRANDING = {
  name: "ZiziCo",
  tagline: "AI Systems, Built for You",
  primaryColor: "#06B6D4", // Cyan/Teal
  accentColor: "#8B5CF6", // Purple accent
};

export const BOOKING_CONFIG = {
  duration: 15, // minutes
  callType: "Discovery Call",
  timezone: "America/New_York", // Default timezone
};

// Benefits shown on the booking page
export const ZIZI_BENEFITS = [
  {
    icon: "Target",
    text: "See how AI can transform your specific workflow",
  },
  {
    icon: "Zap",
    text: "Learn how we'd build an AI system to solve it",
  },
  {
    icon: "Users",
    text: "Get honest feedback on whether ZiziCo is right for you",
  },
] as const;

// Available time slots (in 24-hour format)
export const AVAILABLE_TIME_SLOTS = [
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
] as const;

// Days of the week that are available for booking
export const AVAILABLE_DAYS = [1, 2, 3, 4, 5] as const; // Monday = 1, Friday = 5 (no weekends)

// Reminder schedule (in minutes before meeting)
export const REMINDER_SCHEDULE = {
  dayBefore: 24 * 60, // 24 hours = 1440 minutes
  twoHoursBefore: 2 * 60, // 2 hours = 120 minutes
  twentyMinsBefore: 20, // 20 minutes
} as const;


