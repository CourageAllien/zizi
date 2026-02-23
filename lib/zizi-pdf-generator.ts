// ZiziCo AI Ops - PDF Generator for AI Insights Documents

import { CompanyInsights, DepartmentInsights, PersonalInsights, ZiziCoBooking } from "./storage";
import { ZIZI_PRICING, ZIZI_BRANDING } from "./zizi-constants";

/**
 * Generate a PDF with company-wide AI insights
 */
export async function generateCompanyInsightsPDF(
  booking: ZiziCoBooking,
  insights: CompanyInsights
): Promise<Buffer> {
  try {
    const PDFDocument = (await import("pdfkit")).default;

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `AI Insights for ${insights.companyName}`,
          Author: ZIZI_BRANDING.name,
          Subject: `Company AI Opportunities`,
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header
      doc
        .fontSize(28)
        .fillColor("#06B6D4")
        .text(ZIZI_BRANDING.name, { align: "center" })
        .moveDown(0.2);

      doc
        .fontSize(12)
        .fillColor("#666666")
        .text(ZIZI_BRANDING.tagline, { align: "center" })
        .moveDown(2);

      // Title
      doc
        .fontSize(22)
        .fillColor("#000000")
        .text(`AI Opportunities for ${insights.companyName}`, { align: "center" })
        .moveDown(0.5);

      doc
        .fontSize(14)
        .fillColor("#06B6D4")
        .text(insights.industry, { align: "center" })
        .moveDown(2);

      // Prepared for
      doc
        .fontSize(10)
        .fillColor("#999999")
        .text(`Prepared for: ${booking.name}`, { align: "center" })
        .text(
          `Date: ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
          { align: "center" }
        )
        .moveDown(2);

      // Company Description
      doc.fontSize(14).fillColor("#06B6D4").text("ABOUT YOUR COMPANY").moveDown(0.5);
      doc
        .fontSize(11)
        .fillColor("#333333")
        .text(insights.description, { lineGap: 4 })
        .moveDown(1.5);

      // AI Opportunities
      doc.fontSize(14).fillColor("#06B6D4").text("AI OPPORTUNITIES").moveDown(0.5);
      insights.aiOpportunities.forEach((opp) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${opp}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // Recommended Systems
      doc.fontSize(14).fillColor("#06B6D4").text("RECOMMENDED AI SYSTEMS").moveDown(0.5);
      insights.recommendedSystems.forEach((sys) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${sys}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // Potential Impact
      doc.fontSize(14).fillColor("#06B6D4").text("POTENTIAL IMPACT").moveDown(0.5);
      doc
        .fontSize(12)
        .fillColor("#8B5CF6")
        .text(insights.potentialImpact, { align: "center" })
        .moveDown(2);

      // CTA
      doc
        .fontSize(12)
        .fillColor("#06B6D4")
        .text(`Ready to get started? $${ZIZI_PRICING.monthly.toLocaleString()}/month`, { align: "center" });
      doc
        .fontSize(10)
        .fillColor("#666666")
        .text(ZIZI_PRICING.description, { align: "center" });

      doc.end();
    });
  } catch {
    console.warn("PDFKit not available");
    return generateFallbackPDF(booking, insights);
  }
}

/**
 * Generate a PDF with department-specific AI insights
 */
export async function generateDepartmentInsightsPDF(
  booking: ZiziCoBooking,
  insights: DepartmentInsights
): Promise<Buffer> {
  try {
    const PDFDocument = (await import("pdfkit")).default;

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `AI for ${insights.department}`,
          Author: ZIZI_BRANDING.name,
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header
      doc.fontSize(28).fillColor("#06B6D4").text(ZIZI_BRANDING.name, { align: "center" }).moveDown(2);

      // Title
      doc
        .fontSize(22)
        .fillColor("#000000")
        .text(`AI Solutions for ${insights.department}`, { align: "center" })
        .moveDown(0.5);

      doc.fontSize(14).fillColor("#8B5CF6").text(`For: ${insights.role}`, { align: "center" }).moveDown(2);

      // Department Challenges
      doc.fontSize(14).fillColor("#06B6D4").text("DEPARTMENT CHALLENGES").moveDown(0.5);
      insights.departmentChallenges.forEach((challenge) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${challenge}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // AI Solutions
      doc.fontSize(14).fillColor("#06B6D4").text("AI SOLUTIONS").moveDown(0.5);
      insights.aiSolutions.forEach((solution) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${solution}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // Key Benefits
      doc.fontSize(14).fillColor("#06B6D4").text("KEY BENEFITS").moveDown(0.5);
      insights.keyBenefits.forEach((benefit) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${benefit}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // Time Saved
      doc.fontSize(14).fillColor("#06B6D4").text("EXPECTED TIME SAVED").moveDown(0.5);
      doc.fontSize(16).fillColor("#8B5CF6").text(insights.expectedTimesSaved, { align: "center" });

      doc.end();
    });
  } catch {
    return Buffer.from(`AI Solutions for ${insights.department}\n\n${insights.aiSolutions.join("\n")}`);
  }
}

/**
 * Generate a PDF with personal AI insights
 */
export async function generatePersonalInsightsPDF(
  booking: ZiziCoBooking,
  insights: PersonalInsights
): Promise<Buffer> {
  try {
    const PDFDocument = (await import("pdfkit")).default;

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: `Personal AI Guide for ${insights.role}`,
          Author: ZIZI_BRANDING.name,
        },
      });

      const chunks: Buffer[] = [];
      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Header
      doc.fontSize(28).fillColor("#06B6D4").text(ZIZI_BRANDING.name, { align: "center" }).moveDown(2);

      // Title
      doc.fontSize(22).fillColor("#000000").text(`Your Personal AI Guide`, { align: "center" }).moveDown(0.5);
      doc.fontSize(14).fillColor("#8B5CF6").text(`For: ${insights.role}`, { align: "center" }).moveDown(2);

      // How AI Can Help You
      doc.fontSize(14).fillColor("#06B6D4").text("HOW AI CAN HELP YOU").moveDown(0.5);
      insights.aiAssistance.forEach((item) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${item}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // Daily Workflow Improvements
      doc.fontSize(14).fillColor("#06B6D4").text("DAILY WORKFLOW IMPROVEMENTS").moveDown(0.5);
      insights.dailyWorkflowImprovements.forEach((item) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${item}`, { lineGap: 4 });
      });
      doc.moveDown(1.5);

      // Quick Wins
      doc.fontSize(14).fillColor("#06B6D4").text("QUICK WINS").moveDown(0.5);
      insights.quickWins.forEach((item) => {
        doc.fontSize(11).fillColor("#333333").text(`• ${item}`, { lineGap: 4 });
      });

      doc.end();
    });
  } catch {
    return Buffer.from(`Personal AI Guide for ${insights.role}\n\n${insights.aiAssistance.join("\n")}`);
  }
}

function generateFallbackPDF(booking: ZiziCoBooking, insights: CompanyInsights): Buffer {
  const content = `
${ZIZI_BRANDING.name.toUpperCase()}
${ZIZI_BRANDING.tagline}

====================================

AI OPPORTUNITIES FOR ${insights.companyName.toUpperCase()}
${insights.industry}

Prepared for: ${booking.name}
Date: ${new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}

====================================

ABOUT YOUR COMPANY
------------------
${insights.description}

AI OPPORTUNITIES
----------------
${insights.aiOpportunities.map((o) => `• ${o}`).join("\n")}

RECOMMENDED AI SYSTEMS
----------------------
${insights.recommendedSystems.map((s) => `• ${s}`).join("\n")}

POTENTIAL IMPACT
----------------
${insights.potentialImpact}

====================================

Ready to get started? $${ZIZI_PRICING.monthly.toLocaleString()}/month
${ZIZI_PRICING.description}

© ${new Date().getFullYear()} ${ZIZI_BRANDING.name}. All rights reserved.
`;

  return Buffer.from(content, "utf-8");
}


