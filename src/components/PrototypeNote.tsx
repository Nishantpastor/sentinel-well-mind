import { ShieldCheck } from "lucide-react";

export function PrototypeNote() {
  return (
    <p className="mt-10 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
      <ShieldCheck className="size-3.5" />
      Prototype • Synthetic Data • AI risk indicators are not medical diagnoses
    </p>
  );
}
