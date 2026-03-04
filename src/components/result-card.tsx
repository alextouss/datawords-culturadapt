"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score >= 70) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
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
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{market.flag}</span>
              <div>
                <h3 className="font-semibold text-base">{market.name}</h3>
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
              <span className="text-xs">/100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic mt-1">
            {result.toneSummary}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {result.adaptedContent}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Cultural Insights</span>
            </div>
            <div className="space-y-2">
              {result.insights.map((insight, i) => (
                <div
                  key={i}
                  className="rounded-md border border-dashed border-amber-200 bg-amber-50/50 p-2.5 text-xs"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
                      <span className="font-mono line-through">{insight.original}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="font-mono font-medium text-foreground">
                        {insight.adapted}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
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
