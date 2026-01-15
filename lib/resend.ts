// ZiziCo AI Ops - Email Templates using Resend

import { Resend } from "resend";
import { CompanyInsights, DepartmentInsights, PersonalInsights, ZiziCoBooking } from "./storage";
import { ZIZI_BRANDING, ZIZI_ZOOM_MEETING, ZIZI_PRICING } from "./zizi-constants";

// Workspace types for email
interface WorkspaceWelcomeEmailProps {
  to: string;
  clientName: string;
  companyName: string;
  accessCode: string;
  workspaceUrl: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || "hello@zizi.ai";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "team@zizi.ai";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

interface ZiziCoConfirmationEmailProps {
  to: string;
  name: string;
  jobTitle: string;
  date: string;
  time: string;
  zoomLink: string;
  companyInsights: CompanyInsights | null;
}

interface ZiziCoAdminNotificationProps {
  booking: ZiziCoBooking;
  companyInsights: CompanyInsights | null;
}

interface ZiziCoReminderEmailProps {
  to: string;
  name: string;
  jobTitle: string;
  date: string;
  time: string;
  zoomLink: string;
  reminderType: "dayBefore" | "twoHours" | "twentyMins";
  departmentInsights?: DepartmentInsights;
  personalInsights?: PersonalInsights;
}

// Format time for display
function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Send contact form email (existing functionality)
 */
export async function sendContactEmail({
  name,
  email,
  message,
}: ContactEmailProps): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #06B6D4;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

/**
 * Send ZiziCo booking confirmation email with company-wide AI insights
 */
export async function sendZiziCoConfirmationEmail({
  to,
  name,
  jobTitle,
  date,
  time,
  zoomLink,
  companyInsights,
}: ZiziCoConfirmationEmailProps): Promise<{ success: boolean; error?: string }> {
  const firstName = name.split(" ")[0];
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);

