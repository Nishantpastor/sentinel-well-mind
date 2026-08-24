import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BellRing, FileClock, ShieldCheck, UserCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/services/api";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Administration — SentinelWell" },
      {
        name: "description",
        content: "System administration overview: users, roles, welfare officers and system alerts.",
      },
      { property: "og:title", content: "Administration — SentinelWell" },
      {
        property: "og:description",
        content: "Manage users, roles and audit visibility across SentinelWell.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [welfareOfficerCount, setWelfareOfficerCount] = useState<number | null>(null);
  const [alertCount, setAlertCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiFetch<Array<{ role: { name: string } }>>("/admin/users"), apiFetch<unknown[]>("/alerts")])
      .then(([users, alerts]) => {
        setUserCount(users.length);
        setWelfareOfficerCount(
          users.filter((user) => user.role.name.toUpperCase() === "WELFARE_OFFICER").length,
        );
        setAlertCount(alerts.length);
      })
      .catch(() => setError("Unable to load live administration data."));
  }, []);

  return (
    <>
      <PageHeader title="Administration" subtitle="System configuration and access governance." />

      {error ? <p className="mb-4 rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={userCount ?? "—"} icon={Users} />
        <StatCard label="Active Users" value="Unavailable" sublabel="Activity data not recorded" icon={UserCheck} accent="low" />
        <StatCard label="Welfare Officers" value={welfareOfficerCount ?? "—"} icon={ShieldCheck} />
        <StatCard label="System Alerts" value={alertCount ?? "—"} sublabel="Recorded alerts" icon={BellRing} accent="moderate" />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          { title: "Users", detail: "Provision accounts and manage access status." },
          { title: "Roles", detail: "Define role-based permissions and data visibility." },
          { title: "Audit Logs", detail: "Review every access to welfare information." },
        ].map((c) => (
          <section key={c.title} className="panel p-6">
            <h2 className="font-display text-base font-semibold">{c.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.detail}</p>
            {c.title === "Audit Logs" ? (
              <Button asChild variant="outline" className="mt-4">
                <Link to="/admin/audit-logs">
                  <FileClock className="size-4" /> Open audit logs
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" className="mt-4 px-0" disabled>
                Manage <ArrowRight className="size-4" />
              </Button>
            )}
          </section>
        ))}
      </div>

      <PrototypeNote />
    </>
  );
}
