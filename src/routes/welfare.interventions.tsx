import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RiskBadge } from "@/components/RiskBadge";
import { InterventionModal } from "@/components/InterventionModal";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Skeleton } from "@/components/ui/skeleton";
import { listInterventions } from "@/services/interventionService";
import type { Intervention, InterventionStatus } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/welfare/interventions")({
  head: () => ({
    meta: [
      { title: "Interventions — SentinelWell" },
      {
        name: "description",
        content: "Log and track confidential welfare interventions, owners, status and follow-ups.",
      },
      { property: "og:title", content: "Interventions — SentinelWell" },
      {
        property: "og:description",
        content: "Track supportive welfare interventions through to follow-up.",
      },
    ],
  }),
  component: InterventionsPage,
});

const STATUS_STYLE: Record<InterventionStatus, string> = {
  Pending: "bg-surface text-muted-foreground",
  "In Progress": "bg-teal/12 text-teal",
  Completed: "bg-risk-low/12 text-risk-low",
  "Follow-up Required": "bg-risk-moderate/15 text-risk-moderate",
};

function InterventionsPage() {
  const [rows, setRows] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listInterventions().then((i) => {
      setRows(i);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageHeader
        title="Welfare Interventions"
        subtitle="Supportive actions taken by authorised welfare officers."
        actions={<InterventionModal onCreated={(i) => setRows((r) => [i, ...r])} />}
      />

      <section className="panel p-6">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-sm font-medium">No interventions recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Personnel</th>
                  <th className="px-4 py-3 font-medium">Risk</th>
                  <th className="px-4 py-3 font-medium">Intervention</th>
                  <th className="px-4 py-3 font-medium">Assigned Officer</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Follow-Up</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface/70">
                    <td className="px-4 py-3 font-mono font-medium">{r.personnelId}</td>
                    <td className="px-4 py-3">
                      <RiskBadge band={r.band} size="sm" />
                    </td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.officer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium",
                          STATUS_STYLE[r.status],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.followUp}</td>
                    <td className="px-4 py-3">
                      {r.restricted ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[11px] text-muted-foreground">
                          <Lock className="size-3" />
                          Restricted
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Standard log</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <PrototypeNote />
    </>
  );
}
