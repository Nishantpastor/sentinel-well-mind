import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "./RiskBadge";
import type { WelfareAlert } from "@/types";

export function AlertCard({
  alert,
  onAcknowledge,
}: {
  alert: WelfareAlert;
  onAcknowledge?: (id: string) => void;
}) {
  return (
    <article className="panel p-5">
      <div className="flex flex-wrap items-start gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-risk-high/10 text-risk-high">
          <ShieldAlert className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold">{alert.type}</h3>
            <RiskBadge band={alert.severity} size="sm" />
            {alert.acknowledged ? (
              <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Acknowledged
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {alert.id} · <span className="font-mono">{alert.personnelId}</span> · {alert.unit} ·{" "}
            {alert.raisedAt}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-semibold tabular-nums">{alert.score}</p>
          <p className="inline-flex items-center gap-1 text-xs text-risk-high">
            <ArrowUpRight className="size-3" />
            {alert.previousScore} → {alert.score}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-surface p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Detected changes
          </p>
          <ul className="mt-2 space-y-1.5">
            {alert.detectedChanges.map((c) => (
              <li key={c} className="flex gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-high" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recommendation
          </p>
          <p className="mt-2 text-sm">{alert.recommendation}</p>
          <p className="mt-3 text-[11px] text-muted-foreground">
            AI-generated welfare indicator · not a medical diagnosis
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link to="/welfare/personnel/$id" params={{ id: alert.personnelId }}>
            Review
          </Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={alert.acknowledged}
          onClick={() => onAcknowledge?.(alert.id)}
        >
          <Check className="size-3.5" />
          {alert.acknowledged ? "Acknowledged" : "Acknowledge"}
        </Button>
      </div>
    </article>
  );
}
