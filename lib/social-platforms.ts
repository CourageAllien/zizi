// Social Content Generator - Platform Configuration

export type PlatformId = 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok';

export interface Platform {
  id: PlatformId;
  name: string;
  icon: string;
  color: string;
  charLimit: number;
  tips: string[];
  bestTimes: string;
}

export const platforms: Record<PlatformId, Platform> = {
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0077b5',
    charLimit: 3000,
    tips: [
      'Use line breaks for readability',
      'Strong hook in first line',
      'Limit hashtags to 3-5',
      'Include a clear CTA'
    ],
    bestTimes: 'Tuesday-Thursday, 8-10am'
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    icon: 'Twitter',
    color: '#1DA1F2',
    charLimit: 280,
    tips: [
      'Front-load your message',
      'Use 1-2 hashtags max',
      'Ask questions for engagement',
      'Consider threads for longer content'
    ],
    bestTimes: 'Weekdays, 12-3pm'
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    color: '#E4405F',
    charLimit: 2200,
    tips: [
      'First 125 chars are crucial',
      'Use 5-10 relevant hashtags',
      'Emojis increase engagement',
      'End with a CTA'
    ],
    bestTimes: 'Monday-Friday, 11am-1pm'
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    charLimit: 63206,
    tips: [
      'Questions drive comments',
      'Native video performs best',
      'Tag relevant pages',
      'Keep posts conversational'
    ],
    bestTimes: 'Wednesday-Friday, 1-4pm'
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'Music2',
    color: '#00F2EA',
    charLimit: 2200,
    tips: [
      'Hook in first 2 seconds',
      'Use trending hashtags',
      'Be authentic and casual',
      'Reference current trends'
    ],
    bestTimes: 'Tuesday-Thursday, 7-9pm'
  }
};

export const platformList = Object.values(platforms);

// Prompt templates for quick starts - aligned with ZiziCo playbook
export interface PromptTemplate {
  id: string;
  label: string;
  category: 'launch' | 'build-in-public' | 'value-insight' | 'tool-showcase' | 'contrarian' | 'engagement' | 'testimonial';
  prompt: string;
}

