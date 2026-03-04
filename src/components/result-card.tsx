"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, ArrowRight } from "lucide-react";
import { AdaptationResult } from "@/lib/ai/schemas";
import { markets } from "@/lib/markets";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result: AdaptationResult;
  index: number;
}

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.1)]";
  if (score >= 70) return "text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-[0_0_10px_rgba(251,191,36,0.1)]";
  return "text-red-400 bg-red-500/10 border-red-500/30 shadow-[0_0_10px_rgba(248,113,113,0.1)]";
}

export function ResultCard({ result, index }: ResultCardProps) {
  const market = markets.find((m) => m.id === result.marketId);
  if (!market) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{market.flag}</span>
              <div>
                <h3 className="font-semibold text-base font-heading">{market.name}</h3>
                <p className="text-xs text-muted-foreground">{market.language}</p>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1",
                scoreColor(result.culturalScore)
              )}
            >
              <span className="text-sm font-bold">{result.culturalScore}</span>
              <span className="text-xs opacity-70">/100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic mt-1">
            {result.toneSummary}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {result.adaptedContent}
            </p>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Cultural Insights</span>
            </div>
            <div className="space-y-2">
              {result.insights.map((insight, i) => (
                <div
                  key={i}
                  className="rounded-md border border-purple-500/20 bg-purple-500/5 p-2.5 text-xs"
                >
                  <div className="flex items-start gap-2 flex-wrap">
                    <span className="font-mono line-through text-muted-foreground">{insight.original}</span>
                    <ArrowRight className="h-3 w-3 text-purple-400 shrink-0 mt-0.5" />
                    <span className="font-mono font-medium text-purple-300">
                      {insight.adapted}
                    </span>
                  </div>
                  <p className="mt-1.5 text-muted-foreground leading-relaxed">
                    {insight.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
