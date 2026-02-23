import { NextRequest, NextResponse } from "next/server";
import {
  sendLeadGenBookingConfirmationEmail,
  sendLeadGenBookingAdminNotification,
} from "@/lib/resend";

interface LeadGenBookingBody {
  name: string;
  email: string;
  offer: string;
  idealClient: string;
  currentLeadGen?: string;
  date: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadGenBookingBody = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.email ||
      !body.offer ||
      !body.idealClient ||
      !body.date ||
      !body.time
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const bookingId = `LG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const emailProps = {
      to: body.email,
      name: body.name,
      offer: body.offer,
      idealClient: body.idealClient,
      currentLeadGen: body.currentLeadGen,
      date: body.date,
      time: body.time,
      bookingId,
    };

    // Send confirmation email to booker
    console.log("Attempting to send lead gen booking confirmation email to:", body.email);
    const confirmationResult = await sendLeadGenBookingConfirmationEmail(emailProps);
    if (!confirmationResult.success) {
      console.error("Failed to send confirmation email:", confirmationResult.error);
    } else {
      console.log("Lead gen booking confirmation email sent successfully to:", body.email);
    }

    // Send admin notification
    console.log("Attempting to send admin notification for lead gen booking");
    const adminResult = await sendLeadGenBookingAdminNotification(emailProps);
    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error);
    } else {
      console.log("Admin notification for lead gen booking sent successfully");
    }

    console.log("Lead gen booking received:", {
      bookingId,
      ...body,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Strategy call booked successfully",
    });
  } catch (error) {
    console.error("Lead gen booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