  // Generate company AI insights section
  const companyInsightsHtml = companyInsights ? `
    <!-- Company AI Insights Document -->
    <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 25px; margin: 25px 0;">
      <h3 style="color: #06B6D4; margin: 0 0 15px; font-size: 18px;">📊 How AI Can Transform ${companyInsights.companyName}</h3>
      
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 20px; line-height: 1.6;">
        Based on our research of ${companyInsights.companyDomain}, here's how AI can help your entire organization:
      </p>
      
      <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">About ${companyInsights.companyName}</h4>
        <p style="color: #9ca3af; font-size: 13px; margin: 0; line-height: 1.6;">
          ${companyInsights.description}
        </p>
      </div>
      
      <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">🚀 Company-Wide AI Opportunities</h4>
      <ul style="color: #9ca3af; margin: 0 0 20px; padding-left: 20px; line-height: 1.8;">
        ${companyInsights.aiOpportunities.map(opp => `<li style="margin-bottom: 8px;">${opp}</li>`).join("")}
      </ul>
      
      <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">💡 Recommended AI Systems</h4>
      <ul style="color: #9ca3af; margin: 0 0 20px; padding-left: 20px; line-height: 1.8;">
        ${companyInsights.recommendedSystems.map(sys => `<li>${sys}</li>`).join("")}
      </ul>
      
      <div style="background: rgba(6, 182, 212, 0.1); border-radius: 8px; padding: 15px; text-align: center;">
        <p style="color: #06B6D4; font-size: 14px; margin: 0; font-weight: 600;">
          Potential Impact: ${companyInsights.potentialImpact}
        </p>
      </div>
    </div>
  ` : "";

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your ${ZIZI_BRANDING.name} Discovery Call is Confirmed 🚀`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #0a0a0f 100%); padding: 40px 30px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #06B6D4; font-size: 32px; margin: 0; font-weight: bold;">${ZIZI_BRANDING.name}</h1>
      <p style="color: #9ca3af; margin: 5px 0 0;">${ZIZI_BRANDING.tagline}</p>
    </div>
    
    <!-- Confirmation Badge -->
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #06B6D4, #0891B2); padding: 15px 30px; border-radius: 50px;">
        <span style="color: white; font-size: 18px; font-weight: 600;">✓ Call Confirmed!</span>
      </div>
    </div>
    
    <!-- Greeting -->
    <p style="color: #e5e7eb; font-size: 18px; margin-bottom: 25px;">
      Hey ${firstName}! 👋
    </p>
    
    <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      Your discovery call is locked in. As a ${jobTitle}, we've already started researching how AI can specifically help you and your company.
    </p>
    
    <!-- Meeting Details Box -->
    <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 25px; margin-bottom: 30px;">
      <h3 style="color: #06B6D4; margin: 0 0 20px; font-size: 16px;">📅 YOUR CALL DETAILS</h3>
      
      <table style="width: 100%;">
        <tr>
          <td style="color: #9ca3af; padding: 8px 0;">Date:</td>
          <td style="color: #e5e7eb; font-weight: 600; text-align: right;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="color: #9ca3af; padding: 8px 0;">Time:</td>
          <td style="color: #e5e7eb; font-weight: 600; text-align: right;">${formattedTime} (15 min)</td>
        </tr>
        <tr>
          <td style="color: #9ca3af; padding: 8px 0;">Location:</td>
          <td style="color: #e5e7eb; font-weight: 600; text-align: right;">Zoom Meeting</td>
        </tr>
      </table>
      
      <div style="margin-top: 20px; text-align: center;">
        <a href="${zoomLink}" style="display: inline-block; background: #06B6D4; color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600;">
          Join Zoom Call →
        </a>
      </div>
    </div>
    
    ${companyInsightsHtml}
    
    <!-- What to Prepare -->
    <div style="margin-bottom: 30px;">
      <h3 style="color: #e5e7eb; margin: 0 0 15px; font-size: 18px;">📋 Before Our Call</h3>
      
      <ul style="color: #9ca3af; padding-left: 20px; line-height: 1.8;">
        <li>Have examples of repetitive tasks you want automated</li>
        <li>Know your biggest time sinks</li>
        <li>Think about what "success" looks like</li>
        <li>Be ready to share any failed automation attempts</li>
      </ul>
    </div>
    
    <!-- Pricing Footer -->
    <div style="text-align: center; padding: 25px 0; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 20px;">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 5px;">
        Starting at <span style="color: #06B6D4; font-weight: 600;">$${ZIZI_PRICING.monthly.toLocaleString()}/mo</span>
      </p>
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        ${ZIZI_PRICING.description}
      </p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} ${ZIZI_BRANDING.name}. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error: "Failed to send confirmation email" };
  }
}

/**
 * Send admin notification when a new booking is made
 */
export async function sendZiziCoAdminNotification({
  booking,
  companyInsights,
}: ZiziCoAdminNotificationProps): Promise<{ success: boolean; error?: string }> {
  const formattedDate = formatDate(booking.date);
  const formattedTime = formatTime(booking.time);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🔔 New ZiziCo Booking: ${booking.name} - ${booking.jobTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #06B6D4, #0891B2); padding: 25px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">New ZiziCo Booking! 🎉</h1>
    </div>
    
    <div style="padding: 30px;">
      
      <!-- Contact Details -->
      <h2 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
        📧 Contact Details
      </h2>
      
      <table style="width: 100%; margin-bottom: 25px;">
        <tr>
          <td style="color: #6b7280; padding: 8px 0; width: 120px;">Name:</td>
          <td style="color: #1f2937; font-weight: 600;">${booking.name}</td>
        </tr>
        <tr>
          <td style="color: #6b7280; padding: 8px 0;">Email:</td>
          <td style="color: #1f2937;"><a href="mailto:${booking.email}" style="color: #06B6D4;">${booking.email}</a></td>
        </tr>
        <tr>
          <td style="color: #6b7280; padding: 8px 0;">Job Title:</td>
          <td style="color: #1f2937; font-weight: 600;">${booking.jobTitle}</td>
        </tr>
      </table>
      
      <!-- Meeting Details -->
      <h2 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
        📅 Meeting Details
      </h2>
      
      <table style="width: 100%; margin-bottom: 25px;">
        <tr>
          <td style="color: #6b7280; padding: 8px 0; width: 120px;">Date:</td>
          <td style="color: #1f2937; font-weight: 600;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="color: #6b7280; padding: 8px 0;">Time:</td>
          <td style="color: #1f2937; font-weight: 600;">${formattedTime}</td>
        </tr>
        <tr>
          <td style="color: #6b7280; padding: 8px 0;">Zoom:</td>
          <td><a href="${ZIZI_ZOOM_MEETING.link}" style="color: #06B6D4;">Join Meeting</a></td>
        </tr>
      </table>
      
      <!-- Their Challenge -->
      <h2 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
        💡 Their Challenge
      </h2>
      
      <div style="background: #f9fafb; border-left: 4px solid #06B6D4; padding: 15px; margin-bottom: 15px; border-radius: 0 8px 8px 0;">
        <p style="color: #374151; margin: 0; line-height: 1.6;">${booking.challenge}</p>
      </div>
      
      ${booking.idealOutcome ? `
      <h3 style="color: #6b7280; margin: 0 0 10px; font-size: 14px;">Ideal Outcome:</h3>
      <div style="background: #f9fafb; padding: 15px; margin-bottom: 25px; border-radius: 8px;">
        <p style="color: #374151; margin: 0; line-height: 1.6;">${booking.idealOutcome}</p>
      </div>
      ` : ""}
      
      ${companyInsights ? `
      <!-- AI-Generated Company Insights -->
      <h2 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
        🤖 AI Research: ${companyInsights.companyName}
      </h2>
      
