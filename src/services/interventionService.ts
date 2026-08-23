import { INTERVENTIONS } from "@/data/mockData";
import type { Intervention } from "@/types";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function listInterventions(): Promise<Intervention[]> {
  await delay();
  return INTERVENTIONS;
}

export async function recordIntervention(
  payload: Omit<Intervention, "id" | "restricted" | "band">,
): Promise<Intervention> {
  await delay(500);
  return {
    id: "IN-" + Math.floor(200 + Math.random() * 700),
    band: "HIGH",
    restricted: true,
    ...payload,
  };
}
