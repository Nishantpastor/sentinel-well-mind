import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { SimpleBarChart, TrendChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import {
  COMMANDER_SUMMARY,
  DEPLOYMENT_DISTRIBUTION,
  FATIGUE_INDICATORS,
  LEAVE_UTILISATION,
  UNIT_TREND,
  WORKLOAD_TREND,
} from "@/data/mockData";

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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Personnel" value={COMMANDER_SUMMARY.total} icon={Users} />
        <StatCard label="Low Risk" value={COMMANDER_SUMMARY.low} accent="low" />
        <StatCard label="Moderate" value={COMMANDER_SUMMARY.moderate} accent="moderate" />
        <StatCard label="High" value={COMMANDER_SUMMARY.high} accent="high" />
        <StatCard label="Critical" value={COMMANDER_SUMMARY.critical} accent="critical" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Unit wellness trend</h2>
          <p className="mt-1 text-sm text-muted-foreground">Average welfare risk by unit</p>
          <div className="mt-4">
            <TrendChart
              data={UNIT_TREND}
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
          <p className="mt-1 text-sm text-muted-foreground">Average monthly duty hours vs target</p>
          <div className="mt-4">
            <TrendChart
              data={WORKLOAD_TREND}
              series={[
                { key: "hours", label: "Duty hours", color: "var(--navy)" },
                { key: "target", label: "Target", color: "var(--risk-low)" },
              ]}
            />
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Deployment distribution</h2>
          <p className="mt-1 text-sm text-muted-foreground">Personnel by continuous deployment</p>
          <div className="mt-4">
            <SimpleBarChart
              data={DEPLOYMENT_DISTRIBUTION}
              xKey="band"
              dataKey="personnel"
              color="var(--navy)"
            />
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-display text-base font-semibold">Leave utilisation</h2>
          <p className="mt-1 text-sm text-muted-foreground">Percentage of entitlement used</p>
          <div className="mt-4">
            <SimpleBarChart
              data={LEAVE_UTILISATION}
              xKey="unit"
              dataKey="utilised"
              color="var(--teal)"
            />
          </div>
        </section>

        <section className="panel p-6 xl:col-span-2">
          <h2 className="font-display text-base font-semibold">Fatigue indicators</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Average night shifts and reported sleep-deficit days per person
          </p>
          <div className="mt-4">
            <TrendChart
              data={FATIGUE_INDICATORS}
              series={[
                { key: "nightShifts", label: "Night shifts", color: "var(--risk-high)" },
                { key: "sleepDeficit", label: "Sleep-deficit days", color: "var(--risk-moderate)" },
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
            Average workload increased 18% this month.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-moderate" />
            Unit B shows increasing fatigue indicators.
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-low" />
            Unit A wellness indicators remain stable.
          </li>
        </ul>
        <p className="mt-5 rounded-lg bg-surface px-4 py-3 text-sm font-medium">
          Recommendation: Review duty distribution for Unit B.
        </p>
      </section>

      <PrototypeNote />
    </>
  );
}
