import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNote } from "@/components/PrototypeNote";
import { TrendChart } from "@/components/charts";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyTrends } from "@/services/wellnessService";
import type { MonthlySeries } from "@/types";

export const Route = createFileRoute("/personnel/trends")({
  head: () => ({
    meta: [
      { title: "My Trends — SentinelWell" },
      {
        name: "description",
        content: "Six-month personal trends for stress, sleep, workload and welfare risk.",
      },
      { property: "og:title", content: "My Trends — SentinelWell" },
      {
        property: "og:description",
        content: "Track your stress, sleep, workload and welfare risk indicators over time.",
      },
    ],
  }),
  component: TrendsPage,
});

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel p-6">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TrendsPage() {
  const [series, setSeries] = useState<MonthlySeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTrends()
      .then((data) => {
        setSeries(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="My Wellness Trends"
        subtitle="Six months of self-reported and duty-derived indicators."
      />

      <div className="panel mb-6 flex flex-col gap-4 border-l-[3px] border-l-risk-high p-6 sm:flex-row sm:items-start">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-risk-high/10 text-risk-high">
          <TrendingUp className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-base font-semibold">
            Your stress indicators have increased over the last 3 weeks.
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Consider completing a wellness check-in or requesting support. These are prototype
            welfare indicators, not a medical assessment.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="size-3.5" />
            Sleep quality has declined alongside a rise in reported workload.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Stress Trend" subtitle="Self-reported, scale 1–10">
            <TrendChart
              data={series}
              series={[{ key: "stress", label: "Stress", color: "var(--risk-high)" }]}
              yDomain={[0, 10]}
            />
          </Panel>
          <Panel title="Sleep Trend" subtitle="Self-reported quality, scale 1–5">
            <TrendChart
              data={series}
              series={[{ key: "sleep", label: "Sleep", color: "var(--teal)" }]}
              yDomain={[0, 5]}
            />
          </Panel>
          <Panel title="Workload Trend" subtitle="Perceived workload, scale 1–5">
            <TrendChart
              data={series}
              series={[{ key: "workload", label: "Workload", color: "var(--risk-moderate)" }]}
              yDomain={[0, 5]}
            />
          </Panel>
          <Panel title="Wellness Risk" subtitle="Composite prototype welfare risk score">
            <TrendChart
              data={series}
              series={[{ key: "risk", label: "Welfare risk", color: "var(--navy)" }]}
              yDomain={[0, 100]}
            />
          </Panel>
        </div>
      )}

      <PrototypeNote />
    </>
  );
}
