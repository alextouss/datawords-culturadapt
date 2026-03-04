"use client";

import { markets, MarketProfile } from "@/lib/markets";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MarketSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

export function MarketSelector({ selected, onChange, disabled }: MarketSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => {
    if (selected.length === markets.length) {
      onChange([]);
    } else {
      onChange(markets.map((m) => m.id));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Target Markets
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={selectAll}
          disabled={disabled}
          className="text-xs text-muted-foreground"
        >
          {selected.length === markets.length ? "Deselect all" : "Select all"}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {markets.map((market) => (
          <button
            key={market.id}
            onClick={() => toggle(market.id)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selected.includes(market.id)
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border text-muted-foreground"
            )}
          >
            <span className="text-lg">{market.flag}</span>
            <span>{market.name}</span>
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected.length} market{selected.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
