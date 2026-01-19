import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { platforms, PlatformId } from "@/lib/social-platforms";
import { CONTENT_PLAYBOOK } from "@/lib/social-content-playbook";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `You are an expert social media content creator for ZiziCo, an AI ops agency that builds custom AI-powered tools and systems for businesses.

${CONTENT_PLAYBOOK}

CRITICAL RULES:
- ALWAYS use the patterns, hooks, and formulas from the playbook above
- NEVER use generic phrases or clichés
- NEVER sound robotic or AI-generated
- Your content sounds human, conversational, and authentic
- You adapt perfectly to each platform's unique style and culture
- You create content that makes people stop scrolling
- Include specific numbers, metrics, and examples when possible
- Use the hook formulas and CTA patterns from the playbook
- Write like a founder who's been in the trenches, not a marketer`;

const PLATFORM_INSTRUCTIONS: Record<PlatformId, string> = {
  linkedin: `You're writing for LinkedIn. This is ZiziCo's PRIMARY platform.

LINKEDIN-SPECIFIC RULES:
- Professional but personable tone (not corporate-speak)
- Use line breaks liberally for readability — short paragraphs
- Hook readers in the FIRST LINE — this shows before "see more"
- Use arrows (→) for lists instead of bullet points
- Include a clear call-to-action
- Use emojis sparingly (1-3 max, if at all)
- Aim for 150-300 words for best engagement
- End with 3-5 relevant hashtags from: #sales #foundersales #salesenablement #B2Bsales #startups #founderled #revops #salestools #GTM #buildinpublic

FORMAT: Hook → Build the story → Insight/Value → CTA → Hashtags

LINKEDIN HOOKS THAT WORK:
- "I just launched something I wish existed when I was..."
- "Your biggest competitor isn't who you think."
- "Every sales team has the same problem:"
- "Here's exactly how we built [X] in [Y] hours:"
- "Unpopular opinion: [contrarian take]"
- "[Specific result] — here's how:"`,

  twitter: `You're writing for Twitter/X. This is ZiziCo's SECONDARY platform — more casual, faster, punchier.

TWITTER-SPECIFIC RULES:
- Punchy, concise, high-impact writing
- Strong hook in first line — it must stop the scroll
- Stay under 280 characters for single tweets
- If content needs more space, format as a THREAD (mark as 1/, 2/, etc. or use 🧵)
- Hashtags are optional, 2 max: #buildinpublic #foundersales
- No fluff — every word must earn its place
- Hot takes and bold statements perform well
- More casual tone than LinkedIn

FORMAT FOR SINGLE TWEET: Hook → Value → CTA (optional)
FORMAT FOR THREAD: 🧵 Setup → Points (one per tweet) → Summary + CTA

TWITTER HOOKS:
- "Hot take: [contrarian opinion]"
- "Just shipped: [what you built]"
- "[Result metric]. Here's how:"
- "The [X] that [does Y] in [timeframe]:"
- "[Number] things about [topic]:"`,

  instagram: `You're writing an Instagram caption for ZiziCo.

INSTAGRAM-SPECIFIC RULES:
- Casual, visual-friendly language
- Emojis encouraged (they increase engagement)
- First line is CRITICAL — only ~125 chars show before "more"
- Use line breaks and spacing for readability
- End with 8-12 relevant hashtags
- Include a CTA (comment, save, share, or link in bio)
- Stories and personal content perform well
- Can be more behind-the-scenes and casual

FORMAT: Hook → Story/Value → CTA → Hashtags

Make it feel authentic and personal, like sharing with friends.`,

  facebook: `You're writing for Facebook for ZiziCo.

FACEBOOK-SPECIFIC RULES:
- Conversational and engaging tone
- Can be longer form than other platforms
- Questions drive comments and engagement
- Emojis are okay but not excessive
- Personal stories and opinions perform well
- Native content (not just links) gets more reach
- Great for community building and discussion

FORMAT: Hook → Story/Context → Value → Question or CTA

Focus on sparking conversation and making content shareable.`,

  tiktok: `You're writing a TikTok caption for ZiziCo.

TIKTOK-SPECIFIC RULES:
- Very casual, trendy language — match TikTok's vibe
- Hook immediately — TikTok users have no patience
- Short and punchy (pair with video content)
- Use trending hashtags for discoverability (5-8)
- Reference current trends, sounds, or memes if relevant
- Be authentic — TikTok users hate fake/corporate content
- Can be more playful and less polished

FORMAT: Hook → Quick context → Hashtags

Keep it real, keep it short, keep it engaging.`
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, description, styleReference, companyDomain } = body;

    // Validation
    if (!platform || !Object.keys(platforms).includes(platform)) {
      return NextResponse.json(
        { error: "Please select a valid platform" },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide a more detailed description (at least 20 characters)" },
        { status: 400 }
      );
    }

    if (!companyDomain || !companyDomain.trim()) {
      return NextResponse.json(
        { error: "Please enter your company website" },
        { status: 400 }
      );
    }

    const platformConfig = platforms[platform as PlatformId];
    const platformInstructions = PLATFORM_INSTRUCTIONS[platform as PlatformId];

    // Clean the domain
    const cleanDomain = companyDomain.trim().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');

    let userPrompt = `Create a ${platformConfig.name} post for a company with website: ${cleanDomain}

WHAT THE USER WANTS:
---
${description.trim()}
---

COMPANY CONTEXT:
Based on the domain "${cleanDomain}", understand what this company likely does and tailor the content to:
- Match their industry and target audience
- Use appropriate terminology and tone for their sector
- Make the content feel authentic to their brand
- Reference relevant pain points or benefits for their customers
- Position their offering effectively

${platformInstructions}

CONTENT GENERATION INSTRUCTIONS:
1. Use the ZiziCo playbook patterns, hooks, and formulas
2. Adapt them to fit this company's brand and industry
3. Include specific, believable metrics when relevant
4. Make the content sound like it was written by someone at this company
5. Focus on OUTCOMES and VALUE, not features`;

    if (styleReference && styleReference.trim()) {
      userPrompt += `

STYLE REFERENCE:
The user has provided an example of the style/tone they want you to match. Analyze this example and match its:
- Voice and tone
- Sentence structure and rhythm
- Use of emojis and formatting
- Energy level and personality

Do NOT copy the content — only match the style and feel.

Example to match:
---
${styleReference.trim()}
---`;
    }

    userPrompt += `

Now write the ${platformConfig.name} post. Output ONLY the post content, nothing else. No explanations, no "Here's the post:", just the actual post content that's ready to copy and paste.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.8,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    return NextResponse.json({
      content: textContent.text.trim(),
      platform,
    });
  } catch (error) {
    console.error("Error generating social content:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
