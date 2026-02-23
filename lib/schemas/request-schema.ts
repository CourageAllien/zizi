import { z } from 'zod';

// Request type options
export const REQUEST_TYPES = [
  { value: 'preview-tool', label: 'Preview Tool', icon: 'BarChart3', description: 'Analyze fit, calculate ROI, compare options' },
  { value: 'assessment', label: 'Assessment / Quiz', icon: 'ClipboardCheck', description: 'Score prospects, surface pain points, qualify leads' },
  { value: 'interactive-demo', label: 'Interactive Demo', icon: 'Play', description: 'Let prospects experience your product' },
  { value: 'proposal-generator', label: 'Proposal Generator', icon: 'FileText', description: 'Auto-generate custom proposals and quotes' },
  { value: 'benchmark-tool', label: 'Benchmark Tool', icon: 'TrendingUp', description: 'Show how prospects compare to industry standards' },
  { value: 'lead-magnet', label: 'Lead Magnet', icon: 'Magnet', description: 'Interactive templates, checklists, resources' },
  { value: 'landing-page', label: 'Landing Page', icon: 'Layout', description: 'Campaign pages, product pages, signup flows' },
  { value: 'client-portal', label: 'Client Portal', icon: 'Users', description: 'Onboarding flows, self-service dashboards' },
  { value: 'sales-enablement', label: 'Sales Enablement', icon: 'Target', description: 'Battlecards, objection handlers, scripts' },
  { value: 'integration', label: 'Integration / Automation', icon: 'Zap', description: 'Connect tools, automate workflows' },
  { value: 'other', label: 'Other', icon: 'PlusCircle', description: 'Something else entirely' },
] as const;

export const requestTypeValues = REQUEST_TYPES.map(t => t.value);

// Goal options
export const GOAL_OPTIONS = [
  { value: 'generate-leads', label: 'Generate leads (capture contact info)' },
  { value: 'qualify-leads', label: 'Qualify leads (help prospects self-select)' },
  { value: 'educate-prospects', label: 'Educate prospects (show value before the call)' },
  { value: 'shorten-sales-cycle', label: 'Shorten sales cycle (reduce friction)' },
  { value: 'handle-objections', label: 'Handle objections (address concerns proactively)' },
  { value: 'close-faster', label: 'Close deals faster (proposals, quotes, pricing)' },
  { value: 'onboard-customers', label: 'Onboard customers (post-sale activation)' },
  { value: 'other', label: 'Other' },
] as const;

// Branding options
export const BRANDING_OPTIONS = [
  { value: 'use-existing', label: 'Use my existing brand', description: "I'll upload logo, colors, and fonts" },
  { value: 'match-website', label: 'Match my website', description: "We'll pull styles from your site" },
  { value: 'start-fresh', label: 'Start fresh', description: "I don't have branding yet — create something clean" },
  { value: 'white-label', label: 'White-label', description: 'No branding — this is for client delivery' },
] as const;

// Hosting options
export const HOSTING_OPTIONS = [
  { value: 'host-for-me', label: 'Host it for me', description: "We'll set up a subdomain like tools.yourcompany.com", popular: true },
  { value: 'embed', label: "I'll embed it", description: 'Provide me embed code for my website' },
  { value: 'my-domain', label: 'Deploy to my domain', description: "I'll give you access to deploy directly" },
  { value: 'not-sure', label: 'Not sure yet', description: "Let's discuss after you build it" },
] as const;

// Integration options
export const INTEGRATION_OPTIONS = [
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'pipedrive', label: 'Pipedrive' },
  { value: 'zapier', label: 'Zapier' },
  { value: 'make', label: 'Make (Integromat)' },
  { value: 'slack', label: 'Slack notifications' },
  { value: 'email', label: 'Email notifications' },
  { value: 'google-sheets', label: 'Google Sheets' },
  { value: 'airtable', label: 'Airtable' },
  { value: 'none', label: 'None / Not sure yet' },
  { value: 'other', label: 'Other' },
] as const;

// Urgency options
export const URGENCY_OPTIONS = [
  { value: 'standard', label: 'Standard', description: '48-72 hours is perfect' },
  { value: 'priority', label: 'Priority', description: "I'd love it in 24-48 hours if possible" },
  { value: 'urgent', label: 'Urgent', description: 'I have a hard deadline' },
  { value: 'no-rush', label: 'No rush', description: 'Add to queue, whenever you get to it' },
] as const;

