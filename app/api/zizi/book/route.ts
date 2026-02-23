import { NextRequest, NextResponse } from "next/server";
import { generateCompanyInsights } from "@/lib/zizi-claude";
import {
  saveBooking,
  generateBookingId,
  isTimeSlotAvailable,
  generateGoogleCalendarUrl,
  extractDomainFromEmail,
  ZiziCoBooking,
} from "@/lib/storage";
import { sendZiziCoConfirmationEmail, sendZiziCoAdminNotification } from "@/lib/resend";
import { ZIZI_ZOOM_MEETING } from "@/lib/zizi-constants";

interface BookingRequest {
  name: string;
  email: string;
  jobTitle: string;
  challenge: string;
  idealOutcome?: string;
  date: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    let body: BookingRequest;
    
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { name, email, jobTitle, challenge, date, time } = body;

    if (!name || !email || !jobTitle || !challenge || !date || !time) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if time slot is available
    const available = await isTimeSlotAvailable(date, time);
    if (!available) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another time." },
        { status: 409 }
      );
    }

    // Extract company domain from email for research
    const companyDomain = extractDomainFromEmail(email);

    // Generate company insights for the confirmation email (async, don't block)
    let companyInsights = null;
    try {
      companyInsights = await generateCompanyInsights(
        companyDomain,
        challenge,
        body.idealOutcome
      );
    } catch (error) {
      console.error("Error generating company insights:", error);
      // Continue without insights - they'll be generated later for emails
    }

    // Create booking record
    const bookingId = generateBookingId();
    const booking: ZiziCoBooking = {
      id: bookingId,
      name,
      email,
      jobTitle,
      challenge,
      idealOutcome: body.idealOutcome,
      date,
      time,
      createdAt: new Date().toISOString(),
      aiInsights: companyInsights ? { companyInsights } : undefined,
      confirmationSent: false,
      dayBeforeReminderSent: false,
      twoHourReminderSent: false,
      twentyMinReminderSent: false,
    };

    // Save booking to storage
    await saveBooking(booking);

    // Send confirmation email to user (async)
    try {
      await sendZiziCoConfirmationEmail({
        to: email,
        name,
        jobTitle,
        date,
        time,
        zoomLink: ZIZI_ZOOM_MEETING.link,
        companyInsights,
      });
      booking.confirmationSent = true;
      await saveBooking(booking);
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      // Continue even if email fails
    }

    // Send admin notification (async)
    try {
      await sendZiziCoAdminNotification({
        booking,
        companyInsights,
      });
    } catch (error) {
      console.error("Failed to send admin notification:", error);
    }

    // Generate calendar URL
    const calendarUrl = generateGoogleCalendarUrl(booking);

    return NextResponse.json(
      {
        success: true,
        bookingId,
        calendarUrl,
        message: "Booking confirmed! Check your email for details.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your booking" },
      { status: 500 }
    );
  }
}

// GET endpoint to check available time slots for a date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Import available time slots
    const { AVAILABLE_TIME_SLOTS } = await import("@/lib/zizi-constants");

    // Get booked slots for this date
    const { getAvailableTimeSlotsForDate } = await import("@/lib/storage");
    const availableSlots = await getAvailableTimeSlotsForDate(
      date,
      AVAILABLE_TIME_SLOTS
    );

    return NextResponse.json({
      date,
      availableSlots,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available time slots" },
      { status: 500 }
    );
  }
}


