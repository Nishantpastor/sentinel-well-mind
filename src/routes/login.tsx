import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Radar, ShieldCheck, HeartHandshake, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/useSession";
import { ROLE_HOME, ROLE_LABEL, signInDemo } from "@/services/authService";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — SentinelWell Welfare Intelligence" },
      {
        name: "description",
        content:
          "Secure demo sign-in for SentinelWell, an AI-assisted personnel stress, fatigue and welfare monitoring platform.",
      },
      { property: "og:title", content: "Sign In — SentinelWell" },
      {
        property: "og:description",
        content: "AI-powered welfare intelligence for resilient personnel.",
      },
    ],
  }),
  component: LoginPage,
});

const ROLES: Role[] = ["personnel", "welfare", "commander", "admin"];

function LoginPage() {
  const [role, setSelectedRole] = useState<Role>("welfare");
  const [serviceId, setServiceId] = useState("WO-208");
  const [password, setPassword] = useState("demo-access");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setRole } = useSession();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceId.trim() || !password.trim()) {
      setError("Service ID and password are required.");
      return;
    }
    setError("");
    setLoading(true);
    const user = await signInDemo(role);
    setRole(user.role);
    setLoading(false);
    navigate({ to: ROLE_HOME[user.role] });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--teal) 0, transparent 45%), radial-gradient(circle at 80% 70%, var(--teal) 0, transparent 40%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-sidebar-primary/15 text-sidebar-primary">
            <Radar className="size-6" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-white">SentinelWell</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-sidebar-primary">
              Welfare Intelligence
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <h1 className="font-display text-4xl font-semibold leading-tight text-white">
            AI-powered welfare intelligence for resilient personnel.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-sidebar-foreground/80">
            SentinelWell identifies early stress, fatigue and burnout risk indicators from duty,
            deployment and voluntary wellness data — and routes them to authorised welfare officers
            with explainable recommendations.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { icon: Lock, label: "Secure", detail: "Role-based, access-controlled by design" },
              {
                icon: ShieldCheck,
                label: "Confidential",
                detail: "Individual data visible only to authorised welfare roles",
              },
              {
                icon: HeartHandshake,
                label: "Welfare-focused",
                detail: "Support-oriented — never disciplinary, never diagnostic",
              },
            ].map((t) => (
              <li key={t.label} className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/8 text-sidebar-primary">
                  <t.icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.label}</p>
                  <p className="text-xs text-sidebar-foreground/70">{t.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[11px] text-sidebar-foreground/55">
          Prototype • Synthetic Data • AI risk indicators are not medical diagnoses
        </p>
      </section>

      <section className="flex items-center justify-center bg-background px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-navy text-navy-foreground">
              <Radar className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold">SentinelWell</p>
              <p className="text-xs text-muted-foreground">
                AI-powered welfare intelligence for resilient personnel.
              </p>
            </div>
          </div>

          <div className="panel p-7">
            <h2 className="font-display text-xl font-semibold">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Authorised access only. All sessions are logged.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="serviceId">Service ID / Email</Label>
                <Input
                  id="serviceId"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  placeholder="e.g. WO-208"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error ? (
                <p className="rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <div className="space-y-2">
                <Label>Demo Role</Label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setSelectedRole(r);
                        setServiceId(
                          r === "personnel"
                            ? "P-1024"
                            : r === "welfare"
                              ? "WO-208"
                              : r === "commander"
                                ? "CO-014"
                                : "AD-001",
                        );
                      }}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                        role === r
                          ? "border-navy bg-navy text-navy-foreground"
                          : "border-border bg-card hover:bg-surface",
                      )}
                    >
                      {ROLE_LABEL[r]}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Prototype environment — synthetic data only
          </p>
        </div>
      </section>
    </div>
  );
}
