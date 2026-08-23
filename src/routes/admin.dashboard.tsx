import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BellRing, FileClock, ShieldCheck, UserCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Button } from "@/components/ui/button";

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
  return (
    <>
      <PageHeader title="Administration" subtitle="System configuration and access governance." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value="1,312" icon={Users} />
        <StatCard label="Active Users" value="1,188" sublabel="Last 30 days" icon={UserCheck} accent="low" />
        <StatCard label="Welfare Officers" value="24" icon={ShieldCheck} />
        <StatCard label="System Alerts" value="3" sublabel="Non-critical" icon={BellRing} accent="moderate" />
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
