import { PERSONNEL, UNITS, MY_PROFILE } from "@/data/mockData";
import type { Personnel, Unit } from "@/types";

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export async function listPersonnel(): Promise<Personnel[]> {
  await delay();
  return PERSONNEL;
}

export async function getPersonnel(id: string): Promise<Personnel | undefined> {
  await delay(250);
  return PERSONNEL.find((p) => p.id === id);
}

export async function listUnits(): Promise<Unit[]> {
  await delay(200);
  return UNITS;
}

export async function getMyProfile(): Promise<Personnel> {
  await delay(200);
  return MY_PROFILE;
}