      <div style="background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1)); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
        <p style="color: #4b5563; margin: 0 0 15px; line-height: 1.6;">${companyInsights.description}</p>
        
        <p style="color: #6b7280; margin: 0;"><strong>Industry:</strong> ${companyInsights.industry}</p>
        <p style="color: #6b7280; margin: 5px 0 0;"><strong>Potential Impact:</strong> ${companyInsights.potentialImpact}</p>
      </div>
      ` : ""}
      
    </div>
    
    <!-- Footer -->
    <div style="background: #f3f4f6; padding: 15px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Booking ID: ${booking.id} | Created: ${new Date(booking.createdAt).toLocaleString()}
      </p>
    </div>
    
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error: "Failed to send admin notification" };
  }
}

/**
 * Send reminder email with appropriate insights based on timing
 * - Day before: Department insights
 * - 2 hours before: Personal insights (focus on role)
 * - 20 minutes before: Personal insights (quick summary)
 */
export async function sendZiziCoReminderEmail({
  to,
  name,
  jobTitle,
  date,
  time,
  zoomLink,
  reminderType,
  departmentInsights,
  personalInsights,
}: ZiziCoReminderEmailProps): Promise<{ success: boolean; error?: string }> {
  const firstName = name.split(" ")[0];
  const formattedTime = formatTime(time);
  const formattedDate = formatDate(date);

  let subject = "";
  let urgencyBadge = "";
  let insightsHtml = "";
  let message = "";

  switch (reminderType) {
    case "dayBefore":
      subject = `📅 Tomorrow: Your ${ZIZI_BRANDING.name} Discovery Call`;
      urgencyBadge = "Tomorrow";
      message = "Here's how AI can specifically help your department:";
      if (departmentInsights) {
        insightsHtml = `
          <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #06B6D4; margin: 0 0 15px; font-size: 18px;">🏢 AI for Your ${departmentInsights.department} Team</h3>
            
            <p style="color: #9ca3af; font-size: 14px; margin: 0 0 20px; line-height: 1.6;">
              As a ${jobTitle}, here's how AI can transform your department:
            </p>
            
            <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">Common ${departmentInsights.department} Challenges We Solve</h4>
            <ul style="color: #9ca3af; margin: 0 0 20px; padding-left: 20px; line-height: 1.8;">
              ${departmentInsights.departmentChallenges.map(c => `<li>${c}</li>`).join("")}
            </ul>
            
            <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">🚀 AI Solutions for ${departmentInsights.department}</h4>
            <ul style="color: #9ca3af; margin: 0 0 20px; padding-left: 20px; line-height: 1.8;">
              ${departmentInsights.aiSolutions.map(s => `<li>${s}</li>`).join("")}
            </ul>
            
            <div style="background: rgba(6, 182, 212, 0.1); border-radius: 8px; padding: 15px; text-align: center;">
              <p style="color: #06B6D4; font-size: 14px; margin: 0; font-weight: 600;">
                Expected Time Saved: ${departmentInsights.expectedTimesSaved} per week
              </p>
            </div>
          </div>
        `;
      }
      break;

    case "twoHours":
      subject = `⏰ In 2 Hours: Your ${ZIZI_BRANDING.name} Discovery Call`;
      urgencyBadge = "2 Hours Away";
      message = "Here's a personalized preview of how AI can help YOU specifically:";
      if (personalInsights) {
        insightsHtml = `
          <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 16px; padding: 25px; margin: 25px 0;">
            <h3 style="color: #8B5CF6; margin: 0 0 15px; font-size: 18px;">👤 AI Assistance for You as ${jobTitle}</h3>
            
