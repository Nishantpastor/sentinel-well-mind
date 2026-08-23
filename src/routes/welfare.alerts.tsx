import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { AlertCard } from "@/components/AlertCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Skeleton } from "@/components/ui/skeleton";
import { acknowledgeAlert, listAlerts } from "@/services/alertService";
import type { WelfareAlert } from "@/types";

export const Route = createFileRoute("/welfare/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Center — SentinelWell" },
      {
        name: "description",
        content:
          "Welfare alerts for elevated risk, fatigue trends, excessive workload and prolonged deployment.",
      },
      { property: "og:title", content: "Alert Center — SentinelWell" },
      {
        property: "og:description",
        content: "Review and acknowledge confidential welfare alerts.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [alerts, setAlerts] = useState<WelfareAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAlerts().then((a) => {
      setAlerts(a);
      setLoading(false);
    });
  }, []);

  async function acknowledge(id: string) {
    await acknowledgeAlert(id);
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
    toast.success("Alert acknowledged", { description: `${id} routed for welfare follow-up.` });
  }

  const open = alerts.filter((a) => !a.acknowledged).length;

  return (
    <>
      <PageHeader
        title="Alert Center"
        subtitle={`${open} alerts awaiting welfare review · all access is logged.`}
      />
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((a) => (
            <AlertCard key={a.id} alert={a} onAcknowledge={acknowledge} />
          ))}
        </div>
      )}
      <PrototypeNote />
    </>
  );
}