// Request form schema
export const requestFormSchema = z.object({
  // Step 1: Tool Type
  requestType: z.enum(requestTypeValues as [string, ...string[]], {
    message: 'Please select a tool type',
  }),
  otherRequestType: z.string().optional(),

  // Step 2: Details
  description: z.string()
    .min(50, 'Please provide more detail (at least 50 characters)')
    .max(5000, 'Description is too long'),
  targetAudience: z.string()
    .min(20, 'Please describe your target audience in more detail (at least 20 characters)')
    .max(2000, 'Target audience description is too long'),
  goals: z.array(z.string()).min(1, 'Please select at least one goal'),
  otherGoal: z.string().optional(),
  examples: z.string().max(3000).optional(),
  content: z.string().max(5000).optional(),

  // Step 3: Branding & Hosting
  brandingOption: z.enum(['use-existing', 'match-website', 'start-fresh', 'white-label'], {
    message: 'Please select a branding option',
  }),
  websiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  hostingOption: z.enum(['host-for-me', 'embed', 'my-domain', 'not-sure'], {
    message: 'Please select a hosting option',
  }),

  // Step 4: Integrations & Urgency
  integrations: z.array(z.string()).default([]),
  otherIntegration: z.string().optional(),
  urgency: z.enum(['standard', 'priority', 'urgent', 'no-rush'], {
    message: 'Please select an urgency level',
  }),
  deadline: z.string().optional(),
  urgencyReason: z.string().max(1000).optional(),
  additionalNotes: z.string().max(3000).optional(),

  // Files
  files: z.array(z.object({
    id: z.string(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    url: z.string().optional(),
  })).default([]),
}).superRefine((data, ctx) => {
  // Validate websiteUrl is required when brandingOption is 'match-website'
  if (data.brandingOption === 'match-website' && (!data.websiteUrl || data.websiteUrl.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please enter your website URL',
      path: ['websiteUrl'],
    });
  }

  // Validate deadline and urgencyReason are required when urgency is 'urgent'
  if (data.urgency === 'urgent') {
    if (!data.deadline) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a deadline date',
        path: ['deadline'],
      });
    }
    if (!data.urgencyReason || data.urgencyReason.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please explain why this is urgent',
        path: ['urgencyReason'],
      });
    }
  }

  // Validate otherRequestType when requestType is 'other'
  if (data.requestType === 'other' && (!data.otherRequestType || data.otherRequestType.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please describe what you need',
      path: ['otherRequestType'],
    });
  }

  // Validate otherIntegration when integrations includes 'other'
  if (data.integrations.includes('other') && (!data.otherIntegration || data.otherIntegration.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please specify the other integration',
      path: ['otherIntegration'],
    });
  }

  // Validate otherGoal when goals includes 'other'
  if (data.goals.includes('other') && (!data.otherGoal || data.otherGoal.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please describe the other goal',
      path: ['otherGoal'],
    });
  }
});

export type RequestFormData = z.infer<typeof requestFormSchema>;

// Request status types
export type ClientRequestStatus = 
  | 'queued'
  | 'in-progress'
  | 'ready-for-review'
  | 'revisions-requested'
  | 'completed';

export const REQUEST_STATUS_CONFIG: Record<ClientRequestStatus, { label: string; color: string; bgColor: string }> = {
  'queued': { label: 'In Queue', color: '#9CA3AF', bgColor: 'rgba(156, 163, 175, 0.1)' },
  'in-progress': { label: 'In Progress', color: '#06B6D4', bgColor: 'rgba(6, 182, 212, 0.1)' },
  'ready-for-review': { label: 'Ready for Review', color: '#EAB308', bgColor: 'rgba(234, 179, 8, 0.1)' },
  'revisions-requested': { label: 'Revisions Requested', color: '#F97316', bgColor: 'rgba(249, 115, 22, 0.1)' },
  'completed': { label: 'Completed', color: '#22C55E', bgColor: 'rgba(34, 197, 94, 0.1)' },
};

// Full request interface (stored in database)
export interface ClientRequest extends RequestFormData {
  id: string;
  userId: string;
  userEmail: string;
  status: ClientRequestStatus;
  previewUrl?: string;
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDelivery?: string;
  revisions: RequestRevision[];
  comments: RequestComment[];
}

export interface RequestRevision {
  id: string;
  requestId: string;
  description: string;
  files: Array<{ id: string; name: string; url?: string }>;
  createdAt: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface RequestComment {
  id: string;
  requestId: string;
  userId: string;
  userEmail: string;
  userName: string;
  message: string;
  createdAt: string;
  isInternal: boolean;
}

// Helper to get estimated delivery based on urgency
export function getEstimatedDelivery(urgency: string): string {
  const now = new Date();
  let daysToAdd = 3; // default standard

  switch (urgency) {
    case 'urgent':
      daysToAdd = 1;
      break;
    case 'priority':
      daysToAdd = 2;
      break;
    case 'standard':
      daysToAdd = 3;
      break;
    case 'no-rush':
      daysToAdd = 7;
      break;
  }

  const deliveryDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return deliveryDate.toISOString();
}

