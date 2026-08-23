import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { submitCheckIn } from "@/services/wellnessService";
import { cn } from "@/lib/utils";

const MOODS = ["Very Low", "Low", "Okay", "Good", "Excellent"];

function ScaleField({
  label,
  value,
  min,
  max,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  hint: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-semibold tabular-nums">
          {value}
          <span className="text-muted-foreground"> / {max}</span>
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onChange(v[0] ?? value)}
        aria-label={label}
      />
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export function WellnessCheckIn() {
  const [stress, setStress] = useState(4);
  const [sleep, setSleep] = useState(4);
  const [energy, setEnergy] = useState(4);
  const [workload, setWorkload] = useState(3);
  const [mood, setMood] = useState("Okay");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    setLoading(true);
    await submitCheckIn({ stress, sleep, energy, workload, mood });
    setLoading(false);
    setDone(true);
    toast.success("Wellness check-in recorded securely.", {
      description: "Visible only to authorised welfare roles.",
    });
  }

  return (
    <section className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold">How are you feeling today?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Voluntary daily check-in · takes under a minute
          </p>
        </div>
        {done ? (
          <span className="rounded-full bg-risk-low/12 px-3 py-1 text-xs font-medium text-risk-low">
            Recorded today
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ScaleField
          label="Stress"
          value={stress}
          min={1}
          max={10}
          hint="1 = very calm · 10 = extremely stressed"
          onChange={setStress}
        />
        <ScaleField
          label="Sleep"
          value={sleep}
          min={1}
          max={5}
          hint="1 = very poor · 5 = fully rested"
          onChange={setSleep}
        />
        <ScaleField
          label="Energy"
          value={energy}
          min={1}
          max={5}
          hint="1 = depleted · 5 = energised"
          onChange={setEnergy}
        />
        <ScaleField
          label="Workload"
          value={workload}
          min={1}
          max={5}
          hint="1 = light · 5 = very heavy"
          onChange={setWorkload}
        />
      </div>

      <div className="mt-6 space-y-2.5">
        <Label>Mood</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                mood === m
                  ? "border-navy bg-navy text-navy-foreground"
                  : "border-border hover:bg-surface",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <Button className="mt-6" size="lg" onClick={submit} disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {loading ? "Recording…" : "Complete Check-In"}
      </Button>
    </section>
  );
}