            <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">How AI Can Help You Daily</h4>
            <ul style="color: #9ca3af; margin: 0 0 20px; padding-left: 20px; line-height: 1.8;">
              ${personalInsights.aiAssistance.map(a => `<li>${a}</li>`).join("")}
            </ul>
            
            <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">🎯 Daily Workflow Improvements</h4>
            <ul style="color: #9ca3af; margin: 0 0 20px; padding-left: 20px; line-height: 1.8;">
              ${personalInsights.dailyWorkflowImprovements.map(i => `<li>${i}</li>`).join("")}
            </ul>
            
            <h4 style="color: #e5e7eb; margin: 0 0 10px; font-size: 14px;">⚡ Quick Wins We'll Discuss</h4>
            <ul style="color: #9ca3af; margin: 0 0 0; padding-left: 20px; line-height: 1.8;">
              ${personalInsights.quickWins.map(w => `<li>${w}</li>`).join("")}
            </ul>
          </div>
        `;
      }
      break;

    case "twentyMins":
      subject = `🚀 Starting in 20 Minutes: Your ${ZIZI_BRANDING.name} Call`;
      urgencyBadge = "Starting Soon!";
      message = "Quick reminder of what we'll cover:";
      insightsHtml = `
        <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 20px; margin: 25px 0;">
          <h4 style="color: #06B6D4; margin: 0 0 15px; font-size: 16px;">📋 Call Agenda</h4>
          <ul style="color: #e5e7eb; margin: 0; padding-left: 20px; line-height: 2;">
            <li>Your current challenges and workflows</li>
            <li>AI solutions tailored for your role as ${jobTitle}</li>
            <li>Quick wins you can achieve in week 1</li>
            <li>Next steps if it's a good fit</li>
          </ul>
        </div>
      `;
      break;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #0a0a0f 100%); padding: 40px 30px;">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #06B6D4; font-size: 28px; margin: 0;">${ZIZI_BRANDING.name}</h1>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
      <span style="display: inline-block; background: ${reminderType === "twentyMins" ? "#fef3c7" : "rgba(6, 182, 212, 0.2)"}; color: ${reminderType === "twentyMins" ? "#92400e" : "#06B6D4"}; padding: 10px 25px; border-radius: 50px; font-weight: 600;">
        ${reminderType === "twentyMins" ? "🔔" : "📅"} ${urgencyBadge}
      </span>
    </div>
    
    <p style="color: #e5e7eb; font-size: 18px; text-align: center; margin-bottom: 10px;">
      Hey ${firstName}!
    </p>
    
    <p style="color: #9ca3af; font-size: 16px; text-align: center; margin-bottom: 30px;">
      ${message}
    </p>
    
    <div style="background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; padding: 20px; margin-bottom: 30px; text-align: center;">
      <p style="color: #9ca3af; margin: 0 0 5px;">${formattedDate}</p>
      <p style="color: #e5e7eb; font-size: 24px; font-weight: bold; margin: 0;">${formattedTime}</p>
    </div>
    
    ${insightsHtml}
    
    <div style="text-align: center; margin-bottom: 30px;">
      <a href="${zoomLink}" style="display: inline-block; background: linear-gradient(135deg, #06B6D4, #0891B2); color: white; text-decoration: none; padding: 15px 40px; border-radius: 10px; font-weight: 600; font-size: 16px;">
        Join Zoom Call →
      </a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; text-align: center;">
      See you soon! 🚀
    </p>
    
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending reminder email:", error);
    return { success: false, error: "Failed to send reminder email" };
  }
}

/**
 * Send workspace welcome email when a new workspace is created
 * Includes access code, workspace URL, and onboarding instructions
 */
export async function sendWorkspaceWelcomeEmail({
  to,
  clientName,
  companyName,
  accessCode,
  workspaceUrl,
}: WorkspaceWelcomeEmailProps): Promise<{ success: boolean; error?: string }> {
  const firstName = clientName.split(" ")[0];

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `🚀 Welcome to ZiziCo! Your ${companyName} Workspace is Ready`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #0a0a0f 100%); padding: 40px 30px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #06B6D4; font-size: 32px; margin: 0; font-weight: bold;">ZiziCo</h1>
      <p style="color: #9ca3af; margin: 5px 0 0;">Your AI Ops Team</p>
    </div>
    
    <!-- Welcome Badge -->
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background: linear-gradient(135deg, #06B6D4, #8B5CF6); padding: 15px 30px; border-radius: 50px;">
        <span style="color: white; font-size: 18px; font-weight: 600;">🎉 Workspace Created!</span>
      </div>
    </div>
    
    <!-- Greeting -->
    <p style="color: #e5e7eb; font-size: 20px; margin-bottom: 15px;">
      Hey ${firstName}! 👋
    </p>
    
    <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      Great news! Your <strong style="color: #e5e7eb;">${companyName}</strong> workspace is now live and ready for you to start submitting AI build requests.
    </p>
    
    <!-- Access Code Box -->
    <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.15)); border: 2px solid rgba(6, 182, 212, 0.4); border-radius: 16px; padding: 30px; margin-bottom: 30px; text-align: center;">
      <p style="color: #9ca3af; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Access Code</p>
      <p style="color: #06B6D4; font-size: 36px; font-weight: bold; margin: 0; letter-spacing: 4px; font-family: monospace;">
        ${accessCode}
      </p>
      <p style="color: #6b7280; margin: 15px 0 0; font-size: 12px;">
        Keep this code safe - you'll need it to access your workspace
      </p>
    </div>
    
    <!-- Access Button -->
    <div style="text-align: center; margin-bottom: 40px;">
      <a href="${workspaceUrl}" style="display: inline-block; background: linear-gradient(135deg, #06B6D4, #0891B2); color: white; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px;">
        Access Your Workspace →
      </a>
    </div>
    
    <!-- How It Works -->
    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 25px; margin-bottom: 30px;">
      <h3 style="color: #e5e7eb; margin: 0 0 20px; font-size: 18px;">📋 How It Works</h3>
      
      <div style="margin-bottom: 20px;">
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="background: rgba(6, 182, 212, 0.2); color: #06B6D4; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">1</div>
          <div>
            <p style="color: #e5e7eb; margin: 0 0 3px; font-weight: 600;">Submit a Request</p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">Describe what you want built - be as detailed as possible</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="background: rgba(6, 182, 212, 0.2); color: #06B6D4; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">2</div>
          <div>
            <p style="color: #e5e7eb; margin: 0 0 3px; font-weight: 600;">We Build It</p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">Track real-time progress as we build your AI solution</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
          <div style="background: rgba(6, 182, 212, 0.2); color: #06B6D4; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">3</div>
          <div>
            <p style="color: #e5e7eb; margin: 0 0 3px; font-weight: 600;">Review & Approve</p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">Test the build, request changes if needed, then approve</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: flex-start;">
          <div style="background: rgba(34, 197, 94, 0.2); color: #22C55E; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0;">✓</div>
          <div>
            <p style="color: #e5e7eb; margin: 0 0 3px; font-weight: 600;">Done!</p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">Your AI system is live and maintained forever</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Timeline Info -->
    <div style="display: flex; gap: 15px; margin-bottom: 30px;">
      <div style="flex: 1; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 15px; text-align: center;">
        <p style="color: #22C55E; font-size: 24px; font-weight: bold; margin: 0;">1-2</p>
        <p style="color: #9ca3af; margin: 5px 0 0; font-size: 12px;">days for Simple builds</p>
      </div>
      <div style="flex: 1; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 15px; text-align: center;">
        <p style="color: #F59E0B; font-size: 24px; font-weight: bold; margin: 0;">5-7</p>
        <p style="color: #9ca3af; margin: 5px 0 0; font-size: 12px;">days for Complex builds</p>
      </div>
    </div>
    
    <!-- Support -->
    <div style="text-align: center; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        Need help? We're here for you.
      </p>
      <a href="mailto:support@zizi.so" style="color: #06B6D4; font-size: 14px;">support@zizi.so</a>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="color: #6b7280; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} ZiziCo. All rights reserved.
      </p>
    </div>
    
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending workspace welcome email:", error);
    return { success: false, error: "Failed to send workspace welcome email" };
  }
}