export const promptTemplates: PromptTemplate[] = [
  // Launch & New Beginnings
  {
    id: 'launch-announcement',
    label: 'Launch Announcement',
    category: 'launch',
    prompt: 'Write a launch announcement post for a new product or service. Start with a personal hook about why you built it. List specific capabilities with arrows (→). Address the pain points it solves. End with a clear CTA. Make it feel authentic, not salesy.'
  },
  {
    id: 'working-on',
    label: 'What I\'m Working On',
    category: 'launch',
    prompt: 'Write a post sharing what you\'ve been working on recently. Be specific about the project/product. Share why you\'re excited about it. Include what problem it solves. Invite curiosity without being too promotional.'
  },
  {
    id: 'starting-journey',
    label: 'Starting My Journey',
    category: 'launch',
    prompt: 'Write a post about starting something new - a business, product, or service. Share why you decided to start. Be vulnerable about the challenges. Express excitement about the opportunity. Invite people to follow along.'
  },
  {
    id: 'first-customers',
    label: 'First Customers/Users',
    category: 'launch',
    prompt: 'Write a post celebrating early traction - first customers, users, or sales. Be genuine and grateful. Share what you learned from them. Include what\'s next. Keep it humble but excited.'
  },
  {
    id: 'why-i-built',
    label: 'Why I Built This',
    category: 'launch',
    prompt: 'Write a post explaining the "why" behind your product/service. Share the problem you personally experienced. Explain your frustration with existing solutions. Show how your solution is different. Make it personal and relatable.'
  },
  {
    id: 'soft-launch',
    label: 'Soft Launch',
    category: 'launch',
    prompt: 'Write a soft launch post - not a big splashy announcement, but sharing that something is now available. Be casual and conversational. Invite early feedback. Offer something special for early adopters. Keep it authentic.'
  },

  // Build-in-Public
  {
    id: 'show-a-build',
    label: 'Show a Build',
    category: 'build-in-public',
    prompt: 'Write a post showing something we recently built or shipped. Include: what it does, time to build, the problem it solves, specific results or metrics, and offer to show examples. Use the "Here\'s exactly how we built X" format.'
  },
  {
    id: 'behind-scenes',
    label: 'Behind the Scenes',
    category: 'build-in-public',
    prompt: 'Write a behind-the-scenes post showing our process. Include timeline (hours/days), key decisions made, challenges overcome, and the final result. Format with clear steps and be transparent about the journey.'
  },
  {
    id: 'weekly-recap',
    label: 'Weekly Recap',
    category: 'build-in-public',
    prompt: 'Write a weekly recap post showing what we shipped this week. Use checkmarks (✅) to list accomplishments, include total build time, client satisfaction, and end with "What are you building this week?"'
  },
  {
    id: 'mistake-learning',
    label: 'Mistake & Learning',
    category: 'build-in-public',
    prompt: 'Write a post about a mistake we made and what we learned. Be vulnerable, explain what went wrong, how we fixed it, and the lesson others can apply. End with actionable advice.'
  },

  // Value/Insight Posts
  {
    id: 'real-competition',
    label: 'Real Competition',
    category: 'value-insight',
    prompt: 'Write a post about how the real competition isn\'t who people think. Challenge the conventional view and explain what actually matters (experience, speed, ease of buying, etc). Make it thought-provoking.'
  },
  {
    id: 'broken-approach',
    label: 'What\'s Broken',
    category: 'value-insight',
    prompt: 'Write a post about something that\'s broken in how businesses operate today (cold outreach, demos, proposals, etc). Explain why the old way doesn\'t work and offer a better alternative.'
  },
  {
    id: 'speed-wins',
    label: 'Speed Wins',
    category: 'value-insight',
    prompt: 'Write a post about why speed matters in business. Use the angle that the fastest response/proposal/delivery usually wins. Include specific examples of how speed signals competence.'
  },
  {
    id: 'qualification-tips',
    label: 'Qualification Tips',
    category: 'value-insight',
    prompt: 'Write a post about how to qualify prospects better BEFORE talking to them. Focus on using tools and automation to pre-qualify so conversations become closing calls, not discovery calls.'
  },

  // Tool Showcase
  {
    id: 'tool-deep-dive',
    label: 'Tool Deep Dive',
    category: 'tool-showcase',
    prompt: 'Write a deep-dive post about a specific type of tool or solution we build. Explain why it\'s underrated, the multiple jobs it does, specific results it generates, and offer to show examples.'
  },
  {
    id: 'before-after',
    label: 'Before/After',
    category: 'tool-showcase',
    prompt: 'Write a before/after post showing the transformation a tool created. Start with the painful "before" state, show the improved "after" state, and include specific metrics (time saved, conversion improved, etc).'
  },
  {
    id: 'roi-story',
    label: 'ROI Story',
    category: 'tool-showcase',
    prompt: 'Write a post about the ROI of a tool or solution. Include specific numbers (cost of building vs. agency cost, time to build, revenue generated). Make the math obvious and compelling.'
  },

  // Contrarian Takes
  {
    id: 'hot-take',
    label: 'Hot Take',
    category: 'contrarian',
    prompt: 'Write a contrarian "hot take" or "unpopular opinion" post that challenges conventional wisdom. Start bold, explain your reasoning, back it up with logic, and invite debate.'
  },
  {
    id: 'thing-is-dead',
    label: '[X] is Dead',
    category: 'contrarian',
    prompt: 'Write a post declaring something outdated as "dead" (PDFs, discovery calls, feature comparisons, etc). Explain why it no longer works and what should replace it.'
  },
  {
    id: 'expensive-scam',
    label: 'Overpriced [X]',
    category: 'contrarian',
    prompt: 'Write a post calling out something that\'s overpriced in the industry (agencies, consultants, enterprise software). Explain why it\'s not worth it and offer the alternative approach.'
  },

  // Engagement
  {
    id: 'question-post',
    label: 'Question Post',
    category: 'engagement',
    prompt: 'Write an engagement post asking what tool/solution the audience wishes they had. Offer to give quick feedback or ideas to people who comment. Use "Drop it in the comments" format.'
  },
  {
    id: 'poll-post',
    label: 'Poll Post',
    category: 'engagement',
    prompt: 'Write a poll post asking which type of solution/tool would help most. Use emoji letters (🅰️ 🅱️ 🅲 🅳) for options and ask people to vote and explain why in comments.'
  },
  {
    id: 'this-or-that',
    label: 'This or That',
    category: 'engagement',
    prompt: 'Write a "this or that" debate post comparing two approaches or priorities. Make both sides compelling and hint that the answer might surprise them. Drive discussion.'
  },
  {
    id: 'free-offer',
    label: 'Free Offer',
    category: 'engagement',
    prompt: 'Write a post offering something valuable for free (mockup, audit, review, etc) in exchange for engagement. Include clear instructions, limit it to first X comments, and explain why you\'re doing it.'
  },

  // Testimonial/Results
  {
    id: 'client-quote',
    label: 'Client Quote',
    category: 'testimonial',
    prompt: 'Write a testimonial post featuring a client quote with specific results. Start with the quote, provide context about their situation, explain what was built, and share the concrete outcomes.'
  },
  {
    id: 'results-metrics',
    label: 'Results & Metrics',
    category: 'testimonial',
    prompt: 'Write a results post with specific metrics from a recent project. Use 📊 emoji for each metric, explain what drove the results, and end with a lesson or takeaway.'
  },
  {
    id: 'case-study',
    label: 'Mini Case Study',
    category: 'testimonial',
    prompt: 'Write a mini case study post. Include: the client\'s situation before, what we built, specific results after, and the key insight others can apply. Keep it concise but impactful.'
  }
];

export const templatesByCategory = {
  'launch': promptTemplates.filter(t => t.category === 'launch'),
  'build-in-public': promptTemplates.filter(t => t.category === 'build-in-public'),
  'value-insight': promptTemplates.filter(t => t.category === 'value-insight'),
  'tool-showcase': promptTemplates.filter(t => t.category === 'tool-showcase'),
  'contrarian': promptTemplates.filter(t => t.category === 'contrarian'),
  'engagement': promptTemplates.filter(t => t.category === 'engagement'),
  'testimonial': promptTemplates.filter(t => t.category === 'testimonial'),
};

export const categoryLabels: Record<string, string> = {
  'launch': 'Launch & New Beginnings',
  'build-in-public': 'Build in Public',
  'value-insight': 'Value & Insights',
  'tool-showcase': 'Tool Showcase',
  'contrarian': 'Contrarian Takes',
  'engagement': 'Engagement',
  'testimonial': 'Results & Proof',
};

// Content history type
export interface HistoryItem {
  id: string;
  platform: PlatformId;
  content: string;
  description: string;
  styleReference?: string;
  createdAt: string;
}
