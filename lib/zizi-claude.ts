// ZiziCo AI Ops - Claude Integration for AI Insights Generation

import Anthropic from "@anthropic-ai/sdk";
import {
  CompanyInsights,
  DepartmentInsights,
  PersonalInsights,
  AIInsights,
  extractDomainFromEmail,
} from "./storage";

// API key must be set in environment variable
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

/**
 * Generate all AI insights for a booking
 */
export async function generateAllInsights(
  email: string,
  jobTitle: string,
  challenge: string,
  idealOutcome?: string
): Promise<AIInsights> {
  const domain = extractDomainFromEmail(email);
  
  // Generate all insights in parallel
  const [companyInsights, departmentInsights, personalInsights] = await Promise.all([
    generateCompanyInsights(domain, challenge, idealOutcome),
    generateDepartmentInsights(jobTitle, domain, challenge),
    generatePersonalInsights(jobTitle, challenge, idealOutcome),
  ]);

  return {
    companyInsights,
    departmentInsights,
    personalInsights,
  };
}

// Common personal/generic email domains that shouldn't be "analyzed" as companies
const GENERIC_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
  'live.com', 'msn.com', 'me.com', 'mac.com', 'googlemail.com'
];

function isGenericEmailDomain(domain: string): boolean {
  return GENERIC_EMAIL_DOMAINS.includes(domain.toLowerCase());
}

/**
 * Generate company-wide AI insights based on the domain
 * Used for the confirmation email
 */
export async function generateCompanyInsights(
  domain: string,
  challenge: string,
  idealOutcome?: string
): Promise<CompanyInsights> {
  // For generic email domains, use challenge-based insights instead
  if (isGenericEmailDomain(domain)) {
    return generateChallengeBasedInsights(challenge, idealOutcome);
  }

  const prompt = `You are a friendly AI consultant at ZiziCo, an AI ops agency. Based on the information provided, suggest how AI can help this business.

## INFORMATION PROVIDED
- Company Website: ${domain}
- The Challenge They Shared: "${challenge}"
- What They Want to Achieve: "${idealOutcome || "Not specified"}"

## YOUR TASK
Write helpful, friendly suggestions for how AI can transform their business. Focus on SOLUTIONS, not analyzing who they are.

IMPORTANT TONE GUIDELINES:
- Be helpful and enthusiastic, NOT analytical or surveillance-like
- Write as if you're excited to help them, not studying them
- Focus on possibilities and solutions, not observations about them
- The "description" should briefly acknowledge their work and pivot to excitement about helping

Respond in this exact JSON format (no markdown, just pure JSON):
{
  "companyName": "Company name from the domain (just capitalize the domain prefix nicely)",
  "companyDomain": "${domain}",
  "industry": "Their likely industry",
  "description": "A brief, friendly 1-2 sentence intro that acknowledges what they do and expresses excitement about helping them with AI. Example: 'You're building something great at [Company], and we're excited to show you how AI can take it to the next level.'",
  "aiOpportunities": [
    "Specific AI solution 1 that addresses their challenge",
    "Specific AI solution 2 with clear benefit",
    "Specific AI solution 3 with clear benefit",
    "Specific AI solution 4 with clear benefit",
    "Specific AI solution 5 with clear benefit"
  ],
  "potentialImpact": "The exciting outcome they can expect (e.g., 'Save 20+ hours per week while improving quality')",
  "recommendedSystems": [
    "AI system we'd build for them 1",
    "AI system we'd build for them 2",
    "AI system we'd build for them 3"
  ]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text.trim());
  } catch (error) {
    console.error("Error generating company insights:", error);
    return generateFallbackCompanyInsights(domain, challenge);
  }
}

/**
 * Generate department-specific AI insights based on job title
 * Used for the day-before reminder email
 */
export async function generateDepartmentInsights(
  jobTitle: string,
  domain: string,
  challenge: string
): Promise<DepartmentInsights> {
  const prompt = `You are an AI consultant at ZiziCo. Analyze how AI can help a specific department based on the job title.

## INPUTS
- Job Title: ${jobTitle}
- Company Domain: ${domain}
- Their Challenge: "${challenge}"

## YOUR TASK
Determine what department this person is in based on their job title, and provide AI solutions specifically for that DEPARTMENT (not just the individual).

Respond in this exact JSON format (no markdown, just pure JSON):
{
  "department": "Inferred department (e.g., Marketing, Sales, Operations, Engineering, Finance, HR, Customer Success)",
  "role": "${jobTitle}",
  "departmentChallenges": [
    "Common challenge 1 for this department",
    "Common challenge 2 for this department",
    "Common challenge 3 for this department"
  ],
  "aiSolutions": [
    "AI solution 1 specifically for this department with benefit",
    "AI solution 2 specifically for this department with benefit",
    "AI solution 3 specifically for this department with benefit",
    "AI solution 4 specifically for this department with benefit"
  ],
  "expectedTimesSaved": "Estimated time saved per week for the department (e.g., '15-20 hours')",
  "keyBenefits": [
    "Key benefit 1 for the department",
    "Key benefit 2 for the department",
    "Key benefit 3 for the department"
  ]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text.trim());
  } catch (error) {
    console.error("Error generating department insights:", error);
    return generateFallbackDepartmentInsights(jobTitle);
  }
}

