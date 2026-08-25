import type { Intervention } from "@/types";
import { apiFetch } from "./api";

export async function listInterventions(): Promise<Intervention[]> {
  return apiFetch<Intervention[]>("/interventions");
}

export async function recordIntervention(
  payload: Omit<Intervention, "id" | "restricted" | "band">,
): Promise<Intervention> {
  return apiFetch<Intervention>("/interventions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
