import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  accent = "navy",
  className,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: LucideIcon;
  accent?: "navy" | "low" | "moderate" | "high" | "critical";
  className?: string;
}) {
  const accents: Record<string, string> = {
    navy: "text-navy bg-navy/8",
    low: "text-risk-low bg-risk-low/10",
    moderate: "text-risk-moderate bg-risk-moderate/12",
    high: "text-risk-high bg-risk-high/10",
    critical: "text-risk-critical bg-risk-critical/10",
  };
  const bars: Record<string, string> = {
    navy: "bg-navy",
    low: "bg-risk-low",
    moderate: "bg-risk-moderate",
    high: "bg-risk-high",
    critical: "bg-risk-critical",
  };

  return (
    <div className={cn("panel relative overflow-hidden p-5", className)}>
      <span className={cn("absolute inset-y-0 left-0 w-[3px]", bars[accent])} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
          {sublabel ? <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p> : null}
        </div>
        {Icon ? (
          <span className={cn("grid size-9 place-items-center rounded-lg", accents[accent])}>
            <Icon className="size-4.5" strokeWidth={2} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
