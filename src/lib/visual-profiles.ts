export interface MarketVisualProfile {
  marketId: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    style: "serif" | "sans-serif" | "mixed";
  };
  layout: {
    direction: "ltr" | "rtl";
    textAlign: "left" | "center" | "right";
    style: "minimalist" | "vibrant" | "structured" | "elegant" | "playful";
  };
  colorPsychology: string;
}

export const visualProfiles: Record<string, MarketVisualProfile> = {
  fr: {
    marketId: "fr",
    colors: {
      primary: "#1a1a2e",
      secondary: "#c9a96e",
      background: "rgba(26,26,46,0.85)",
      text: "#f5f0eb",
    },
    typography: {
      headingFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Lato', 'Helvetica Neue', sans-serif",
      style: "serif",
    },
    layout: {
      direction: "ltr",
      textAlign: "center",
      style: "elegant",
    },
    colorPsychology:
      "Deep navy and gold evoke Parisian luxury. Serif typography signals heritage and intellectual refinement valued in French culture.",
  },
  de: {
    marketId: "de",
    colors: {
      primary: "#1b2838",
      secondary: "#4a90d9",
      background: "rgba(27,40,56,0.88)",
      text: "#e8ecf1",
    },
    typography: {
      headingFont: "'Inter', Helvetica, sans-serif",
      bodyFont: "'Inter', Arial, sans-serif",
      style: "sans-serif",
    },
    layout: {
      direction: "ltr",
      textAlign: "left",
      style: "structured",
    },
    colorPsychology:
      "Blue signals trust and reliability. Clean sans-serif typography reflects German precision. Left-aligned, structured layout matches the engineering mindset.",
  },
  jp: {
    marketId: "jp",
    colors: {
      primary: "#f5f0eb",
      secondary: "#d4a5a5",
      background: "rgba(245,240,235,0.92)",
      text: "#2d2d2d",
    },
    typography: {
      headingFont: "'Noto Serif JP', 'Hiragino Mincho', serif",
      bodyFont: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
      style: "mixed",
    },
    layout: {
      direction: "ltr",
      textAlign: "center",
      style: "minimalist",
    },
    colorPsychology:
      "Soft warm neutrals evoke washi paper and natural beauty. Sakura pink accents reference seasonal beauty (mono no aware). Minimalist layout reflects ma (negative space) aesthetic.",
  },
  br: {
    marketId: "br",
    colors: {
      primary: "#ff6b35",
      secondary: "#004e64",
      background: "rgba(0,78,100,0.82)",
      text: "#ffffff",
    },
    typography: {
      headingFont: "'Montserrat', 'Trebuchet MS', sans-serif",
      bodyFont: "'Open Sans', Arial, sans-serif",
      style: "sans-serif",
    },
    layout: {
      direction: "ltr",
      textAlign: "center",
      style: "vibrant",
    },
    colorPsychology:
      "Warm orange and teal reflect Brazil's vibrant energy and tropical palette. Bold, rounded typography conveys warmth and approachability.",
  },
  us: {
    marketId: "us",
    colors: {
      primary: "#0f0f0f",
      secondary: "#ff4757",
      background: "rgba(15,15,15,0.87)",
      text: "#ffffff",
    },
    typography: {
      headingFont: "'Inter', 'Helvetica Neue', sans-serif",
      bodyFont: "'Inter', Helvetica, sans-serif",
      style: "sans-serif",
    },
    layout: {
      direction: "ltr",
      textAlign: "left",
      style: "structured",
    },
    colorPsychology:
      "High-contrast black and white with red CTA mirrors tech-meets-luxury aesthetic. Clean sans-serif signals innovation and confidence.",
  },
  cn: {
    marketId: "cn",
    colors: {
      primary: "#8b0000",
      secondary: "#d4af37",
      background: "rgba(139,0,0,0.80)",
      text: "#fff8dc",
    },
    typography: {
      headingFont: "'Noto Serif SC', SimSun, serif",
      bodyFont: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      style: "mixed",
    },
    layout: {
      direction: "ltr",
      textAlign: "center",
      style: "elegant",
    },
    colorPsychology:
      "Red and gold are the most auspicious colors in Chinese culture, symbolizing luck, prosperity and imperial prestige. Serif headings evoke heritage and authority.",
  },
  sa: {
    marketId: "sa",
    colors: {
      primary: "#1a472a",
      secondary: "#c9a96e",
      background: "rgba(26,71,42,0.85)",
      text: "#f5f0e8",
    },
    typography: {
      headingFont: "'Amiri', 'Traditional Arabic', serif",
      bodyFont: "'IBM Plex Sans Arabic', Tahoma, sans-serif",
      style: "serif",
    },
    layout: {
      direction: "rtl",
      textAlign: "right",
      style: "elegant",
    },
    colorPsychology:
      "Green represents Islam, paradise and prosperity. Gold evokes desert heritage and luxury. RTL layout and Arabic serif typography show deep cultural respect.",
  },
  kr: {
    marketId: "kr",
    colors: {
      primary: "#fff0f5",
      secondary: "#6c5ce7",
      background: "rgba(255,240,245,0.88)",
      text: "#2d3436",
    },
    typography: {
      headingFont: "'Noto Sans KR', 'Malgun Gothic', sans-serif",
      bodyFont: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      style: "sans-serif",
    },
    layout: {
      direction: "ltr",
      textAlign: "center",
      style: "playful",
    },
    colorPsychology:
      "Soft pastels with purple accents reflect K-beauty's dewy, youthful aesthetic. Clean sans-serif mirrors the modern, tech-savvy Korean design sensibility.",
  },
};

export function extractHeadline(adaptedContent: string): string {
  const firstLine = adaptedContent.split("\n")[0];
  const firstSentence = firstLine.split(/[.!?。！？]/)[0];
  return firstSentence.length > 80
    ? firstSentence.substring(0, 77) + "..."
    : firstSentence;
}
