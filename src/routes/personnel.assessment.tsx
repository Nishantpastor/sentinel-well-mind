import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { AssessmentForm } from "@/components/AssessmentForm";
import { PrototypeNote } from "@/components/PrototypeNote";

export const Route = createFileRoute("/personnel/assessment")({
  head: () => ({
    meta: [
      { title: "Wellness Assessment — SentinelWell" },
      {
        name: "description",
        content: "Voluntary step-by-step wellness self-assessment with confidential support option.",
      },
      { property: "og:title", content: "Wellness Assessment — SentinelWell" },
      {
        property: "og:description",
        content: "A short, confidential wellness self-assessment for personnel.",
      },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Wellness Self-Assessment"
        subtitle="Voluntary and confidential. Your answers support welfare planning only."
      />
      <AssessmentForm />
      <PrototypeNote />
    </div>
  );
}
