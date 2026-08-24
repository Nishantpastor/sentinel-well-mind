import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { RiskBadge } from "@/components/RiskBadge";
import { PrototypeNote } from "@/components/PrototypeNote";
import { RiskDistributionChart, SimpleBarChart, TrendChart } from "@/components/charts";
import { listUnits } from "@/services/personnelService";
import { getCommanderSummary, getLeaveUtilisation, getUnitTrends } from "@/services/riskService";
import type { Unit } from "@/types";

export const Route = createFileRoute("/commander/analytics")({
  head: () => ({
    meta: [
      { title: "Unit Analytics — SentinelWell" },
      {
        name: "description",
        content: "Anonymised unit welfare analytics: risk mix, trends and leave utilisation.",
      },
      { property: "og:title", content: "Unit Analytics — SentinelWell" },
      {
        property: "og:description",
        content: "Anonymised welfare analytics across units.",
      },
    ],
  }),
  component: CommanderAnalytics,
});

function CommanderAnalytics() {
  const [summary, setSummary] = useState<{
    low: number;
    moderate: number;
    high: number;
    critical: number;
  } | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [leave, setLeave] = useState<object[]>([]);
  const [unitTrends, setUnitTrends] = useState<object[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getCommanderSummary(), listUnits(), getLeaveUtilisation(), getUnitTrends()])
      .then(([summaryData, unitsData, leaveData, trendsData]) => {
        setSummary(summaryData);
        setUnits(unitsData);
        setLeave(leaveData);
        setUnitTrends(trendsData);
      })
      .catch(() => setError("Unable to load live analytics data."));
  }, []);

  const distribution = [
    { name: "Low", value: summary?.low ?? 0, color: "var(--risk-low)" },
    { name: "Moderate", value: summary?.moderate ?? 0, color: "var(--risk-moderate)" },
    { name: "High", value: summary?.high ?? 0, color: "var(--risk-high)" },
    { name: "Critical", value: summary?.critical ?? 0, color: "var(--risk-critical)" },
  ];

  return (
    <>
      <PageHeader
        title="Unit Analytics"
        subtitle="Anonymised aggregate analysis · no individual wellness records displayed."
      />
      {error ? (
        <p className="mb-4 rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Risk mix across command</h2>
          <div className="mt-4">
            <RiskDistributionChart data={distribution} height={260} />
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Current average risk by unit</h2>
          <div className="mt-4">
            <TrendChart
              data={unitTrends}
              height={260}
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
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Average leave days taken by unit</h2>
          <div className="mt-4">
            <SimpleBarChart data={leave} xKey="unit" dataKey="daysTaken" color="var(--teal)" />
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Unit standing</h2>
          <ul className="mt-4 divide-y divide-border">
            {units.map((unit) => (
              <li key={unit.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium">{unit.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {unit.personnel} personnel · trend {unit.trend.toLowerCase()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-semibold tabular-nums">
                    {unit.averageRisk}
                  </span>
                  <RiskBadge band={unit.band} size="sm" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <PrototypeNote />
    </>
  );
}
