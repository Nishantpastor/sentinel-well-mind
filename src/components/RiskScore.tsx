import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { RiskBadge } from "./RiskBadge";
import { bandForScore } from "@/utils/risk";
import { cn } from "@/lib/utils";

export function RiskScore({
  score,
  previous,
  compact = false,
  className,
}: {
  score: number;
  previous?: number;
  compact?: boolean;
  className?: string;
}) {
  const band = bandForScore(score);
  const delta = previous === undefined ? 0 : score - previous;
  const Icon = delta > 0 ? ArrowUpRight : delta < 0 ? ArrowDownRight : Minus;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Welfare Risk
      </p>
      <div className="flex items-end gap-3">
        <p
          className={cn(
            "font-display font-semibold tabular-nums leading-none",
            compact ? "text-3xl" : "text-5xl",
          )}
        >
          {score}
          <span className="ml-1 text-base font-normal text-muted-foreground">/ 100</span>
        </p>
        <RiskBadge band={band} />
      </div>
      {previous !== undefined ? (
        <p
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium",
            delta > 0 ? "text-risk-high" : delta < 0 ? "text-risk-low" : "text-muted-foreground",
          )}
        >
          <Icon className="size-4" />
          {delta === 0 ? "No change" : `${Math.abs(delta)} points from previous assessment`}
        </p>
      ) : null}
      <p className="text-[11px] text-muted-foreground">Prototype welfare risk bands</p>
    </div>
  );
}
