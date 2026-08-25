import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BrainCircuit, Info, Lock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RiskGauge } from "@/components/RiskGauge";
import { RiskScore } from "@/components/RiskScore";
import { RecommendationCard } from "@/components/RecommendationCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { TrendChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPersonnel } from "@/services/personnelService";
import { explainRisk, getRecommendations } from "@/services/riskService";
import type { Personnel, Recommendation } from "@/types";

export const Route = createFileRoute("/welfare/personnel/$id")({
  head: () => ({
    meta: [
      { title: "Personnel Risk Detail — SentinelWell" },
      {
        name: "description",
        content:
          "Explainable welfare risk profile: risk gauge, contributing factors, trends and recommended welfare actions.",
      },
      { property: "og:title", content: "Personnel Risk Detail — SentinelWell" },
      {
        property: "og:description",
        content: "Explainable AI welfare risk indicators with recommended supportive actions.",
      },
    ],
  }),
  component: PersonnelDetail,
});

function PersonnelDetail() {
  const { id } = Route.useParams();
  const [person, setPerson] = useState<Personnel | null>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPersonnel(id), getRecommendations(id), explainRisk(id)]).then(([p, r, exp]) => {
      setPerson(p ?? null);
      setRecs(r);
      setExplanation(exp);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="panel p-12 text-center">
        <h1 className="font-display text-xl font-semibold">Personnel record not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {id} is not available in the database.
        </p>
        <Button asChild className="mt-5" variant="outline">
          <Link to="/welfare/personnel">Back to personnel</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="mb-3 px-0">
        <Link to="/welfare/personnel">
          <ArrowLeft className="size-4" /> Back to personnel
        </Link>
      </Button>

      <PageHeader
        title={`Personnel ${person.id}`}
        subtitle={`${person.unit} · ${person.role} · last assessment ${person.lastAssessment}`}
      />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <section className="panel flex flex-col items-center gap-6 p-6">
          <RiskGauge score={person.riskScore} />
          <RiskScore score={person.riskScore} previous={person.previousScore} compact />
          <dl className="grid w-full grid-cols-3 gap-3 border-t border-border pt-5 text-center">
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Deployment
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold">{person.deploymentDays}d</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Night shifts
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold">{person.nightShifts}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Leave days
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold">{person.leaveTaken}</dd>
            </div>
          </dl>
        </section>

        <div className="space-y-6">
          <section className="panel p-6">
            <h2 className="font-display text-lg font-semibold">Risk Factors</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Relative contribution to the current welfare risk indicator
            </p>
            <ul className="mt-5 space-y-4">
              {person.factors.map((f) => (
                <li key={f.label}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{f.label}</span>
                    <span className="tabular-nums text-muted-foreground">{f.value}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-navy transition-[width] duration-700"
                      style={{ width: `${f.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel border-l-[3px] border-l-teal p-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className="size-5 text-teal" />
              <h2 className="font-display text-lg font-semibold">Why is this risk elevated?</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{explanation}</p>
            <div className="mt-4 flex gap-3 rounded-lg bg-surface p-4">
              <Info className="mt-0.5 size-4 shrink-0 text-navy" />
              <div>
                <p className="text-sm font-semibold">Important</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  This is an AI-generated welfare risk indicator and is NOT a medical diagnosis. It
                  supports, and never replaces, human welfare judgement.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Recent Trends</h2>
        <div className="grid gap-6 xl:grid-cols-2">
          {[
            { key: "stress", label: "Stress", color: "var(--risk-high)", domain: [0, 10] },
            { key: "sleep", label: "Sleep", color: "var(--teal)", domain: [0, 5] },
            { key: "workload", label: "Workload", color: "var(--risk-moderate)", domain: [0, 5] },
            { key: "dutyHours", label: "Duty Hours (monthly)", color: "var(--navy)", domain: [120, 280] },
            { key: "risk", label: "Risk Score", color: "var(--risk-critical)", domain: [0, 100] },
          ].map((s) => (
            <div key={s.key} className="panel p-6">
              <h3 className="font-display text-base font-semibold">{s.label}</h3>
              <div className="mt-3">
                <TrendChart
                  data={person.series}
                  series={[{ key: s.key, label: s.label, color: s.color }]}
                  yDomain={s.domain as [number, number]}
                  height={200}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-semibold">Recommended Welfare Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Supportive actions only · never disciplinary
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] text-muted-foreground">
            <Lock className="size-3" /> Restricted to authorised welfare roles
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {recs.map((r) => (
            <RecommendationCard key={r.id} recommendation={r} />
          ))}
        </div>
      </section>

      <PrototypeNote />
    </>
  );
}
