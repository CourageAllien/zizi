// Zizi AI Ops - Claude Integration for AI Insights Generation

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

/**
 * Generate company-wide AI insights based on the domain
 * Used for the confirmation email
 */
export async function generateCompanyInsights(
  domain: string,
  challenge: string,
  idealOutcome?: string
): Promise<CompanyInsights> {
  const prompt = `You are an AI consultant at Zizi, an AI ops agency. Analyze a company based on their domain and provide insights on how AI can help them.

## INPUTS
- Company Domain: ${domain}
- Their Challenge: "${challenge}"
- Desired Outcome: "${idealOutcome || "Not specified"}"

## YOUR TASK
Research what this company likely does based on the domain and provide comprehensive AI opportunities for the ENTIRE company.

Respond in this exact JSON format (no markdown, just pure JSON):
{
  "companyName": "inferred company name from domain",
  "companyDomain": "${domain}",
  "industry": "inferred industry",
  "description": "What this company likely does in 2-3 sentences",
  "aiOpportunities": [
    "Company-wide AI opportunity 1 with specific benefit",
    "Company-wide AI opportunity 2 with specific benefit",
    "Company-wide AI opportunity 3 with specific benefit",
    "Company-wide AI opportunity 4 with specific benefit",
    "Company-wide AI opportunity 5 with specific benefit"
  ],
  "potentialImpact": "Overall potential impact on the business (e.g., '30-50% increase in operational efficiency')",
  "recommendedSystems": [
    "Recommended AI system 1",
    "Recommended AI system 2",
    "Recommended AI system 3"
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
  const prompt = `You are an AI consultant at Zizi. Analyze how AI can help a specific department based on the job title.

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
  const prompt = `You are an AI consultant at Zizi. Provide personalized AI assistance recommendations for an individual based on their role.

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

// Fallback functions for when API fails
function generateFallbackCompanyInsights(domain: string, challenge: string): CompanyInsights {
  const companyName = domain.split(".")[0] || "Your Company";
  
  return {
    companyName: companyName.charAt(0).toUpperCase() + companyName.slice(1),
    companyDomain: domain,
    industry: "Technology/Services",
    description: `${companyName} is a forward-thinking organization looking to leverage AI to improve their operations and drive growth.`,
    aiOpportunities: [
      "Automate repetitive administrative tasks to free up 10+ hours per week",
      "Implement AI-powered customer support to reduce response times by 50%",
      "Use predictive analytics to improve business decision-making",
      "Automate data entry and reporting to eliminate manual errors",
      "Deploy AI assistants to handle routine inquiries and scheduling",
    ],
    potentialImpact: "25-40% increase in operational efficiency within 3 months",
    recommendedSystems: [
      "Smart Workflow Automation System",
      "AI-Powered Customer Support Bot",
      "Intelligent Reporting Dashboard",
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
