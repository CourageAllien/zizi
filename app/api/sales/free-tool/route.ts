import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email to receive sales tool requests
const ADMIN_EMAIL = "couragealison6@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

// Rate limiting: simple in-memory store (use Redis in production)
const requestTimestamps = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(request: NextRequest) {
  try {
    const { description, email } = await request.json();

    // Validation
    if (!description || !email) {
      return NextResponse.json(
        { error: "Description and email are required" },
        { status: 400 }
      );
    }

    if (description.length < 20) {
      return NextResponse.json(
        { error: "Please provide a more detailed description (at least 20 characters)" },
        { status: 400 }
      );
    }

    if (description.length > 2000) {
      return NextResponse.json(
        { error: "Description is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check rate limiting
    const lastRequest = requestTimestamps.get(email.toLowerCase());
    const now = Date.now();
    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      const remainingMinutes = Math.ceil((RATE_LIMIT_WINDOW - (now - lastRequest)) / 60000);
      return NextResponse.json(
        { error: `You've already submitted a request. Please wait ${remainingMinutes} minutes before submitting again.` },
        { status: 429 }
      );
    }

    // Update rate limit timestamp
    requestTimestamps.set(email.toLowerCase(), now);

    // Send email notification
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: email,
      subject: `🎯 New Sales Tool Request from ${email}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1a1a24 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(16, 185, 129, 0.3);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 25px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Sales Tool Request!</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">From the Sales Landing Page</p>
    </div>
    
    <div style="padding: 30px;">
      
      <!-- Contact Info -->
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h2 style="color: #10B981; margin: 0 0 15px; font-size: 16px;">📧 Requester</h2>
        <p style="color: #e5e7eb; margin: 0; font-size: 18px; font-weight: 600;">
          <a href="mailto:${email}" style="color: #10B981; text-decoration: none;">${email}</a>
        </p>
      </div>
      
      <!-- Tool Description -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #e5e7eb; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); padding-bottom: 10px;">
          🛠️ Sales Tool They Need
        </h2>
        <div style="background: rgba(255, 255, 255, 0.05); border-left: 4px solid #10B981; padding: 20px; border-radius: 0 12px 12px 0;">
          <p style="color: #e5e7eb; margin: 0; line-height: 1.8; font-size: 16px; white-space: pre-wrap;">${description}</p>
        </div>
      </div>
      
      <!-- Timer Reminder -->
      <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; text-align: center;">
        <p style="color: #10B981; margin: 0; font-size: 16px; font-weight: 600;">
          ⏰ 24-48 Hour Delivery Promised
        </p>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">
          Build a preview tool to show them what's possible
        </p>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background: rgba(0,0,0,0.3); padding: 15px; text-align: center;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Received: ${new Date().toLocaleString("en-US", { 
          weekday: "long", 
          year: "numeric", 
          month: "long", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short"
        })}
      </p>
    </div>
    
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing sales tool request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}


