import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Input } from "@/components/ui/input";
import { AUDIT_LOGS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — SentinelWell" },
      {
        name: "description",
        content: "Immutable access log of every welfare data view, action and authorisation result.",
      },
      { property: "og:title", content: "Audit Logs — SentinelWell" },
      {
        property: "og:description",
        content: "Every access to welfare information is recorded and reviewable.",
      },
    ],
  }),
  component: AuditLogs,
});

function AuditLogs() {
  const [query, setQuery] = useState("");
  const rows = AUDIT_LOGS.filter((l) =>
    `${l.user} ${l.action} ${l.resource}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader title="Audit Logs" subtitle="Every access to welfare information is recorded." />

      <section className="panel p-6">
        <div className="relative mb-4 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user, action or resource..."
            className="pl-9"
            aria-label="Search audit logs"
          />
        </div>

        {rows.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            No log entries match this search.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                  <th className="px-4 py-3 font-medium">Resource</th>
                  <th className="px-4 py-3 font-medium">Timestamp</th>
                  <th className="px-4 py-3 font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((l) => (
                  <tr key={l.id} className="border-b border-border last:border-0 hover:bg-surface/70">
                    <td className="px-4 py-3 font-medium">{l.user}</td>
                    <td className="px-4 py-3">{l.action}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{l.resource}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.timestamp}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium",
                          l.result === "Authorized"
                            ? "bg-risk-low/12 text-risk-low"
                            : "bg-risk-critical/10 text-risk-critical",
                        )}
                      >
                        {l.result}
                      </span>
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
