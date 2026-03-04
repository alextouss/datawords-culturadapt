export interface BrandVoice {
  id: string;
  label: string;
  icon: string;
  description: string;
  guidelines: string;
}

export const brandVoices: BrandVoice[] = [
  {
    id: "luxury",
    label: "Luxury & Prestige",
    icon: "Crown",
    description: "Elevated, exclusive, heritage-driven",
    guidelines: `Brand voice: Luxury & Prestige.
Tone: Elevated, refined, exclusive. Use sophisticated vocabulary.
Language style: Evocative sensory language, heritage references, understated confidence.
Avoid: Casual slang, discount language, urgency tactics, mass-market framing.
The brand speaks as a maison, not a store. Every word should feel curated.`,
  },
  {
    id: "fresh",
    label: "Fresh & Playful",
    icon: "Sparkles",
    description: "Energetic, youthful, approachable",
    guidelines: `Brand voice: Fresh & Playful.
Tone: Energetic, witty, approachable. Use conversational language.
Language style: Short punchy sentences, playful wordplay, inclusive and friendly.
Avoid: Stiff formal language, technical jargon, condescending tone.
The brand speaks like a fun, smart friend who genuinely loves the product.`,
  },
  {
    id: "professional",
    label: "Professional & Trustworthy",
    icon: "Shield",
    description: "Authoritative, evidence-based, reliable",
    guidelines: `Brand voice: Professional & Trustworthy.
Tone: Authoritative, calm, evidence-based. Use precise language.
Language style: Data-backed claims, expert endorsements, clear structure, measured confidence.
Avoid: Hype, exaggeration, unsubstantiated superlatives, casual tone.
The brand speaks as a trusted expert — credible, transparent, reassuring.`,
  },
  {
    id: "bold",
    label: "Bold & Disruptive",
    icon: "Zap",
    description: "Provocative, challenger, rule-breaking",
    guidelines: `Brand voice: Bold & Disruptive.
Tone: Provocative, confident, rule-breaking. Use direct, punchy language.
Language style: Short declarative statements, challenge conventions, strong verbs, no hedging.
Avoid: Corporate speak, passive voice, safe or generic phrasing, excessive politeness.
The brand speaks as a challenger — unapologetic, direct, category-disrupting.`,
  },
];
