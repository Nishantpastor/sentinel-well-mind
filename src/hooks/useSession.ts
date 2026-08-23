import { useSyncExternalStore } from "react";
import type { Role } from "@/types";

const KEY = "sentinelwell.role";
let current: Role | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function setRole(role: Role | null) {
  current = role;
  if (typeof window !== "undefined") {
    if (role) window.localStorage.setItem(KEY, role);
    else window.localStorage.removeItem(KEY);
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Role | null {
  if (current === null && typeof window !== "undefined") {
    const stored = window.localStorage.getItem(KEY) as Role | null;
    if (stored) current = stored;
  }
  return current;
}

export function useSession() {
  const role = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => null as Role | null,
  );
  return { role, setRole };
}
