"use client";

import { samples } from "@/lib/samples";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ContentInputProps {
  onSampleSelect?: (sampleId: string) => void;
  onCustomMode?: () => void;
  activeSampleId?: string | null;
  disabled?: boolean;
}

export function ContentInput({
  onSampleSelect,
  onCustomMode,
  activeSampleId,
  disabled,
}: ContentInputProps) {
  const isCustom = activeSampleId === null;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-[0.15em] text-purple-400">
        Choose a product
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {samples.map((sample) => {
          const isActive = activeSampleId === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => onSampleSelect?.(sample.id)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all duration-200 cursor-pointer",
                "hover:border-purple-500/50 hover:bg-purple-500/5",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isActive
                  ? "border-purple-500/60 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                  : "border-white/10 bg-white/[0.02]"
              )}
            >
              <img
                src={sample.referenceImage}
                alt={sample.label}
                className="h-10 w-10 rounded-md object-cover shrink-0 border border-white/10"
              />
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    isActive ? "text-purple-300" : "text-foreground"
                  )}
                >
                  {sample.label}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {sample.category}
                </p>
              </div>
            </button>
          );
        })}

        {/* Custom product card */}
        <button
          onClick={() => onCustomMode?.()}
          disabled={disabled}
          className={cn(
            "flex items-center gap-2.5 rounded-lg border-2 border-dashed px-3 py-2.5 text-left transition-all duration-200 cursor-pointer",
            "hover:border-purple-500/50 hover:bg-purple-500/5",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isCustom
              ? "border-purple-500/60 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.12)]"
              : "border-white/15 bg-white/[0.01]"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-md shrink-0 border border-dashed",
              isCustom
                ? "border-purple-500/50 bg-purple-500/10"
                : "border-white/15 bg-white/[0.03]"
            )}
          >
            <Plus
              className={cn(
                "h-5 w-5",
                isCustom ? "text-purple-400" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "text-sm font-medium truncate",
                isCustom ? "text-purple-300" : "text-foreground"
              )}
            >
              Your Product
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Custom content
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
