"use client";

import { useState, useCallback } from "react";
import { AdaptationResult } from "@/lib/ai/schemas";
import { PipelinePhase } from "@/components/pipeline-status";

interface UseAdaptationReturn {
  results: AdaptationResult[];
  phase: PipelinePhase;
  error: string | null;
  run: (content: string, marketIds: string[]) => Promise<void>;
  reset: () => void;
}

export function useAdaptation(): UseAdaptationReturn {
  const [results, setResults] = useState<AdaptationResult[]>([]);
  const [phase, setPhase] = useState<PipelinePhase>("idle");
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setResults([]);
    setPhase("idle");
    setError(null);
  }, []);

  const run = useCallback(async (content: string, marketIds: string[]) => {
    setResults([]);
    setError(null);
    setPhase("analyzing");

    try {
      const response = await fetch("/api/adapt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, marketIds }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Adaptation failed");
      }

      setPhase("adapting");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);

          if (event.type === "result") {
            setResults((prev) => [...prev, event.data]);
          } else if (event.type === "error") {
            console.error("Market error:", event.data);
          } else if (event.type === "done") {
            setPhase("done");
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPhase("idle");
    }
  }, []);

  return { results, phase, error, run, reset };
}
