import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { RiskBadge } from "@/components/RiskBadge";
import { PrototypeNote } from "@/components/PrototypeNote";
import { RiskDistributionChart, SimpleBarChart, TrendChart } from "@/components/charts";
import { COMMANDER_SUMMARY, LEAVE_UTILISATION, UNITS, UNIT_TREND } from "@/data/mockData";

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
  const distribution = [
    { name: "Low", value: COMMANDER_SUMMARY.low, color: "var(--risk-low)" },
    { name: "Moderate", value: COMMANDER_SUMMARY.moderate, color: "var(--risk-moderate)" },
    { name: "High", value: COMMANDER_SUMMARY.high, color: "var(--risk-high)" },
    { name: "Critical", value: COMMANDER_SUMMARY.critical, color: "var(--risk-critical)" },
  ];

  return (
    <>
      <PageHeader
        title="Unit Analytics"
        subtitle="Anonymised aggregate analysis · no individual wellness records displayed."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Risk mix across command</h2>
          <div className="mt-4">
            <RiskDistributionChart data={distribution} height={260} />
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Average risk by unit</h2>
          <div className="mt-4">
            <TrendChart
              data={UNIT_TREND}
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
          <h2 className="font-display text-lg font-semibold">Leave utilisation by unit</h2>
          <div className="mt-4">
            <SimpleBarChart data={LEAVE_UTILISATION} xKey="unit" dataKey="utilised" color="var(--teal)" />
          </div>
        </section>
        <section className="panel p-6">
          <h2 className="font-display text-lg font-semibold">Unit standing</h2>
          <ul className="mt-4 divide-y divide-border">
            {UNITS.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {u.personnel} personnel · trend {u.trend.toLowerCase()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-semibold tabular-nums">
                    {u.averageRisk}
                  </span>
                  <RiskBadge band={u.band} size="sm" />
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
