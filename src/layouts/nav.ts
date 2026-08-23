import {
  Activity,
  BellRing,
  ClipboardList,
  FileClock,
  Gauge,
  HeartHandshake,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  Users,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/types";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV: Record<Role, NavItem[]> = {
  personnel: [
    { to: "/personnel/dashboard", label: "My Wellness", icon: LayoutDashboard },
    { to: "/personnel/assessment", label: "Assessment", icon: ClipboardList },
    { to: "/personnel/trends", label: "My Trends", icon: LineChart },
    { to: "/personnel/support", label: "Support", icon: HeartHandshake },
    { to: "/personnel/privacy", label: "Privacy Center", icon: ShieldCheck },
  ],
  welfare: [
    { to: "/welfare/dashboard", label: "Command Center", icon: LayoutDashboard },
    { to: "/welfare/personnel", label: "Personnel", icon: Users },
    { to: "/welfare/alerts", label: "Alert Center", icon: BellRing },
    { to: "/welfare/interventions", label: "Interventions", icon: Stethoscope },
  ],
  commander: [
    { to: "/commander/dashboard", label: "Unit Overview", icon: Gauge },
    { to: "/commander/analytics", label: "Analytics", icon: Activity },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Administration", icon: LayoutDashboard },
    { to: "/admin/audit-logs", label: "Audit Logs", icon: FileClock },
  ],
};
