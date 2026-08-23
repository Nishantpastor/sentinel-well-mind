import { useState } from "react";
import { CalendarClock, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types";

const PRIORITY: Record<Recommendation["priority"], string> = {
  High: "bg-risk-high/12 text-risk-high",
  Medium: "bg-risk-moderate/15 text-risk-moderate",
  Low: "bg-risk-low/12 text-risk-low",
};

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const [state, setState] = useState<"open" | "accepted" | "scheduled" | "dismissed">("open");

  return (
    <div
      className={cn(
        "rounded-xl border border-border p-4 transition-colors",
        state === "dismissed" && "opacity-55",
        state !== "open" && state !== "dismissed" && "border-risk-low/40 bg-risk-low/5",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium">{recommendation.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{recommendation.detail}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            PRIORITY[recommendation.priority],
          )}
        >
          {recommendation.priority} priority
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {state === "open" ? (
          <>
            <Button
              size="sm"
              onClick={() => {
                setState("accepted");
                toast.success("Recommendation accepted", {
                  description: recommendation.title,
                });
              }}
            >
              <Check className="size-3.5" /> Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setState("scheduled");
                toast.success("Follow-up scheduled", { description: "Within 7 days" });
              }}
            >
              <CalendarClock className="size-3.5" /> Schedule Follow-Up
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setState("dismissed")}>
              <X className="size-3.5" /> Dismiss
            </Button>
          </>
        ) : (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {state === "accepted"
              ? "Accepted"
              : state === "scheduled"
                ? "Follow-up scheduled"
                : "Dismissed"}
          </p>
        )}
      </div>
    </div>
  );
}
