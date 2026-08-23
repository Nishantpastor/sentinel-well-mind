import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NOTIFICATIONS } from "@/data/mockData";

export function NotificationDropdown({ extra = 0 }: { extra?: number }) {
  const count = NOTIFICATIONS.length + extra;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4.5" />
          <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-risk-high text-[9px] font-semibold text-white">
            {count}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <p className="text-xs text-muted-foreground">{count} recent items</p>
        </div>
        <ul className="max-h-80 overflow-y-auto">
          {extra > 0 ? (
            <li className="border-b border-border px-4 py-3">
              <p className="text-sm font-medium text-risk-high">New high-risk welfare alert</p>
              <p className="text-xs text-muted-foreground">P-1024 · risk 42 → 82</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Just now</p>
            </li>
          ) : null}
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="border-b border-border px-4 py-3 last:border-0">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.detail}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
