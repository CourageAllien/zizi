import { NextRequest, NextResponse } from "next/server";
import {
  sendPartnerBookingConfirmationEmail,
  sendPartnerBookingAdminNotification,
} from "@/lib/resend";

interface PartnerBookingBody {
  name: string;
  email: string;
  company: string;
  role: string;
  currentCampaigns: string;
  goals?: string;
  date: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnerBookingBody = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.email ||
      !body.company ||
      !body.role ||
      !body.currentCampaigns ||
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

    const bookingId = `PB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const emailProps = {
      to: body.email,
      name: body.name,
      company: body.company,
      role: body.role,
      currentCampaigns: body.currentCampaigns,
      goals: body.goals,
      date: body.date,
      time: body.time,
      bookingId,
    };

    // Send confirmation email to booker
    console.log("Attempting to send booking confirmation email to:", body.email);
    const confirmationResult = await sendPartnerBookingConfirmationEmail(emailProps);
    if (!confirmationResult.success) {
      console.error("Failed to send confirmation email:", confirmationResult.error);
    } else {
      console.log("Booking confirmation email sent successfully to:", body.email);
    }

    // Send admin notification
    console.log("Attempting to send admin notification for booking");
    const adminResult = await sendPartnerBookingAdminNotification(emailProps);
    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error);
    } else {
      console.log("Admin notification for booking sent successfully");
    }

    console.log("Partner booking received:", {
      bookingId,
      ...body,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Call booked successfully",
    });
  } catch (error) {
    console.error("Partner booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

