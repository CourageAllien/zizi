import { RequestFormData } from './schemas/request-schema';

export interface RequestTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultValues: Partial<RequestFormData>;
}

export const requestTemplates: RequestTemplate[] = [
  {
    id: 'preview-tool',
    name: 'Preview Tool',
    icon: 'BarChart3',
    description: 'Help prospects analyze fit, calculate ROI, and compare benchmarks',
    defaultValues: {
      requestType: 'preview-tool',
      description: `I need a preview tool that helps prospects analyze fit, calculate ROI, and compare themselves to benchmarks.

**What it should do:**
1. Analyze: [Describe how you want to show fit with their situation]
2. Calculate: [What ROI metrics to show — time saved, money saved, etc.]
3. Compare: [What benchmarks to compare against]

**Inputs I want:**
- [e.g., Team size]
- [e.g., Current tools/process]
- [e.g., Time spent on manual tasks]

**Outputs I want:**
- [e.g., Fit analysis]
- [e.g., Projected annual savings]
- [e.g., Industry comparison]

**Call-to-action:**
- [e.g., Book a demo, Download report, Contact us]`,
      goals: ['generate-leads', 'qualify-leads', 'shorten-sales-cycle'],
      targetAudience: '[Describe your ideal prospect — role, company size, industry, pain points]',
    },
  },
  {
    id: 'assessment',
    name: 'Sales Assessment',
    icon: 'ClipboardCheck',
    description: 'Qualify leads with a scored questionnaire',
    defaultValues: {
      requestType: 'assessment',
      description: `I need an assessment/quiz that helps prospects evaluate their [maturity/readiness/fit].

**Topic/Theme:**
- [e.g., Sales process maturity, Marketing readiness, Security posture]

**Number of questions:**
- [e.g., 8-12 questions]

**Scoring approach:**
- [e.g., Score out of 100, Levels like Beginner/Intermediate/Advanced, Letter grades]

**What happens after:**
- [e.g., Show personalized results, Capture email for detailed report, Recommend specific solution tier]

**Questions I want to ask:**
1. [First question idea]
2. [Second question idea]
3. [Continue...]`,
      goals: ['qualify-leads', 'educate-prospects', 'generate-leads'],
      targetAudience: '[Describe the prospect taking this assessment — what are they trying to evaluate?]',
    },
  },
  {
    id: 'interactive-demo',
    name: 'Interactive Demo',
    icon: 'Play',
    description: 'Let prospects try before they buy',
    defaultValues: {
      requestType: 'interactive-demo',
      description: `I need an interactive demo that lets prospects experience our product/service before talking to sales.

**What to showcase:**
- [Key feature 1]
- [Key feature 2]
- [Key feature 3]

**User journey:**
1. [First step in the demo]
2. [Second step]
3. [Final step/CTA]

**Sample data to use:**
- [What dummy data or scenarios should we include?]

**Success metric:**
- [What do you want prospects to understand by the end?]`,
      goals: ['educate-prospects', 'shorten-sales-cycle', 'qualify-leads'],
      targetAudience: '[Describe who will use this demo — decision makers, end users, technical evaluators?]',
    },
  },
  {
    id: 'proposal-generator',
    name: 'Proposal Generator',
    icon: 'FileText',
    description: 'Generate custom proposals from intake form',
    defaultValues: {
      requestType: 'proposal-generator',
      description: `I need a proposal generator that creates custom proposals based on prospect inputs.

**Information to collect:**
- [e.g., Company name, Contact info]
- [e.g., Project scope, Requirements]
- [e.g., Budget range, Timeline]

**Proposal sections:**
- Executive Summary
- Scope of Work
- Pricing
- Timeline
- Terms & Conditions

**Pricing logic:**
- [How should pricing be calculated? Fixed tiers, per-unit, custom?]

**Output format:**
- [PDF download, On-screen preview, Email delivery?]`,
      goals: ['close-faster', 'shorten-sales-cycle'],
      targetAudience: '[Who will fill this out — sales reps, prospects directly, partners?]',
    },
  },
  {
    id: 'lead-magnet',
    name: 'Lead Magnet',
    icon: 'Magnet',
    description: 'Interactive resource to capture emails',
    defaultValues: {
      requestType: 'lead-magnet',
      description: `I need an interactive lead magnet to capture emails and provide value upfront.

**Type of resource:**
- [e.g., Calculator, Template generator, Checklist, Mini-assessment]

**Topic:**
- [What problem does this solve for the prospect?]

**Value proposition:**
- [What will they get in exchange for their email?]

**Lead capture fields:**
- Email (required)
- [Other fields? Name, Company, Role?]

**Follow-up:**
- [What happens after they submit? Instant access, Email delivery, Redirect?]`,
      goals: ['generate-leads', 'educate-prospects'],
      targetAudience: '[Describe the ideal lead you want to capture]',
    },
  },
  {
    id: 'benchmark-tool',
    name: 'Benchmark Tool',
    icon: 'TrendingUp',
    description: 'Show how prospects compare to peers',
    defaultValues: {
      requestType: 'benchmark-tool',
      description: `I need a benchmark tool that shows prospects how they compare to industry standards or peers.

**Metrics to benchmark:**
- [e.g., Conversion rate, Response time, Cost per lead]
- [e.g., Team efficiency, Tool adoption, Process maturity]

**Benchmark data source:**
- [Do you have industry data? Should we use general benchmarks?]

**Input fields:**
- [What information do we need from the prospect?]

**Output visualization:**
- [Charts, Gauges, Comparison tables?]

**Insight delivery:**
- [Personalized recommendations, Areas for improvement, Next steps?]`,
      goals: ['qualify-leads', 'educate-prospects', 'generate-leads'],
      targetAudience: '[Who cares about these benchmarks? What role/industry?]',
    },
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    icon: 'Layout',
    description: 'Campaign or product landing page',
    defaultValues: {
      requestType: 'landing-page',
      description: `I need a landing page for [campaign/product/launch].

**Page purpose:**
- [What action should visitors take?]

**Key sections:**
- Hero with headline and CTA
- [Problem/Pain points]
- [Solution/Benefits]
- [Social proof/Testimonials]
- [FAQ]
- [Final CTA]

**Primary CTA:**
- [e.g., Sign up, Book demo, Download, Purchase]

**Copy/Content:**
- [Provide key messaging or attach documents with content]

**Integrations:**
- [Form submissions to CRM? Email marketing? Analytics?]`,
      goals: ['generate-leads', 'educate-prospects'],
      targetAudience: '[Who is this page for? How will they find it?]',
    },
  },
  {
    id: 'sales-enablement',
    name: 'Sales Enablement',
    icon: 'Target',
    description: 'Battlecards, objection handlers, scripts',
    defaultValues: {
      requestType: 'sales-enablement',
      description: `I need sales enablement tools to help my team close more deals.

**What I need:**
- [ ] Battlecards (competitor comparisons)
- [ ] Objection handling guide
- [ ] Call scripts
- [ ] Email templates
- [ ] Discovery question framework
- [ ] ROI calculator for sales calls
- [ ] Other: [specify]

**Key competitors:**
- [List main competitors]

**Common objections:**
- [What objections does your team face?]

**Unique value props:**
- [What differentiates you?]

**Target format:**
- [Interactive tool, PDF, Internal portal, Searchable database?]`,
      goals: ['handle-objections', 'close-faster', 'shorten-sales-cycle'],
      targetAudience: '[Who will use these tools? SDRs, AEs, Customer Success?]',
    },
  },
];

export function getTemplateById(id: string): RequestTemplate | undefined {
  return requestTemplates.find(t => t.id === id);
}

export function getTemplateByRequestType(requestType: string): RequestTemplate | undefined {
  return requestTemplates.find(t => t.defaultValues.requestType === requestType);
}


