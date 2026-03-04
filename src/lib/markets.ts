export interface MarketProfile {
  id: string;
  name: string;
  flag: string;
  language: string;
  culturalDimensions: {
    communicationStyle: string;
    values: string[];
    marketingConventions: string;
    taboos: string[];
    tonePreference: string;
  };
}

export const markets: MarketProfile[] = [
  {
    id: "fr",
    name: "France",
    flag: "🇫🇷",
    language: "French",
    culturalDimensions: {
      communicationStyle: "High-context, elegant, intellectual. Value sophistication and understatement.",
      values: ["Elegance", "Savoir-faire", "Pleasure", "Intellectual depth", "Art de vivre"],
      marketingConventions: "Subtle luxury positioning, sensory language, poetic imagery. Avoid hard-sell tactics.",
      taboos: ["Aggressive sales language", "Oversimplification", "Americanized superlatives"],
      tonePreference: "Refined, sensual, culturally elevated",
    },
  },
  {
    id: "de",
    name: "Germany",
    flag: "🇩🇪",
    language: "German",
    culturalDimensions: {
      communicationStyle: "Low-context, direct, precise. Value facts and evidence over emotion.",
      values: ["Quality", "Engineering excellence", "Reliability", "Scientific proof", "Efficiency"],
      marketingConventions: "Data-driven claims, clinical evidence, ingredient transparency. Consumers distrust superlatives.",
      taboos: ["Unsubstantiated claims", "Excessive emotion", "Vague promises", "Superlative marketing (#1, best ever)"],
      tonePreference: "Factual, trustworthy, precise",
    },
  },
  {
    id: "jp",
    name: "Japan",
    flag: "🇯🇵",
    language: "Japanese",
    culturalDimensions: {
      communicationStyle: "Very high-context, indirect, harmonious. Respect for tradition and group identity.",
      values: ["Bihada (beautiful skin)", "Harmony", "Respect", "Craftsmanship", "Seasonal awareness"],
      marketingConventions: "Gentle language, ritual-oriented messaging, emphasis on texture and sensory experience. 'Anti-aging' reframed as 'radiance' or 'vitality'.",
      taboos: ["Direct aging references", "Individualistic framing", "Confrontational claims", "Overly bold statements"],
      tonePreference: "Gentle, poetic, respectful, ritual-oriented",
    },
  },
  {
    id: "br",
    name: "Brazil",
    flag: "🇧🇷",
    language: "Brazilian Portuguese",
    culturalDimensions: {
      communicationStyle: "Warm, expressive, communal. Beauty is a social and joyful experience.",
      values: ["Joy", "Community", "Sensuality", "Self-expression", "Natural beauty"],
      marketingConventions: "Emotional storytelling, communal beauty rituals, vibrant energy. Social proof through community rather than authority.",
      taboos: ["Cold clinical tone", "Exclusionary luxury framing", "Ignoring diversity of skin tones"],
      tonePreference: "Warm, vibrant, inclusive, celebratory",
    },
  },
  {
    id: "us",
    name: "United States",
    flag: "🇺🇸",
    language: "American English",
    culturalDimensions: {
      communicationStyle: "Low-context, direct, aspirational. Individual empowerment and self-improvement.",
      values: ["Innovation", "Results", "Self-improvement", "Confidence", "Science-backed"],
      marketingConventions: "Bold claims with clinical backing, before/after framing, influencer social proof. Direct call-to-action.",
      taboos: ["Vagueness without proof", "Elitist exclusivity without inclusivity messaging"],
      tonePreference: "Confident, empowering, results-oriented",
    },
  },
  {
    id: "cn",
    name: "China",
    flag: "🇨🇳",
    language: "Simplified Chinese",
    culturalDimensions: {
      communicationStyle: "High-context, status-aware, digitally native. Prestige and heritage matter.",
      values: ["Prestige", "Heritage", "Whitening/brightening", "Traditional ingredients", "Social status"],
      marketingConventions: "KOL endorsements, heritage storytelling, prestige positioning. Ingredient stories linking to traditional Chinese medicine resonate.",
      taboos: ["Political sensitivity", "Ignoring local digital ecosystem (WeChat, Xiaohongshu)", "Western-centric references"],
      tonePreference: "Prestigious, heritage-aware, aspirational",
    },
  },
  {
    id: "sa",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    language: "Arabic",
    culturalDimensions: {
      communicationStyle: "High-context, respectful, family-oriented. Modesty and luxury coexist.",
      values: ["Modesty", "Family", "Luxury", "Tradition", "Generosity"],
      marketingConventions: "Modest imagery, family-oriented messaging, luxury through quality not provocation. Halal-conscious ingredients matter.",
      taboos: ["Revealing imagery", "Gender-mixed casual scenarios", "Alcohol references", "Ignoring religious sensitivities"],
      tonePreference: "Respectful, luxurious, family-oriented",
    },
  },
  {
    id: "kr",
    name: "South Korea",
    flag: "🇰🇷",
    language: "Korean",
    culturalDimensions: {
      communicationStyle: "Trend-driven, tech-savvy, beauty-obsessed. K-beauty influence is dominant.",
      values: ["Innovation", "Glass skin", "Multi-step routines", "Trendiness", "Ingredient knowledge"],
      marketingConventions: "Ingredient-forward, routine-based messaging, cute/playful aesthetics. Consumers are extremely ingredient-literate.",
      taboos: ["Outdated beauty standards", "Ignoring K-beauty trends", "Heavy/greasy product perception"],
      tonePreference: "Trendy, playful, ingredient-savvy, innovative",
    },
  },
];
