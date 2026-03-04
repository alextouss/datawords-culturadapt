"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { brandVoices } from "@/lib/brand-voices";
import { Textarea } from "@/components/ui/textarea";
import { Crown, Sparkles, Shield, Zap, ChevronDown, Pen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Crown,
  Sparkles,
  Shield,
  Zap,
};

interface BrandVoiceSelectorProps {
  selectedVoiceId: string | null;
  customGuidelines: string;
  onVoiceChange: (voiceId: string | null) => void;
  onCustomGuidelinesChange: (text: string) => void;
  disabled?: boolean;
}

export function BrandVoiceSelector({
  selectedVoiceId,
  customGuidelines,
  onVoiceChange,
  onCustomGuidelinesChange,
  disabled,
}: BrandVoiceSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-[0.15em] text-purple-400">
          Brand Voice
        </label>
        <span className="text-xs text-muted-foreground">
          {selectedVoiceId ? "1 selected" : "optional"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {brandVoices.map((voice) => {
          const isActive = selectedVoiceId === voice.id;
          const Icon = iconMap[voice.icon];
          return (
            <button
              key={voice.id}
              onClick={() => onVoiceChange(isActive ? null : voice.id)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all duration-200 cursor-pointer",
                "hover:border-purple-500/50 hover:bg-purple-500/5",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isActive
                  ? "border-purple-500/60 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                  : "border-white/10 bg-white/[0.02]"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-purple-400" : "text-muted-foreground"
                  )}
                />
              )}
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    isActive ? "text-purple-300" : "text-foreground"
                  )}
                >
                  {voice.label}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {voice.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setShowCustom(!showCustom)}
        disabled={disabled}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-purple-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Pen className="h-3 w-3" />
        {showCustom ? "Hide" : "Add"} custom brand guidelines
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            showCustom && "rotate-180"
          )}
        />
      </button>

      {showCustom && (
        <Textarea
          placeholder="E.g., Always use 'you' not 'we'. Avoid exclamation marks. Reference sustainability in every piece..."
          value={customGuidelines}
          onChange={(e) => onCustomGuidelinesChange(e.target.value)}
          disabled={disabled}
          maxLength={500}
          className="min-h-[80px] resize-y text-sm bg-white/[0.03] border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 placeholder:text-muted-foreground/50"
        />
      )}
    </div>
  );
}
