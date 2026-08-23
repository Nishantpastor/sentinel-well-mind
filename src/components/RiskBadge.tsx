import { cn } from "@/lib/utils";
import type { RiskBand } from "@/types";

const STYLES: Record<RiskBand, string> = {
  LOW: "bg-risk-low/12 text-risk-low border-risk-low/30",
  MODERATE: "bg-risk-moderate/15 text-risk-moderate border-risk-moderate/35",
  HIGH: "bg-risk-high/12 text-risk-high border-risk-high/30",
  CRITICAL: "bg-risk-critical/10 text-risk-critical border-risk-critical/30",
};

export function RiskBadge({
  band,
  className,
  size = "default",
}: {
  band: RiskBand;
  className?: string;
  size?: "sm" | "default";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        STYLES[band],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {band}
    </span>
  );
}
