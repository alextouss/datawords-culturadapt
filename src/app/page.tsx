"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContentInput } from "@/components/content-input";
import { MarketSelector } from "@/components/market-selector";
import { PipelineStatus } from "@/components/pipeline-status";
import { ResultCard } from "@/components/result-card";
import { useAdaptation } from "@/hooks/use-adaptation";
import { samples } from "@/lib/samples";
import { Globe, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState(samples[0].content);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    "fr",
    "jp",
    "br",
    "sa",
    "de",
  ]);
  const { results, phase, error, run, reset } = useAdaptation();

  const isRunning = phase !== "idle" && phase !== "done";

  const handleAdapt = () => {
    if (!content.trim() || selectedMarkets.length === 0) return;
    run(content, selectedMarkets);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-violet-500 text-white glow-purple-sm">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight font-heading">
                CulturAdapt
              </h1>
              <p className="text-xs text-muted-foreground">
                AI-Powered Multicultural Transcreation
              </p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Datawords Study Case — Alexandre Toussaint
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-wider font-heading">
            Transcreate content
            <br />
            <span className="text-gradient-purple">for any culture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Paste marketing content, select target markets, and get culturally-adapted
            versions with AI-powered insights explaining{" "}
            <span className="font-medium text-foreground">why</span> each change was
            made.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
          <ContentInput
            value={content}
            onChange={setContent}
            disabled={isRunning}
          />
          <Separator className="bg-white/10" />
          <MarketSelector
            selected={selectedMarkets}
            onChange={setSelectedMarkets}
            disabled={isRunning}
          />
          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleAdapt}
              disabled={isRunning || !content.trim() || selectedMarkets.length === 0}
              size="lg"
              className="gap-2 bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white border-0 glow-purple-sm hover:glow-purple transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              {isRunning ? "Adapting..." : "Adapt Content"}
              {!isRunning && <ArrowRight className="h-4 w-4" />}
            </Button>
            {phase === "done" && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="gap-2 border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                New Adaptation
              </Button>
            )}
          </div>
        </div>

        {/* Pipeline Status */}
        <PipelineStatus
          phase={phase}
          completedCount={results.length}
          totalCount={selectedMarkets.length}
        />

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading uppercase tracking-wide">
              Adaptations{" "}
              <span className="text-muted-foreground font-normal text-sm normal-case tracking-normal">
                ({results.length} market{results.length > 1 ? "s" : ""})
              </span>
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((result, i) => (
                <ResultCard key={result.marketId} result={result} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="pt-8 pb-4 border-t border-white/10 text-center">
          <p className="text-xs text-muted-foreground">
            Built with Next.js, OpenAI GPT-5 mini, and Vercel AI SDK —{" "}
            <span className="font-medium text-purple-400">CulturAdapt</span> by
            Alexandre Toussaint
          </p>
        </footer>
      </main>
    </div>
  );
}
