import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, HeartHandshake, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { PrototypeNote } from "@/components/PrototypeNote";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { requestSupport } from "@/services/wellnessService";

export const Route = createFileRoute("/personnel/support")({
  head: () => ({
    meta: [
      { title: "Confidential Support — SentinelWell" },
      {
        name: "description",
        content: "Request confidential welfare support and access wellness resources.",
      },
      { property: "og:title", content: "Confidential Support — SentinelWell" },
      {
        property: "og:description",
        content: "Connect with an authorised welfare professional, confidentially.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState(false);

  async function confirm() {
    setLoading(true);
    const res = await requestSupport();
    setLoading(false);
    setOpen(false);
    toast.success("Confidential support request sent.", {
      description: `Reference ${res.reference} · authorised welfare team only`,
    });
  }

  return (
    <>
      <PageHeader
        title="Support"
        subtitle="Confidential welfare assistance, available whenever you need it."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="panel p-6">
          <span className="grid size-10 place-items-center rounded-lg bg-navy/8 text-navy">
            <HeartHandshake className="size-5" />
          </span>
          <h2 className="mt-4 font-display text-base font-semibold">Request Welfare Support</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Connect with an authorized welfare professional.
          </p>
          <Button className="mt-5" onClick={() => setOpen(true)}>
            Request Support
          </Button>
        </section>

        <section className="panel p-6">
          <span className="grid size-10 place-items-center rounded-lg bg-teal/12 text-teal">
            <BookOpen className="size-5" />
          </span>
          <h2 className="mt-4 font-display text-base font-semibold">Wellness Resources</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Access available wellness and counseling resources.
          </p>
          <Button className="mt-5" variant="outline" onClick={() => setResources((v) => !v)}>
            {resources ? "Hide Resources" : "View Resources"}
          </Button>
          {resources ? (
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Sleep and recovery guidance for shift duty</li>
              <li>· Stress regulation and breathing practices</li>
              <li>· Unit counselling helpline (24×7)</li>
              <li>· Family welfare support desk</li>
            </ul>
          ) : null}
        </section>

        <section className="panel p-6">
          <span className="grid size-10 place-items-center rounded-lg bg-risk-low/12 text-risk-low">
            <Lock className="size-5" />
          </span>
          <h2 className="mt-4 font-display text-base font-semibold">Confidentiality</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your wellness information is protected through role-based access. Commanders see only
            aggregated, anonymised unit indicators.
          </p>
        </section>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send a confidential support request?</AlertDialogTitle>
            <AlertDialogDescription>
              Your request will be visible only to the authorized welfare team. It is not shared
              with your chain of command and is never treated as a disciplinary matter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); confirm(); }} disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              Send request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PrototypeNote />
    </>
  );
}
