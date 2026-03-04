"use client";

import { Palette, Type, LayoutTemplate, ArrowRightLeft } from "lucide-react";
import { visualProfiles } from "@/lib/visual-profiles";

interface VisualInsightsProps {
  marketId: string;
}

export function VisualInsights({ marketId }: VisualInsightsProps) {
  const profile = visualProfiles[marketId];
  if (!profile) return null;

  const insights = [
    {
      icon: Palette,
      label: "Color Psychology",
      text: profile.colorPsychology,
    },
    {
      icon: Type,
      label: "Typography",
      text: `${profile.typography.style === "serif" ? "Serif" : profile.typography.style === "sans-serif" ? "Sans-serif" : "Mixed serif/sans-serif"} heading style reflects local design conventions and cultural expectations.`,
    },
    {
      icon: LayoutTemplate,
      label: "Layout Style",
      text: `${profile.layout.style.charAt(0).toUpperCase() + profile.layout.style.slice(1)} composition aligns with ${marketId === "jp" ? "Japanese ma (negative space)" : marketId === "br" ? "Brazilian warmth and energy" : marketId === "kr" ? "K-beauty's modern, playful" : marketId === "de" ? "German precision and order" : marketId === "cn" ? "Chinese prestige and heritage" : marketId === "fr" ? "French sophistication" : marketId === "us" ? "American confidence and clarity" : "local"} aesthetic preferences.`,
    },
    ...(profile.layout.direction === "rtl"
      ? [
          {
            icon: ArrowRightLeft,
            label: "Text Direction",
            text: "Right-to-left layout respects Arabic reading patterns and is essential for cultural authenticity in this market.",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Palette className="h-4 w-4 text-teal-400" />
        <span className="text-sm font-medium text-teal-300">
          Visual Insights
        </span>
      </div>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="rounded-md border border-teal-500/20 bg-teal-500/5 p-2.5 text-xs"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <insight.icon className="h-3 w-3 text-teal-400 shrink-0" />
              <span className="font-medium text-teal-300">
                {insight.label}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
