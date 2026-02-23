import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email to receive problem submissions (for testing)
const ADMIN_EMAIL = "couragealison6@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(request: NextRequest) {
  try {
    const { problem, email, name, company } = await request.json();

    if (!problem || !email) {
      return NextResponse.json(
        { error: "Problem description and email are required" },
        { status: 400 }
      );
    }

    // Send email notification
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: email,
      subject: `🎯 New Problem Submission${company ? ` from ${company}` : ""}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1a1a24 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(6, 182, 212, 0.3);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 25px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Problem Submission</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Someone needs your help!</p>
    </div>
    
    <div style="padding: 30px;">
      
      <!-- Contact Info -->
      <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <h2 style="color: #06B6D4; margin: 0 0 15px; font-size: 16px;">📧 Contact Details</h2>
        <table style="width: 100%;">
          ${name ? `
          <tr>
            <td style="color: #9ca3af; padding: 5px 0; width: 100px;">Name:</td>
            <td style="color: #e5e7eb; font-weight: 600;">${name}</td>
          </tr>
          ` : ""}
          ${company ? `
          <tr>
            <td style="color: #9ca3af; padding: 5px 0;">Company:</td>
            <td style="color: #e5e7eb; font-weight: 600;">${company}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="color: #9ca3af; padding: 5px 0;">Email:</td>
            <td style="color: #e5e7eb;">
              <a href="mailto:${email}" style="color: #06B6D4; text-decoration: none;">${email}</a>
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Problem Description -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #e5e7eb; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid rgba(139, 92, 246, 0.3); padding-bottom: 10px;">
          💡 Their Problem
        </h2>
        <div style="background: rgba(255, 255, 255, 0.05); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 0 12px 12px 0;">
          <p style="color: #e5e7eb; margin: 0; line-height: 1.8; font-size: 15px; white-space: pre-wrap;">${problem}</p>
        </div>
      </div>
      
      <!-- Action Required -->
      <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 12px; padding: 20px; text-align: center;">
        <p style="color: #06B6D4; margin: 0; font-size: 14px; font-weight: 600;">
          ⏰ Respond within 24 hours
        </p>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 13px;">
          They're expecting a solution proposal
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
    console.error("Error processing problem submission:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

