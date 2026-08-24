import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { SimpleBarChart, TrendChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { listUnits } from "@/services/personnelService";
import {
  getCommanderSummary,
  getDeploymentDistribution,
  getFatigueIndicators,
  getLeaveUtilisation,
  getUnitTrends,
  getWorkloadTrend,
} from "@/services/riskService";
import type { Unit } from "@/types";

export const Route = createFileRoute("/commander/dashboard")({
  head: () => ({
    meta: [
      { title: "Unit Wellness Overview — SentinelWell" },
      {
        name: "description",
        content:
          "Aggregated, anonymised unit welfare indicators: workload, deployment, leave and fatigue trends.",
      },
      { property: "og:title", content: "Unit Wellness Overview — SentinelWell" },
      {
        property: "og:description",
        content: "Aggregated operational welfare insights for commanders.",
      },
    ],
  }),
  component: CommanderDashboard,
});

function CommanderDashboard() {
  const [summary, setSummary] = useState<{ total: number; low: number; moderate: number; high: number; critical: number } | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [workload, setWorkload] = useState<object[]>([]);
  const [fatigue, setFatigue] = useState<object[]>([]);
  const [deployment, setDeployment] = useState<object[]>([]);
  const [leave, setLeave] = useState<object[]>([]);
  const [unitTrends, setUnitTrends] = useState<object[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getCommanderSummary(),
      listUnits(),
      getWorkloadTrend(),
      getFatigueIndicators(),
      getDeploymentDistribution(),
      getLeaveUtilisation(),
      getUnitTrends(),
    ])
      .then(([summaryData, unitsData, workloadData, fatigueData, deploymentData, leaveData, trendsData]) => {
        setSummary(summaryData);
        setUnits(unitsData);
        setWorkload(workloadData);
        setFatigue(fatigueData);
        setDeployment(deploymentData);
        setLeave(leaveData);
        setUnitTrends(trendsData);
      })
      .catch(() => setError("Unable to load live command data."));
  }, []);

  const currentUnit = units.reduce<Unit | undefined>(
    (highest, unit) => (!highest || unit.averageRisk > highest.averageRisk ? unit : highest),
    undefined,
  );

  return (
    <>
      <PageHeader
        title="Unit Wellness Overview"
        subtitle="Aggregated and anonymised. Individual wellness details are not displayed at this access level."
        actions={
          <Button asChild variant="outline">
            <Link to="/commander/analytics">
              Detailed analytics <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-risk-low" />
        <p className="text-sm text-muted-foreground">
          Commander access shows unit-level indicators only. Individual welfare profiles remain
          restricted to authorised welfare officers.
        </p>
      </div>

      {error ? <p className="mb-4 rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Personnel" value={summary?.total ?? "—"} icon={Users} />
        <StatCard label="Low Risk" value={summary?.low ?? "—"} accent="low" />
        <StatCard label="Moderate" value={summary?.moderate ?? "—"} accent="moderate" />
        <StatCard label="High" value={summary?.high ?? "—"} accent="high" />
        <StatCard label="Critical" value={summary?.critical ?? "—"} accent="critical" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Unit wellness trend</h2>
          <p className="mt-1 text-sm text-muted-foreground">Average welfare risk by unit</p>
          <div className="mt-4">
            <TrendChart
              data={unitTrends}
              yDomain={[0, 100]}
              series={[
                { key: "unitA", label: "Unit A", color: "var(--risk-low)" },
                { key: "unitB", label: "Unit B", color: "var(--risk-moderate)" },
                { key: "unitC", label: "Unit C", color: "var(--risk-high)" },
                { key: "unitD", label: "Unit D", color: "var(--teal)" },
              ]}
            />
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Workload trend</h2>
          <p className="mt-1 text-sm text-muted-foreground">Average monthly duty hours recorded</p>
          <div className="mt-4">
            <TrendChart
              data={workload}
              series={[
                { key: "hours", label: "Duty hours", color: "var(--navy)" },
              ]}
            />
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Deployment distribution</h2>
          <p className="mt-1 text-sm text-muted-foreground">Personnel by continuous deployment</p>
          <div className="mt-4">
            <SimpleBarChart
              data={deployment}
              xKey="band"
              dataKey="personnel"
              color="var(--navy)"
            />
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Average leave days taken</h2>
          <p className="mt-1 text-sm text-muted-foreground">Average recorded leave days by unit</p>
          <div className="mt-4">
            <SimpleBarChart
              data={leave}
              xKey="unit"
              dataKey="daysTaken"
              color="var(--teal)"
            />
          </div>
        </section>

        <section className="panel p-6 xl:col-span-2">
          <h2 className="font-display text-base font-semibold">Fatigue indicators</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Recorded night shifts by month; sleep-deficit history is unavailable
          </p>
          <div className="mt-4">
            <TrendChart
              data={fatigue}
              series={[
                { key: "nightShifts", label: "Night shifts", color: "var(--risk-high)" },
              ]}
            />
          </div>
        </section>
      </div>

      <section className="panel mt-6 border-l-[3px] border-l-navy p-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-5 text-navy" />
          <h2 className="font-display text-lg font-semibold">Operational Welfare Insights</h2>
        </div>
        <ul className="mt-4 space-y-2.5 text-sm">
          <li className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-high" />
            {currentUnit ? `${currentUnit.name} has the highest current average risk at ${currentUnit.averageRisk}.` : "Current unit risk is unavailable."}
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-moderate" />
            {units.find((unit) => unit.trend === "Increasing")?.name || "No unit is currently marked as increasing"} shows increasing fatigue indicators.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-low" />
            {units.find((unit) => unit.trend === "Stable")?.name || "No stable unit is currently recorded"} wellness indicators remain stable.
          </li>
        </ul>
        <p className="mt-5 rounded-lg bg-surface px-4 py-3 text-sm font-medium">
          Recommendation: {currentUnit ? `Review duty distribution for ${currentUnit.name}.` : "No recommendation is available."}
        </p>
      </section>

      <PrototypeNote />
    </>
  );
}
