import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { submitAssessment } from "@/services/wellnessService";
import { cn } from "@/lib/utils";

type Answers = Record<string, number | string>;

interface Question {
  key: string;
  title: string;
  helper: string;
  kind: "slider" | "radio" | "cards";
  max?: number;
  options?: string[];
}

const QUESTIONS: Question[] = [
  {
    key: "stress",
    title: "How would you rate your current stress level?",
    helper: "1 = very calm · 10 = extremely stressed",
    kind: "slider",
    max: 10,
  },
  {
    key: "sleep",
    title: "How well have you been sleeping?",
    helper: "1 = very poorly · 5 = very well",
    kind: "slider",
    max: 5,
  },
  {
    key: "energy",
    title: "How would you rate your energy?",
    helper: "1 = depleted · 5 = energised",
    kind: "slider",
    max: 5,
  },
  {
    key: "workload",
    title: "How manageable is your workload?",
    helper: "Select the option that fits best",
    kind: "cards",
    options: ["Very manageable", "Manageable", "Demanding", "Heavy", "Unsustainable"],
  },
  {
    key: "exhaustion",
    title: "How often have you felt mentally exhausted after duty?",
    helper: "Over the last four weeks",
    kind: "radio",
    options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
  },
  {
    key: "balance",
    title: "How satisfied are you with your current work-life balance?",
    helper: "Over the last four weeks",
    kind: "radio",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
  },
  {
    key: "support",
    title: "Would you like to speak with a welfare professional?",
    helper: "Entirely voluntary and confidential",
    kind: "cards",
    options: ["yes", "no"],
  },
];

const SUPPORT_LABEL: Record<string, string> = {
  yes: "Yes, please arrange a confidential conversation",
  no: "Not at this time",
};

export function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ stress: 5, sleep: 3, energy: 3 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ supportRequested: boolean } | null>(null);
  const [error, setError] = useState("");

  const q = QUESTIONS[step]!;
  const value = answers[q.key];
  const progress = ((step + (result ? 1 : 0)) / QUESTIONS.length) * 100;

  function set(v: number | string) {
    setAnswers((a) => ({ ...a, [q.key]: v }));
    setError("");
  }

  async function next() {
    if (value === undefined || value === "") {
      setError("Please answer this question to continue.");
      return;
    }
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    const res = await submitAssessment(answers);
    setLoading(false);
    setResult({ supportRequested: res.supportRequested });
  }

  if (result) {
    return (
      <section className="panel p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-risk-low/12 text-risk-low">
          <CheckCircle2 className="size-7" />
        </span>
        <h2 className="mt-5 font-display text-xl font-semibold">
          Thank you for completing your wellness check-in.
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Your responses are stored under role-based access controls and contribute only to your
          confidential welfare indicators.
        </p>
        {result.supportRequested ? (
          <p className="mx-auto mt-5 max-w-lg rounded-xl border border-navy/20 bg-navy/5 px-4 py-3 text-sm">
            <ShieldCheck className="mr-2 inline size-4 text-navy" />
            Your confidential support request has been sent to the authorized welfare team.
          </p>
        ) : null}
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setResult(null);
            setStep(0);
          }}
        >
          Start a new assessment
        </Button>
      </section>
    );
  }

  return (
    <section className="panel p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step {step + 1} of {QUESTIONS.length}
        </span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="mt-2 h-1.5" />

      <h2 className="mt-7 font-display text-xl font-semibold">{q.title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{q.helper}</p>

      <div className="mt-7">
        {q.kind === "slider" ? (
          <div className="space-y-3">
            <p className="font-display text-4xl font-semibold tabular-nums">
              {Number(value ?? 1)}
              <span className="ml-1 text-base font-normal text-muted-foreground">/ {q.max}</span>
            </p>
            <Slider
              value={[Number(value ?? 1)]}
              min={1}
              max={q.max ?? 5}
              step={1}
              onValueChange={(v) => set(v[0] ?? 1)}
              aria-label={q.title}
            />
          </div>
        ) : null}

        {q.kind === "radio" ? (
          <RadioGroup value={String(value ?? "")} onValueChange={set} className="gap-2">
            {q.options!.map((o) => (
              <Label
                key={o}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                  value === o ? "border-navy bg-navy/5" : "border-border hover:bg-surface",
                )}
              >
                <RadioGroupItem value={o} />
                {o}
              </Label>
            ))}
          </RadioGroup>
        ) : null}

        {q.kind === "cards" ? (
          <div className={cn("grid gap-2", q.key === "support" ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
            {q.options!.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => set(o)}
                className={cn(
                  "rounded-xl border px-4 py-4 text-left text-sm font-medium transition-colors",
                  value === o
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-border hover:bg-surface",
                )}
              >
                {q.key === "support" ? SUPPORT_LABEL[o] : o}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          <ChevronLeft className="size-4" /> Back
        </Button>
        <Button onClick={next} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          {step === QUESTIONS.length - 1 ? "Submit Assessment" : "Continue"}
          {step < QUESTIONS.length - 1 ? <ChevronRight className="size-4" /> : null}
        </Button>
      </div>
    </section>
  );
}
