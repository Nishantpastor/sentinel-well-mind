import { PERSONNEL, UNITS, MY_PROFILE } from "@/data/mockData";
import type { Personnel, Unit } from "@/types";
import { apiFetch } from "./api";

export async function listPersonnel(): Promise<Personnel[]> {
  try {
    return await apiFetch<Personnel[]>("/personnel");
  } catch (err) {
    console.warn("Backend listPersonnel call fallback to mockData", err);
    return PERSONNEL;
  }
}

export async function getPersonnel(id: string): Promise<Personnel | undefined> {
  try {
    return await apiFetch<Personnel>(`/personnel/${id}`);
  } catch (err) {
    console.warn(`Backend getPersonnel(${id}) call fallback to mockData`, err);
    return PERSONNEL.find((p) => p.id === id);
  }
}

export async function listUnits(): Promise<Unit[]> {
  try {
    return await apiFetch<Unit[]>("/personnel/units");
  } catch (err) {
    console.warn("Backend listUnits call fallback to mockData", err);
    return UNITS;
  }
}

export async function getMyProfile(): Promise<Personnel> {
  try {
    return await apiFetch<Personnel>("/personnel/me");
  } catch (err) {
    console.warn("Backend getMyProfile call fallback to mockData", err);
    return MY_PROFILE;
  }
}
