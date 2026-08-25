import { apiFetch } from "./api";

export interface AuditLogItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  result: "Authorized" | "Denied";
}

export interface AdminUserItem {
  id: string;
  serviceId: string;
  displayName: string;
  role: { name: string };
  createdAt: string;
}

export interface AdminRoleItem {
  id: string;
  name: string;
  description?: string;
}

export async function listAuditLogs(search?: string): Promise<AuditLogItem[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return apiFetch<AuditLogItem[]>(`/admin/audit-logs${query}`);
}

export async function listAdminUsers(): Promise<AdminUserItem[]> {
  return apiFetch<AdminUserItem[]>("/admin/users");
}

export async function listAdminRoles(): Promise<AdminRoleItem[]> {
  return apiFetch<AdminRoleItem[]>("/admin/roles");
}
