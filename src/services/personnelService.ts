import type { Personnel, Unit } from "@/types";
import { apiFetch } from "./api";

export async function listPersonnel(): Promise<Personnel[]> {
  return apiFetch<Personnel[]>("/personnel");
}

export async function getPersonnel(id: string): Promise<Personnel | undefined> {
  return apiFetch<Personnel>(`/personnel/${id}`);
}

export async function listUnits(): Promise<Unit[]> {
  return apiFetch<Unit[]>("/personnel/units");
}

export async function getMyProfile(): Promise<Personnel> {
  return apiFetch<Personnel>("/personnel/me");
}
