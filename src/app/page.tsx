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
import { Globe, Sparkles, RotateCcw } from "lucide-react";

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
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">CulturAdapt</h1>
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

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Transcreate content for any culture
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Paste marketing content, select target markets, and get culturally-adapted
            versions with AI-powered insights explaining{" "}
            <span className="font-medium text-foreground">why</span> each change was
            made.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6 rounded-xl border bg-card p-6">
          <ContentInput
            value={content}
            onChange={setContent}
            disabled={isRunning}
          />
          <Separator />
          <MarketSelector
            selected={selectedMarkets}
            onChange={setSelectedMarkets}
            disabled={isRunning}
          />
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAdapt}
              disabled={isRunning || !content.trim() || selectedMarkets.length === 0}
              size="lg"
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {isRunning ? "Adapting..." : "Adapt Content"}
            </Button>
            {phase === "done" && (
              <Button variant="outline" size="lg" onClick={handleReset} className="gap-2">
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
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Adaptations{" "}
              <span className="text-muted-foreground font-normal">
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
        <footer className="pt-8 pb-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Built with Next.js, OpenAI GPT-4o, and Vercel AI SDK —{" "}
            <span className="font-medium">CulturAdapt</span> by Alexandre Toussaint
          </p>
        </footer>
      </main>
    </div>
  );
}
