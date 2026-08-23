import type { Role } from "@/types";

export interface DemoUser {
  role: Role;
  displayName: string;
  serviceId: string;
}

const DEMO_USERS: Record<Role, DemoUser> = {
  personnel: { role: "personnel", displayName: "Personnel Demo", serviceId: "P-1024" },
  welfare: { role: "welfare", displayName: "Welfare Officer Demo", serviceId: "WO-208" },
  commander: { role: "commander", displayName: "Commander Demo", serviceId: "CO-014" },
  admin: { role: "admin", displayName: "Administrator Demo", serviceId: "AD-001" },
};

export const ROLE_LABEL: Record<Role, string> = {
  personnel: "Personnel",
  welfare: "Welfare Officer",
  commander: "Commander",
  admin: "Administrator",
};

export const ROLE_HOME: Record<Role, string> = {
  personnel: "/personnel/dashboard",
  welfare: "/welfare/dashboard",
  commander: "/commander/dashboard",
  admin: "/admin/dashboard",
};

export async function signInDemo(role: Role): Promise<DemoUser> {
  await new Promise((r) => setTimeout(r, 450));
  return DEMO_USERS[role];
}

export function getDemoUser(role: Role): DemoUser {
  return DEMO_USERS[role];
}