/**
 * Generate personal AI insights for the individual
 * Used for the 2-hour and 20-minute reminder emails
 */
export async function generatePersonalInsights(
  jobTitle: string,
  challenge: string,
  idealOutcome?: string
): Promise<PersonalInsights> {
  const prompt = `You are an AI consultant at ZiziCo. Provide personalized AI assistance recommendations for an individual based on their role.

## INPUTS
- Job Title: ${jobTitle}
- Their Personal Challenge: "${challenge}"
- Desired Outcome: "${idealOutcome || "Not specified"}"

## YOUR TASK
Provide highly personalized AI assistance recommendations that would help THIS SPECIFIC PERSON in their daily work.

Respond in this exact JSON format (no markdown, just pure JSON):
{
  "role": "${jobTitle}",
  "personalChallenges": [
    "Specific challenge this role faces 1",
    "Specific challenge this role faces 2",
    "Specific challenge this role faces 3"
  ],
  "aiAssistance": [
    "How AI can personally assist them 1",
    "How AI can personally assist them 2",
    "How AI can personally assist them 3",
    "How AI can personally assist them 4"
  ],
  "dailyWorkflowImprovements": [
    "Daily workflow improvement 1",
    "Daily workflow improvement 2",
    "Daily workflow improvement 3"
  ],
  "quickWins": [
    "Quick win they can achieve in week 1",
    "Quick win they can achieve in week 2",
    "Quick win they can achieve in month 1"
  ]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text.trim());
  } catch (error) {
    console.error("Error generating personal insights:", error);
    return generateFallbackPersonalInsights(jobTitle, challenge);
  }
}

/**
 * Generate insights based purely on the challenge (for generic email domains)
 */
async function generateChallengeBasedInsights(
  challenge: string,
  idealOutcome?: string
): Promise<CompanyInsights> {
  const prompt = `You are a friendly AI consultant at ZiziCo, an AI ops agency. Someone reached out about getting AI help for their business.

## WHAT THEY TOLD US
- Their Challenge: "${challenge}"
- What They Want: "${idealOutcome || "Not specified"}"

## YOUR TASK
Based ONLY on their challenge (not their email domain), provide helpful AI solutions. Be warm, friendly, and focused on solutions.

IMPORTANT: 
- Do NOT mention anything about email domains, Gmail, or how they contacted us
- Focus entirely on solving their challenge with AI
- Be enthusiastic about helping them

Respond in this exact JSON format (no markdown, just pure JSON):
{
  "companyName": "Your Business",
  "companyDomain": "",
  "industry": "Infer from their challenge, or use 'Business Services' if unclear",
  "description": "We love that you're looking to leverage AI! Based on what you've shared, we see some exciting opportunities to help streamline your work and save you serious time.",
  "aiOpportunities": [
    "AI solution 1 directly addressing their challenge",
    "AI solution 2 with specific benefit",
    "AI solution 3 with specific benefit",
    "AI solution 4 with specific benefit",
    "AI solution 5 with specific benefit"
  ],
  "potentialImpact": "The outcome they can expect (e.g., 'Save 15-20 hours per week on manual tasks')",
  "recommendedSystems": [
    "Custom AI system tailored to their needs 1",
    "Custom AI system 2",
    "Custom AI system 3"
  ]
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return JSON.parse(textContent.text.trim());
  } catch (error) {
    console.error("Error generating challenge-based insights:", error);
    return generateFallbackCompanyInsights("", challenge);
  }
}

