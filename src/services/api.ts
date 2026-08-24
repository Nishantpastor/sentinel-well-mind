const BASE_URL = (import.meta.env as Record<string, string>)["VITE_API_URL"] || "http://localhost:5000/api";

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("sentinelwell.token") : null;
  const role = typeof window !== "undefined" ? localStorage.getItem("sentinelwell.role") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (role) {
    headers["x-demo-role"] = role;
    headers["x-demo-service-id"] = role === "welfare" ? "WO-208" : role === "commander" ? "CO-014" : role === "admin" ? "AD-001" : "P-1024";
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data?.error?.message || `HTTP ${res.status} Error`);
    Object.assign(error, { status: res.status });
    throw error;
  }

  return data.data !== undefined ? data.data : data;
}
