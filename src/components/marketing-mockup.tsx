"use client";

import { visualProfiles, extractHeadline } from "@/lib/visual-profiles";

interface MarketingMockupProps {
  marketId: string;
  adaptedContent: string;
  productImageUrl: string;
  sampleImagePath?: string | null;
}

export function MarketingMockup({
  marketId,
  adaptedContent,
  productImageUrl,
  sampleImagePath,
}: MarketingMockupProps) {
  const profile = visualProfiles[marketId];
  if (!profile) return null;

  // Sample mode: show pre-generated static image
  if (sampleImagePath) {
    return (
      <div className="rounded-lg overflow-hidden border border-white/10">
        <img
          src={sampleImagePath}
          alt={`Marketing visual for ${marketId}`}
          className="w-full h-auto"
        />
      </div>
    );
  }

  // Custom mode: render HTML/CSS marketing banner
  const headline = extractHeadline(adaptedContent);
  const { colors, typography, layout } = profile;

  return (
    <div
      className="rounded-lg overflow-hidden border border-white/10 relative"
      style={{ aspectRatio: "16 / 9" }}
      dir={layout.direction}
    >
      {/* Product image background */}
      <img
        src={productImageUrl}
        alt="Product"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${
            layout.direction === "rtl" ? "to left" : "to right"
          }, ${colors.background}, ${colors.background.replace(
            /[\d.]+\)$/,
            "0.3)"
          )})`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        {/* Market badge */}
        <div
          className="self-start rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
          style={{
            backgroundColor: `${colors.secondary}33`,
            color: colors.text,
            border: `1px solid ${colors.secondary}66`,
          }}
        >
          {marketId.toUpperCase()}
        </div>

        {/* Headline */}
        <div
          className="flex-1 flex items-center"
          style={{ justifyContent: layout.textAlign === "center" ? "center" : layout.textAlign === "right" ? "flex-end" : "flex-start" }}
        >
          <h3
            className="text-lg sm:text-2xl md:text-3xl font-bold leading-tight max-w-[80%]"
            style={{
              fontFamily: typography.headingFont,
              color: colors.text,
              textAlign: layout.textAlign,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {headline}
          </h3>
        </div>

        {/* CTA bar */}
        <div
          className="flex items-center gap-2 self-stretch"
          style={{
            justifyContent:
              layout.textAlign === "center"
                ? "center"
                : layout.textAlign === "right"
                ? "flex-end"
                : "flex-start",
          }}
        >
          <div
            className="rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide"
            style={{
              backgroundColor: colors.secondary,
              color:
                profile.layout.style === "minimalist" ||
                profile.layout.style === "playful"
                  ? "#ffffff"
                  : colors.text,
            }}
          >
            {layout.direction === "rtl" ? "اكتشف المزيد" : "Discover"}
          </div>
        </div>
      </div>
    </div>
  );
}