// Fallback functions for when API fails
function generateFallbackCompanyInsights(domain: string, challenge: string): CompanyInsights {
  // For generic/empty domains, use friendly generic messaging
  const isGeneric = !domain || isGenericEmailDomain(domain);
  const companyName = isGeneric ? "Your Business" : (domain.split(".")[0] || "Your Company");
  const formattedName = isGeneric ? companyName : companyName.charAt(0).toUpperCase() + companyName.slice(1);
  
  return {
    companyName: formattedName,
    companyDomain: isGeneric ? "" : domain,
    industry: "Business Services",
    description: "We're excited to explore how AI can transform the way you work! Based on what you've shared, there are some great opportunities to save time and boost productivity.",
    aiOpportunities: [
      "Automate repetitive tasks to free up 10+ hours per week for high-value work",
      "Build AI assistants that handle routine inquiries and scheduling automatically",
      "Create smart workflows that reduce manual data entry and eliminate errors",
      "Implement AI-powered tools to speed up decision-making with real-time insights",
      "Deploy custom automation that scales with your business without adding headcount",
    ],
    potentialImpact: "Save 15-25 hours per week while improving quality and consistency",
    recommendedSystems: [
      "Custom Workflow Automation System",
      "AI-Powered Assistant for Your Team",
      "Smart Reporting & Insights Dashboard",
    ],
  };
}

function generateFallbackDepartmentInsights(jobTitle: string): DepartmentInsights {
  const department = inferDepartment(jobTitle);
  
  return {
    department,
    role: jobTitle,
    departmentChallenges: [
      "Managing high volume of repetitive tasks",
      "Maintaining consistency across team outputs",
      "Scaling operations without proportionally increasing headcount",
    ],
    aiSolutions: [
      "Automated task processing to handle routine work",
      "AI quality assurance to maintain consistency",
      "Intelligent workflow routing for efficient resource allocation",
      "Predictive analytics for better planning and forecasting",
    ],
    expectedTimesSaved: "10-15 hours per week",
    keyBenefits: [
      "Reduced operational costs",
      "Improved team productivity",
      "Better work-life balance for team members",
    ],
  };
}

function generateFallbackPersonalInsights(jobTitle: string, challenge: string): PersonalInsights {
  return {
    role: jobTitle,
    personalChallenges: [
      "Spending too much time on administrative tasks",
      "Difficulty staying on top of all communications",
      "Need to make faster, data-driven decisions",
    ],
    aiAssistance: [
      "AI assistant to handle email drafting and responses",
      "Automated scheduling and calendar management",
      "Real-time insights and recommendations",
      "Smart document generation and analysis",
    ],
    dailyWorkflowImprovements: [
      "Start your day with AI-generated priority list",
      "Get instant summaries of long documents and threads",
      "Automate follow-ups and reminders",
    ],
    quickWins: [
      "Week 1: Automate your most repetitive daily task",
      "Week 2: Set up AI-powered email filtering and prioritization",
      "Month 1: Full workflow automation saving 5+ hours weekly",
    ],
  };
}

function inferDepartment(jobTitle: string): string {
  const title = jobTitle.toLowerCase();
  
  if (title.includes("market") || title.includes("brand") || title.includes("content") || title.includes("seo") || title.includes("social")) {
    return "Marketing";
  }
  if (title.includes("sales") || title.includes("business develop") || title.includes("account exec")) {
    return "Sales";
  }
  if (title.includes("engineer") || title.includes("develop") || title.includes("software") || title.includes("tech")) {
    return "Engineering";
  }
  if (title.includes("operat") || title.includes("project") || title.includes("program")) {
    return "Operations";
  }
  if (title.includes("finance") || title.includes("account") || title.includes("cfo")) {
    return "Finance";
  }
  if (title.includes("hr") || title.includes("human") || title.includes("people") || title.includes("recruit")) {
    return "Human Resources";
  }
  if (title.includes("customer") || title.includes("success") || title.includes("support")) {
    return "Customer Success";
  }
  if (title.includes("ceo") || title.includes("coo") || title.includes("founder") || title.includes("president") || title.includes("director") || title.includes("vp") || title.includes("head")) {
    return "Executive Leadership";
  }
  
  return "Operations";
}
