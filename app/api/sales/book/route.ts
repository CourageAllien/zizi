import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "couragealison6@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, teamSize, currentChallenge, toolsInterested, date, time } = body;

    // Validation
    if (!name || !email || !company || !role || !currentChallenge || !date || !time) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Generate a booking ID
    const bookingId = `SALES-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Format date for display
    const bookingDate = new Date(date);
    const formattedDate = bookingDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Format time
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const formattedTime = `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;

    // Send notification email to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: email,
      subject: `🎯 New Sales Strategy Call: ${name} from ${company}`,
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
      <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Sales Strategy Call Booked!</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">From the Sales Landing Page</p>
    </div>
    
    <div style="padding: 30px;">
      
      <!-- Booking Details -->
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h2 style="color: #10B981; margin: 0 0 15px; font-size: 16px;">📅 Call Details</h2>
        <p style="color: #e5e7eb; margin: 0; font-size: 18px; font-weight: 600;">
          ${formattedDate} at ${formattedTime}
        </p>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">
          Booking ID: ${bookingId}
        </p>
      </div>
      
      <!-- Contact Info -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #e5e7eb; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); padding-bottom: 10px;">
          👤 Contact Information
        </h2>
        <table style="width: 100%; color: #e5e7eb; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #9ca3af;">Name:</td>
            <td style="padding: 8px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #10B981;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af;">Company:</td>
            <td style="padding: 8px 0; font-weight: 600;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af;">Role:</td>
            <td style="padding: 8px 0;">${role}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af;">Team Size:</td>
            <td style="padding: 8px 0;">${teamSize || "Not specified"}</td>
          </tr>
        </table>
      </div>
      
      <!-- Challenge -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #e5e7eb; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid rgba(16, 185, 129, 0.3); padding-bottom: 10px;">
          🎯 Their Sales Challenge
        </h2>
        <div style="background: rgba(255, 255, 255, 0.05); border-left: 4px solid #10B981; padding: 20px; border-radius: 0 12px 12px 0;">
          <p style="color: #e5e7eb; margin: 0; line-height: 1.8; font-size: 16px; white-space: pre-wrap;">${currentChallenge}</p>
        </div>
      </div>
      
      ${toolsInterested ? `
      <!-- Tools Interested -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #e5e7eb; margin: 0 0 15px; font-size: 18px;">
          🛠️ Tools They're Interested In
        </h2>
        <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 12px;">
          <p style="color: #e5e7eb; margin: 0; line-height: 1.6;">${toolsInterested}</p>
        </div>
      </div>
      ` : ""}
      
    </div>
    
    <!-- Footer -->
    <div style="background: rgba(0,0,0,0.3); padding: 15px; text-align: center;">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        Booked: ${new Date().toLocaleString("en-US", { 
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

    // Send confirmation email to user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your Sales Strategy Call is Confirmed! 🎯`,
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
      <h1 style="color: white; margin: 0; font-size: 24px;">You're Booked! 🎉</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Sales Strategy Call Confirmed</p>
    </div>
    
    <div style="padding: 30px;">
      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
        Hi ${name.split(" ")[0]},
      </p>
      
      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
        Great news! Your sales strategy call is confirmed. We'll discuss your sales process and show you exactly which tools would have the biggest impact on your pipeline.
      </p>
      
      <!-- Call Details -->
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;">
        <p style="color: #10B981; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Call</p>
        <p style="color: white; margin: 0; font-size: 20px; font-weight: 600;">
          ${formattedDate}
        </p>
        <p style="color: white; margin: 5px 0 0; font-size: 18px;">
          at ${formattedTime}
        </p>
      </div>
      
      <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
        We'll send you a calendar invite with the meeting link shortly. In the meantime, think about:
      </p>
      
      <ul style="color: #e5e7eb; font-size: 14px; line-height: 1.8; margin: 0 0 25px; padding-left: 20px;">
        <li>Your biggest pain points in the sales process</li>
        <li>What tools would make your reps' lives easier</li>
        <li>How you currently handle ROI questions from prospects</li>
      </ul>
      
      <p style="color: #e5e7eb; font-size: 16px; line-height: 1.6; margin: 0;">
        Looking forward to chatting!
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center;">
      <p style="color: #10B981; font-size: 18px; font-weight: 600; margin: 0 0 5px;">ZiziCo Sales</p>
      <p style="color: #6b7280; font-size: 12px; margin: 0;">AI-Powered Sales Tools</p>
    </div>
    
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      bookingId,
      message: "Booking confirmed" 
    });
  } catch (error) {
    console.error("Error processing sales booking:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}
