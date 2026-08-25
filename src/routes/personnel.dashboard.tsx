import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BatteryCharging, HeartPulse, Moon, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { WellnessCheckIn } from "@/components/WellnessCheckIn";
import { PrototypeNote } from "@/components/PrototypeNote";
import { AreaTrendChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyTrends } from "@/services/wellnessService";
import { getMyProfile } from "@/services/personnelService";
import type { MonthlySeries, Personnel } from "@/types";

export const Route = createFileRoute("/personnel/dashboard")({
  head: () => ({
    meta: [
      { title: "My Wellness — SentinelWell" },
      {
        name: "description",
        content:
          "Personal wellness dashboard with daily check-in, stress, sleep and energy indicators.",
      },
      { property: "og:title", content: "My Wellness — SentinelWell" },
      {
        property: "og:description",
        content: "Confidential personal wellness check-in and welfare indicators.",
      },
    ],
  }),
  component: PersonnelDashboard,
});

function PersonnelDashboard() {
  const [series, setSeries] = useState<MonthlySeries[]>([]);
  const [profile, setProfile] = useState<Personnel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyTrends(), getMyProfile()])
      .then(([t, p]) => {
        setSeries(t || []);
        setProfile(p || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const latest = series.length > 0 ? series[series.length - 1] : null;
  const stressVal = latest?.stress ?? 4;
  const sleepVal = latest?.sleep ?? 4;
  const riskVal = profile?.riskScore ?? (latest?.risk ?? 38);
  const wellnessScore = 100 - riskVal;

  return (
    <>
      <PageHeader
        title="Good morning"
        subtitle="Your wellness matters. Take a moment to check in."
        actions={
          <Button asChild variant="outline">
            <Link to="/personnel/assessment">
              Full assessment <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Wellness Score" value={`${wellnessScore} / 100`} sublabel={wellnessScore >= 60 ? "Good" : "Needs Attention"} icon={HeartPulse} accent={wellnessScore >= 60 ? "low" : "high"} />
          <StatCard label="Stress" value={`${stressVal} / 10`} sublabel={stressVal <= 4 ? "Low" : stressVal <= 7 ? "Moderate" : "High"} icon={Activity} accent={stressVal <= 4 ? "low" : "moderate"} />
          <StatCard label="Sleep" value={`${sleepVal} / 5`} sublabel={sleepVal >= 4 ? "Good" : "Fair"} icon={Moon} accent={sleepVal >= 4 ? "low" : "moderate"} />
          <StatCard label="Energy" value="4 / 5" sublabel="Good" icon={BatteryCharging} accent="low" />
        </div>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <WellnessCheckIn />
        <div className="space-y-6">
          <section className="panel p-6">
            <h2 className="font-display text-base font-semibold">Your 6-month wellness trend</h2>
            <p className="mt-1 text-sm text-muted-foreground">Self-reported stress indicators</p>
            <div className="mt-4">
              {loading ? (
                <Skeleton className="h-[180px] w-full rounded-xl" />
              ) : (
                <AreaTrendChart data={series} dataKey="stress" color="var(--risk-high)" height={180} />
              )}
            </div>
            <Button asChild variant="ghost" className="mt-2 px-0">
              <Link to="/personnel/trends">
                View all trends <ArrowRight className="size-4" />
              </Link>
            </Button>
          </section>
          <section className="panel border-l-[3px] border-l-navy p-6">
            <h2 className="font-display text-base font-semibold">Support is available</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Requesting welfare support is voluntary and confidential. It is never recorded as a
              performance or disciplinary matter.
            </p>
            <Button asChild className="mt-4">
              <Link to="/personnel/support">Request Support</Link>
            </Button>
          </section>
        </div>
      </div>

      <PrototypeNote />
    </>
  );
}
