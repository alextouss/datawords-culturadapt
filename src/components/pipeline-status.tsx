"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type PipelinePhase = "idle" | "analyzing" | "adapting" | "done";

interface PipelineStatusProps {
  phase: PipelinePhase;
  completedCount: number;
  totalCount: number;
}

const steps = [
  { id: "analyzing", label: "Analyzing content" },
  { id: "adapting", label: "Transcreating for markets" },
  { id: "done", label: "Complete" },
];

const phaseIndex: Record<PipelinePhase, number> = {
  idle: -1,
  analyzing: 0,
  adapting: 1,
  done: 2,
};

export function PipelineStatus({ phase, completedCount, totalCount }: PipelineStatusProps) {
  if (phase === "idle") return null;

  const currentIdx = phaseIndex[phase];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 py-4 px-4 rounded-lg border border-white/10 bg-white/[0.02]"
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIdx || phase === "done";
        const isActive = idx === currentIdx && phase !== "done";

        return (
          <div key={step.id} className="flex items-center gap-2">
            {idx > 0 && (
              <div
                className={cn(
                  "h-[2px] w-6 sm:w-12 rounded-full transition-all duration-500",
                  isCompleted
                    ? "animate-neon-flow"
                    : isActive
                      ? "bg-gradient-to-r from-purple-600 to-purple-400 animate-pulse"
                      : "bg-white/10"
                )}
              />
            )}
            <div className="flex items-center gap-1.5">
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
              ) : isActive ? (
                <div className="animate-pulse-glow rounded-full">
                  <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                </div>
              ) : (
                <Circle className="h-4 w-4 text-white/20" />
              )}
              <span
                className={cn(
                  "text-xs sm:text-sm",
                  isCompleted
                    ? "text-purple-400 font-medium"
                    : isActive
                      ? "text-foreground font-medium"
                      : "text-white/30"
                )}
              >
                {step.label}
                {isActive && step.id === "adapting" && totalCount > 0
                  ? ` (${completedCount}/${totalCount})`
                  : ""}
              </span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
