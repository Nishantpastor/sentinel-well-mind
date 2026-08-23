import type { LucideIcon } from "lucide-react";

export function PrivacyCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="panel p-5">
      <span className="grid size-10 place-items-center rounded-lg bg-navy/8 text-navy">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
