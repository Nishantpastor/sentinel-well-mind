import { useState } from "react";
import { Loader2, Lock, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recordIntervention } from "@/services/interventionService";
import type { Intervention, InterventionStatus } from "@/types";

const TYPES = [
  "Confidential welfare follow-up",
  "Duty workload review",
  "Rest rotation review",
  "Counselling resources offered",
  "Scheduled follow-up assessment",
];

const STATUSES: InterventionStatus[] = [
  "Pending",
  "In Progress",
  "Completed",
  "Follow-up Required",
];

export function InterventionModal({ onCreated }: { onCreated: (i: Intervention) => void }) {
  const [open, setOpen] = useState(false);
  const [personnelId, setPersonnelId] = useState("");
  const [type, setType] = useState(TYPES[0]!);
  const [priority, setPriority] = useState("High");
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [status, setStatus] = useState<InterventionStatus>("Pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!/^P-\d{4}$/.test(personnelId.trim())) {
      setError("Enter a valid personnel ID (e.g. P-1024).");
      return;
    }
    setError("");
    setLoading(true);
    const created = await recordIntervention({
      personnelId: personnelId.trim(),
      type,
      officer: "WO-208",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status,
      followUp: followUp || "—",
    });
    setLoading(false);
    setOpen(false);
    onCreated(created);
    setPersonnelId("");
    setNotes("");
    toast.success("Welfare intervention recorded", {
      description: `${created.id} · ${priority} priority · restricted notes stored`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Record Intervention
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Record Welfare Intervention</DialogTitle>
          <DialogDescription>
            Supportive action log. Notes are restricted to authorised welfare roles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pid">Personnel ID</Label>
            <Input
              id="pid"
              value={personnelId}
              onChange={(e) => setPersonnelId(e.target.value)}
              placeholder="P-1024"
            />
          </div>
          <div className="space-y-2">
            <Label>Intervention type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["High", "Medium", "Low"].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as InterventionStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="followup">Follow-up date</Label>
            <Input
              id="followup"
              type="date"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-1.5">
              <Lock className="size-3.5 text-muted-foreground" /> Notes (restricted)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Supportive, factual notes only."
              rows={3}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Save intervention
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
