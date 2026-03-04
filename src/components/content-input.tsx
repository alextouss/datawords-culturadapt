"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { samples } from "@/lib/samples";
import { FileText } from "lucide-react";

interface ContentInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ContentInput({ value, onChange, disabled }: ContentInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-medium uppercase tracking-[0.15em] text-purple-400">
        Source Content
      </label>
      <Textarea
        placeholder="Paste your marketing content here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="min-h-[200px] resize-y text-sm leading-relaxed bg-white/[0.03] border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 placeholder:text-muted-foreground/50"
      />
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground self-center mr-1">
          Try a sample:
        </span>
        {samples.map((sample) => (
          <Button
            key={sample.id}
            variant="ghost"
            size="sm"
            onClick={() => onChange(sample.content)}
            disabled={disabled}
            className="text-xs border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300 transition-all cursor-pointer"
          >
            <FileText className="h-3 w-3 mr-1" />
            {sample.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
