import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Database, EyeOff, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { PrivacyCard } from "@/components/PrivacyCard";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/personnel/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Data Protection — SentinelWell" },
      {
        name: "description",
        content:
          "Role-based access, data minimisation, anonymised analytics and consent settings for personnel wellness data.",
      },
      { property: "og:title", content: "Privacy & Data Protection — SentinelWell" },
      {
        property: "og:description",
        content: "How SentinelWell protects personnel wellness data.",
      },
    ],
  }),
  component: PrivacyPage,
});

const CONSENTS = [
  {
    key: "self",
    label: "Wellness Self-Assessment",
    detail: "Your voluntary check-ins and assessments.",
    initial: true,
  },
  {
    key: "optional",
    label: "Optional Wellness Data",
    detail: "Sleep, energy and workload signals you choose to share.",
    initial: true,
  },
  {
    key: "biometric",
    label: "Biometric Data",
    detail:
      "Optional and only applicable where legally permitted and explicitly authorized.",
    initial: false,
  },
  {
    key: "analytics",
    label: "Analytics Participation",
    detail: "Include my anonymised data in aggregated unit analytics.",
    initial: true,
  },
];

function PrivacyPage() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(CONSENTS.map((c) => [c.key, c.initial])),
  );

  return (
    <>
      <PageHeader
        title="Privacy & Data Protection"
        subtitle="You control what is collected. Access is limited by role and always logged."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <PrivacyCard
          icon={KeyRound}
          title="Role-Based Access"
          description="Users can only access information appropriate to their role."
        />
        <PrivacyCard
          icon={Database}
          title="Data Protection"
          description="Sensitive information is protected using secure storage and controlled access."
        />
        <PrivacyCard
          icon={EyeOff}
          title="Data Minimization"
          description="Only necessary information should be collected."
        />
        <PrivacyCard
          icon={BarChart3}
          title="Anonymized Analytics"
          description="Aggregated analytics can be displayed without exposing individual identities."
        />
      </div>

      <section className="panel mt-6 p-6">
        <h2 className="font-display text-lg font-semibold">Consent Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Changes apply immediately to future data collection.
        </p>
        <ul className="mt-5 divide-y divide-border">
          {CONSENTS.map((c) => (
            <li key={c.key} className="flex items-start justify-between gap-6 py-4">
              <div>
                <p className="font-medium">{c.label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.detail}</p>
              </div>
              <Switch
                checked={state[c.key] ?? false}
                onCheckedChange={(v) => {
                  setState((s) => ({ ...s, [c.key]: v }));
                  toast.success(`${c.label} ${v ? "enabled" : "disabled"}`);
                }}
                aria-label={c.label}
              />
            </li>
          ))}
        </ul>
      </section>

      <PrototypeNote />
    </>
  );
}
