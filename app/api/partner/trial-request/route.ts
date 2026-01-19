import { NextRequest, NextResponse } from "next/server";
import {
  sendPartnerTrialConfirmationEmail,
  sendPartnerTrialAdminNotification,
} from "@/lib/resend";

interface TrialRequestBody {
  buildType: string;
  description: string;
  website?: string;
  email: string;
  name: string;
}

// Block free email domains
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
];

export async function POST(request: NextRequest) {
  try {
    const body: TrialRequestBody = await request.json();

    // Validate required fields
    if (!body.buildType || !body.description || !body.email || !body.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate description length
    if (body.description.length < 50) {
      return NextResponse.json(
        { error: "Description must be at least 50 characters" },
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

    // Check for free email domains
    const emailDomain = body.email.split("@")[1]?.toLowerCase();
    if (FREE_EMAIL_DOMAINS.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Please use a company email address" },
        { status: 400 }
      );
    }

    const requestId = `TR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Get Stripe payment link from environment
    const stripePaymentLink = process.env.STRIPE_TRIAL_PAYMENT_LINK || "https://buy.stripe.com/your-trial-link";

    // Send confirmation email to requester with payment link
    console.log("Attempting to send confirmation email to:", body.email);
    const confirmationResult = await sendPartnerTrialConfirmationEmail({
      to: body.email,
      name: body.name,
      buildType: body.buildType,
      description: body.description,
      website: body.website,
      requestId,
      stripePaymentLink,
    });
    
    if (!confirmationResult.success) {
      console.error("Failed to send confirmation email:", confirmationResult.error);
    } else {
      console.log("Confirmation email sent successfully to:", body.email);
    }

    // Send admin notification
    console.log("Attempting to send admin notification");
    const adminResult = await sendPartnerTrialAdminNotification({
      to: body.email,
      name: body.name,
      buildType: body.buildType,
      description: body.description,
      website: body.website,
      requestId,
    });
    
    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error);
    } else {
      console.log("Admin notification sent successfully");
    }

    // Log the request
    console.log("Trial request received:", {
      requestId,
      ...body,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      requestId,
      message: "Trial request submitted successfully",
    });
  } catch (error) {
    console.error("Trial request error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
