import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Minus,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
import { PersonnelTable } from "@/components/PersonnelTable";
import { PrototypeNote } from "@/components/PrototypeNote";
import { SimulationPanel, SIM_STEPS } from "@/components/SimulationPanel";
import { RiskDistributionChart, TrendChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { listPersonnel, listUnits } from "@/services/personnelService";
import { getOrgSummary, getRiskTrend } from "@/services/riskService";
import type { Personnel, Unit } from "@/types";

export const Route = createFileRoute("/welfare/dashboard")({
  head: () => ({
    meta: [
      { title: "Personnel Wellness Command Center — SentinelWell" },
      {
        name: "description",
        content:
          "Confidential welfare intelligence: risk distribution, trends, unit overview and high-risk personnel.",
      },
      { property: "og:title", content: "Personnel Wellness Command Center — SentinelWell" },
      {
        property: "og:description",
        content: "Confidential welfare intelligence for authorized personnel.",
      },
    ],
  }),
  component: WelfareDashboard,
});

type Summary = { total: number; low: number; moderate: number; high: number; critical: number };
type TrendPoint = { month: string; low: number; moderate: number; high: number; critical: number };

function WelfareDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [people, setPeople] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [simStep, setSimStep] = useState(-1);
  const [simDone, setSimDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    Promise.all([getOrgSummary(), getRiskTrend(), listUnits(), listPersonnel()]).then(
      ([s, t, u, p]) => {
        setSummary(s);
        setTrend(t);
        setUnits(u);
        setPeople(p);
        setLoading(false);
      },
    );
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  function runSimulation() {
    if (simStep >= 0 && !simDone) return;
    setSimDone(false);
    setSimStep(0);
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = SIM_STEPS.map((_, i) =>
      window.setTimeout(() => {
        setSimStep(i + 1);
        if (i === SIM_STEPS.length - 1) {
          setSimDone(true);
          setSummary((s) =>
            s ? { ...s, moderate: s.moderate - 1, high: s.high, critical: s.critical + 1 } : s,
          );
          setTrend((t) =>
            t.map((p, idx) =>
              idx === t.length - 1
                ? { ...p, moderate: p.moderate - 1, critical: p.critical + 1 }
                : p,
            ),
          );
          toast.warning("AI detected a significant increase in welfare risk indicators.", {
            description: "P-1024 · welfare risk 42 → 82 · new alert raised",
          });
        }
      }, 700 * (i + 1)),
    );
  }

  const simulated = simDone
    ? {
        "P-1024": { score: 82, band: "CRITICAL" as const, trend: "Increasing" as const },
      }
    : undefined;

  const distribution = summary
    ? [
        { name: "Low", value: summary.low, color: "var(--risk-low)" },
        { name: "Moderate", value: summary.moderate, color: "var(--risk-moderate)" },
        { name: "High", value: summary.high, color: "var(--risk-high)" },
        { name: "Critical", value: summary.critical, color: "var(--risk-critical)" },
      ]
    : [];

  return (
    <>
      <PageHeader
        title="Personnel Wellness Command Center"
        subtitle="Confidential welfare intelligence for authorized personnel."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/welfare/alerts">
                <BellRing className="size-4" />
                Alerts
                <span className="ml-1 rounded-full bg-risk-high/12 px-1.5 text-xs font-semibold text-risk-high">
                  {simDone ? 6 : 5}
                </span>
              </Link>
            </Button>
            <Button onClick={runSimulation} disabled={simStep >= 0 && !simDone}>
              <Sparkles className="size-4" />
              Simulate Increasing Stress
            </Button>
          </>
        }
      />

      {loading || !summary ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Total Personnel"
            value={summary.total.toLocaleString()}
            sublabel="Monitored across 4 units"
            icon={Users}
          />
          <StatCard label="Low Risk" value={summary.low} sublabel="Stable indicators" accent="low" />
          <StatCard
            label="Moderate Risk"
            value={summary.moderate}
            sublabel="Monitoring advised"
            accent="moderate"
          />
          <StatCard
            label="High Risk"
            value={summary.high}
            sublabel="Support recommended"
            accent="high"
            icon={TriangleAlert}
          />
          <StatCard
            label="Critical"
            value={summary.critical}
            sublabel="Priority welfare follow-up"
            accent="critical"
            icon={ShieldAlert}
          />
        </div>
      )}

      {simStep >= 0 ? (
        <div className="mt-6">
          <SimulationPanel active step={simStep} />
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.25fr]">
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Current Welfare Risk Distribution</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Aggregated across all monitored personnel
          </p>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <RiskDistributionChart data={distribution} />
            )}
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Personnel Welfare Risk Trend</h2>
          <p className="mt-1 text-sm text-muted-foreground">January – June, by risk band</p>
          <div className="mt-4">
            {loading ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <TrendChart
                data={trend}
                height={300}
                series={[
                  { key: "low", label: "Low", color: "var(--risk-low)" },
                  { key: "moderate", label: "Moderate", color: "var(--risk-moderate)" },
                  { key: "high", label: "High", color: "var(--risk-high)" },
                  { key: "critical", label: "Critical", color: "var(--risk-critical)" },
                ]}
              />
            )}
          </div>
        </section>
      </div>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Unit Wellness Overview</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {(loading ? [] : units).map((u) => (
            <div key={u.id} className="panel p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-base font-semibold">{u.name}</p>
                <RiskBadge band={u.band} size="sm" />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                Average risk
              </p>
              <p className="font-display text-2xl font-semibold tabular-nums">{u.averageRisk}</p>
              <p
                className={
                  u.trend === "Increasing"
                    ? "mt-2 inline-flex items-center gap-1 text-sm text-risk-high"
                    : "mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground"
                }
              >
                {u.trend === "Increasing" ? (
                  <ArrowUpRight className="size-3.5" />
                ) : (
                  <Minus className="size-3.5" />
                )}
                {u.trend} · {u.personnel} personnel
              </p>
              <Button asChild variant="ghost" size="sm" className="mt-3 px-0">
                <Link to="/commander/analytics">
                  View Unit Analytics <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-44 w-full rounded-xl" />
              ))
            : null}
        </div>
      </section>

      <section className="panel mt-6 p-6">
        <div className="mb-4">
          <h2 className="font-display text-lg font-semibold">High-Risk Personnel</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Identifiers only. Access to individual profiles is logged.
          </p>
        </div>
        <PersonnelTable data={people} loading={loading} overrides={simulated} />
      </section>

      <PrototypeNote />
    </>
  );
}
