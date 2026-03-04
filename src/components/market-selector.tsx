"use client";

import { markets } from "@/lib/markets";
import { cn } from "@/lib/utils";

interface MarketSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

const MAX_MARKETS = 3;

export function MarketSelector({ selected, onChange, disabled }: MarketSelectorProps) {
  const atLimit = selected.length >= MAX_MARKETS;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (!atLimit) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-[0.15em] text-purple-400">
          Target Markets
        </label>
        <span className="text-xs text-muted-foreground">
          {selected.length}/{MAX_MARKETS} selected
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {markets.map((market) => (
          <button
            key={market.id}
            onClick={() => toggle(market.id)}
            disabled={disabled || (atLimit && !selected.includes(market.id))}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer",
              "hover:border-purple-500/50 hover:bg-purple-500/5",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selected.includes(market.id)
                ? "border-purple-500/60 bg-purple-500/10 text-purple-300 font-medium shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                : "border-white/10 text-muted-foreground bg-white/[0.02]"
            )}
          >
            <span className="text-lg">{market.flag}</span>
            <span>{market.name}</span>
          </button>
        ))}
      </div>
      {atLimit && (
        <p className="text-xs text-amber-400/80">
          Maximum of {MAX_MARKETS} markets reached — deselect one to change
        </p>
      )}
    </div>
  );
}
