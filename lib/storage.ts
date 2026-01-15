// ZiziCo AI Ops - Storage for Bookings

export interface AIInsights {
  companyInsights?: CompanyInsights;
  departmentInsights?: DepartmentInsights;
  personalInsights?: PersonalInsights;
}

export interface CompanyInsights {
  companyName: string;
  companyDomain: string;
  industry: string;
  description: string;
  aiOpportunities: string[];
  potentialImpact: string;
  recommendedSystems: string[];
}

export interface DepartmentInsights {
  department: string;
  role: string;
  departmentChallenges: string[];
  aiSolutions: string[];
  expectedTimesSaved: string;
  keyBenefits: string[];
}

export interface PersonalInsights {
  role: string;
  personalChallenges: string[];
  aiAssistance: string[];
  dailyWorkflowImprovements: string[];
  quickWins: string[];
}

export interface ZiziCoBooking {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  challenge: string;
  idealOutcome?: string;
  date: string;
  time: string;
  createdAt: string;
  aiInsights?: AIInsights;
  confirmationSent: boolean;
  dayBeforeReminderSent: boolean;
  twoHourReminderSent: boolean;
  twentyMinReminderSent: boolean;
}

// In-memory storage for development
// In production, replace with database (e.g., Supabase, PostgreSQL, etc.)
const bookings: Map<string, ZiziCoBooking> = new Map();

export function generateBookingId(): string {
  return `zizi_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function saveBooking(booking: ZiziCoBooking): Promise<ZiziCoBooking> {
  bookings.set(booking.id, booking);
  return booking;
}

export async function getBooking(id: string): Promise<ZiziCoBooking | null> {
  return bookings.get(id) || null;
}

export async function getBookingByEmail(
  email: string
): Promise<ZiziCoBooking | null> {
  for (const booking of bookings.values()) {
    if (booking.email === email) {
      return booking;
    }
  }
  return null;
}

export async function updateBooking(
  id: string,
  updates: Partial<ZiziCoBooking>
): Promise<ZiziCoBooking | null> {
  const existing = bookings.get(id);
  if (!existing) {
    return null;
  }

  const updated = { ...existing, ...updates };
  bookings.set(id, updated);
  return updated;
}

export async function getBookingsForDate(date: string): Promise<ZiziCoBooking[]> {
  const result: ZiziCoBooking[] = [];
  for (const booking of bookings.values()) {
    if (booking.date === date) {
      result.push(booking);
    }
  }
  return result;
}

export async function getAllBookings(): Promise<ZiziCoBooking[]> {
  return Array.from(bookings.values());
}

export async function isTimeSlotAvailable(
  date: string,
  time: string
): Promise<boolean> {
  for (const booking of bookings.values()) {
    if (booking.date === date && booking.time === time) {
      return false;
    }
  }
  return true;
}

export async function getAvailableTimeSlotsForDate(
  date: string,
  allTimeSlots: readonly string[]
): Promise<string[]> {
  const bookedTimes = new Set<string>();

  for (const booking of bookings.values()) {
    if (booking.date === date) {
      bookedTimes.add(booking.time);
    }
  }

  return allTimeSlots.filter((slot) => !bookedTimes.has(slot));
}

// Helper to format date for display
export function formatBookingDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper to format time for display (12-hour format)
export function formatBookingTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Generate a calendar URL for adding to Google Calendar
export function generateGoogleCalendarUrl(booking: ZiziCoBooking): string {
  const startDate = new Date(`${booking.date}T${booking.time}:00`);
  const endDate = new Date(startDate.getTime() + 15 * 60 * 1000); // 15 minutes

  const formatDate = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, -1);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `ZiziCo Discovery Call with ${booking.name}`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: `Discovery call to discuss: ${booking.challenge}\n\nZoom link will be sent via email.`,
    location: "Zoom (link in email)",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Extract company domain from email
export function extractDomainFromEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length === 2) {
    return parts[1];
  }
  return "";
}

// Get bookings that need reminders
export async function getBookingsNeedingReminders(): Promise<{
  dayBefore: ZiziCoBooking[];
  twoHours: ZiziCoBooking[];
  twentyMins: ZiziCoBooking[];
}> {
  const now = new Date();
  const dayBefore: ZiziCoBooking[] = [];
  const twoHours: ZiziCoBooking[] = [];
  const twentyMins: ZiziCoBooking[] = [];

  for (const booking of bookings.values()) {
    const meetingTime = new Date(`${booking.date}T${booking.time}:00`);
    const minutesUntilMeeting = (meetingTime.getTime() - now.getTime()) / (1000 * 60);

    // Day before reminder (22-26 hours before)
    if (
      !booking.dayBeforeReminderSent &&
      minutesUntilMeeting >= 22 * 60 &&
      minutesUntilMeeting <= 26 * 60
    ) {
      dayBefore.push(booking);
    }

    // 2 hour reminder (1.5-2.5 hours before)
    if (
      !booking.twoHourReminderSent &&
      minutesUntilMeeting >= 90 &&
      minutesUntilMeeting <= 150
    ) {
      twoHours.push(booking);
    }

    // 20 min reminder (15-25 minutes before)
    if (
      !booking.twentyMinReminderSent &&
      minutesUntilMeeting >= 15 &&
      minutesUntilMeeting <= 25
    ) {
      twentyMins.push(booking);
    }
  }

  return { dayBefore, twoHours, twentyMins };
}
