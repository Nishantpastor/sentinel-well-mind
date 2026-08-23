import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const SIM_STEPS = [
  "Workload increases",
  "Sleep quality decreases",
  "Night shifts increase",
  "Self-reported stress increases",
  "AI detects sustained trend",
  "Welfare risk recalculated: 42 → 82",
  "High-risk alert raised",
  "Welfare recommendation generated",
];

export function SimulationPanel({ active, step }: { active: boolean; step: number }) {
  if (!active) return null;
  return (
    <section className="panel border-l-[3px] border-l-teal p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-teal" />
        <h2 className="font-display text-base font-semibold">AI welfare analysis in progress</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Demonstration of the detection pipeline on synthetic data for P-1024.
      </p>
      <ol className="mt-5 grid gap-2 md:grid-cols-2">
        {SIM_STEPS.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li
              key={s}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                done
                  ? "border-risk-low/35 bg-risk-low/5"
                  : current
                    ? "border-teal/40 bg-teal/5"
                    : "border-border opacity-55",
              )}
            >
              {done ? (
                <CheckCircle2 className="size-4 shrink-0 text-risk-low" />
              ) : current ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-teal" />
              ) : (
                <span className="size-4 shrink-0 rounded-full border border-border" />
              )}
              {s}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
