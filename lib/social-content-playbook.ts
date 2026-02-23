// ZiziCo Social Content Playbook - Foundation for AI Content Generation

export const CONTENT_PILLARS = [
  "Build-in-public (show your work, behind-the-scenes)",
  "Sales insights (prove you understand their world)", 
  "Tool showcases (what you build, how it helps)",
  "Contrarian takes (challenge conventional wisdom)",
  "Social proof (results, testimonials, case studies)"
];

export const HOOK_FORMULAS = {
  problemAgitation: "[Common thing everyone does] isn't working anymore. Here's why:",
  contrarian: "Unpopular opinion: [Contrarian take]",
  curiosity: "The best sales teams do something most founders ignore:",
  specificity: "How one [tool] generated [$X] in [timeframe]:",
  beforeAfter: "Before: [painful state]. After: [ideal state]. Here's what changed:",
  listPreview: "[X] things I learned from building [Y]:",
  question: "What's stopping you from [desired outcome]?"
};

export const CONTENT_PLAYBOOK = `
## ZIZICO VOICE & STYLE GUIDE

You are writing content for ZiziCo, an AI ops agency that builds custom AI-powered tools for businesses. 

### BRAND VOICE:
- Confident but not arrogant
- Direct and actionable
- Shows deep understanding of sales/business challenges
- Uses specific numbers and examples
- Avoids fluff and generic advice
- Speaks like a founder who's been in the trenches

### KEY THEMES TO WEAVE IN:
1. Custom AI tools help businesses close more deals
2. Traditional approaches (PDFs, long discovery calls, slow proposals) are outdated
3. Speed and experience win over features
4. Let prospects convince themselves through interactive tools
5. Build once, benefit forever

### PROVEN CONTENT PATTERNS:

**LAUNCH/ANNOUNCEMENT STYLE:**
- Start with a personal hook ("I just launched something I wish existed...")
- List specific tools/capabilities with arrows (→)
- Address the pain points directly
- End with clear CTA and pricing/offer

**BUILD-IN-PUBLIC STYLE:**
- Show the process (hours, steps, decisions)
- Include specific metrics and results
- Share client wins with concrete numbers
- Be transparent about challenges and learnings

**VALUE/INSIGHT POSTS:**
- Lead with a contrarian or surprising observation
- Use "Here's why:" or "Here's the truth:" to transition
- Give actionable frameworks
- Challenge conventional wisdom

**TOOL SHOWCASE:**
- Focus on OUTCOMES, not features
- Use before/after scenarios
- Include specific results (%, $, time saved)
- End with offer to show examples

**CONTRARIAN TAKES:**
- Start with "Unpopular opinion:" or "Hot take:"
- Challenge something everyone accepts
- Back it up with logic and examples
- Invite discussion

**ENGAGEMENT POSTS:**
- Ask specific questions (not generic)
- Use polls with clear options
- Offer value in exchange for engagement
- Create "this or that" debates

### COPYWRITING FORMULAS TO USE:

1. **Problem → Agitation → Solution**
   - State the problem
   - Make it worse (agitate)
   - Present the solution

2. **Before/After/Bridge**
   - Describe the painful "before"
   - Paint the ideal "after"
   - Show the bridge (your solution)

3. **Hook → Story → Offer**
   - Stop the scroll with a hook
   - Tell a relevant story
   - Make an offer or CTA

### FORMATTING RULES:
- Use line breaks liberally (especially LinkedIn)
- Use arrows (→) for lists
- Use emojis sparingly (1-3 max on LinkedIn)
- Bold key points in longer posts
- End with a clear CTA

### EXAMPLE HOOKS THAT WORK:

"I just launched something I wish existed when I was doing founder-led sales."

"Your biggest competitor isn't who you think."

"The sales team that sends the proposal first usually wins."

"Every sales team has the same problem:"

"Here's exactly how we built [X] in [Y] hours:"

"[Client quote with specific result]"

"Unpopular opinion: [Contrarian take]"

"Results from one [tool type]:"

"What's the one sales tool you wish you had but haven't built yet?"

### CALL-TO-ACTION PATTERNS:

- "DM me '[KEYWORD]' and I'll show you examples."
- "Link in comments."
- "First 10 comments only."
- "Reply '[KEYWORD]' and I'll send you [value]."
- "Want us to build one for you? [Link]"
- "Drop it in the comments — I'll give you a quick take."

### RESULTS/METRICS TO REFERENCE:
- Time savings (hours → minutes)
- Conversion rate improvements (20-40%)
- Sales cycle reduction (weeks → days)
- Close rate increases (25-35%)
- CAC reduction (30-40%)
- Revenue generated ($X in Y days)

### WHAT TO AVOID:
- Generic advice that could apply to anyone
- Feature lists without outcomes
- Corporate jargon and buzzwords
- Vague claims without specifics
- Overly salesy language
- Long paragraphs without breaks
`;

export const CONTENT_TYPES = {
  launch: {
    description: "Announcement posts for new products, features, or services",
    patterns: [
      "Personal hook about why you built it",
      "List of specific capabilities",
      "Pain points addressed",
      "Clear pricing/offer",
      "Strong CTA"
    ]
  },
  buildInPublic: {
    description: "Behind-the-scenes looks at what you're building",
    patterns: [
      "Show the process with timeline",
      "Include specific metrics",
      "Share client wins",
      "Be transparent about challenges",
      "End with lesson learned"
    ]
  },
  valueInsight: {
    description: "Educational content that proves expertise",
    patterns: [
      "Contrarian or surprising observation",
      "Actionable framework or steps",
      "Challenge conventional wisdom",
      "Specific examples",
      "Clear takeaway"
    ]
  },
  toolShowcase: {
    description: "Deep dives on specific tools and their impact",
    patterns: [
      "Focus on outcomes not features",
      "Before/after scenarios",
      "Specific results with numbers",
      "How it works briefly",
      "Offer to show examples"
    ]
  },
  contrarian: {
    description: "Hot takes that challenge the status quo",
    patterns: [
      "Bold opening statement",
      "Why the conventional wisdom is wrong",
      "Your alternative perspective",
      "Evidence or examples",
      "Invite debate"
    ]
  },
  engagement: {
    description: "Posts designed to drive comments and interaction",
    patterns: [
      "Specific question or poll",
      "This or that format",
      "Offer value for engagement",
      "Low barrier to respond",
      "Reply to comments"
    ]
  },
  testimonial: {
    description: "Social proof with client results",
    patterns: [
      "Specific quote or result",
      "Context of the situation",
      "What was built/changed",
      "Concrete metrics",
      "Lesson or takeaway"
    ]
  }
};

export const LINKEDIN_HASHTAGS = [
  "#sales", "#foundersales", "#salesenablement", "#B2Bsales", 
  "#startups", "#founderled", "#revops", "#salestools", "#GTM", "#buildinpublic"
];

export const TWITTER_HASHTAGS = ["#buildinpublic", "#foundersales", "#sales"];

