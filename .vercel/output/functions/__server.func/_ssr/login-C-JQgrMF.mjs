import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { a as useSession, i as signInDemo, n as ROLE_LABEL, t as ROLE_HOME } from "./authService-YEYVz0Hc.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Eye, T as HeartHandshake, c as ShieldCheck, f as Radar, k as EyeOff, v as Lock, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-C-JQgrMF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	"personnel",
	"welfare",
	"commander",
	"admin"
];
function LoginPage() {
	const [role, setSelectedRole] = (0, import_react.useState)("welfare");
	const [serviceId, setServiceId] = (0, import_react.useState)("WO-208");
	const [password, setPassword] = (0, import_react.useState)("demo-access");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { setRole } = useSession();
	const navigate = useNavigate();
	async function handleSubmit(e) {
		e.preventDefault();
		if (!serviceId.trim() || !password.trim()) {
			setError("Service ID and password are required.");
			return;
		}
		setError("");
		setLoading(true);
		try {
			const user = await signInDemo(role, serviceId.trim(), password);
			setRole(user.role);
			navigate({ to: ROLE_HOME[user.role] });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to sign in.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-[1.05fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden flex-col justify-between overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.14]",
					style: { backgroundImage: "radial-gradient(circle at 20% 20%, var(--teal) 0, transparent 45%), radial-gradient(circle at 80% 70%, var(--teal) 0, transparent 40%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-xl bg-sidebar-primary/15 text-sidebar-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold text-white",
						children: "SentinelWell"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.2em] text-sidebar-primary",
						children: "Welfare Intelligence"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold leading-tight text-white",
							children: "AI-powered welfare intelligence for resilient personnel."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-sidebar-foreground/80",
							children: "SentinelWell identifies early stress, fatigue and burnout risk indicators from duty, deployment and voluntary wellness data — and routes them to authorised welfare officers with explainable recommendations."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 space-y-3",
							children: [
								{
									icon: Lock,
									label: "Secure",
									detail: "Role-based, access-controlled by design"
								},
								{
									icon: ShieldCheck,
									label: "Confidential",
									detail: "Individual data visible only to authorised welfare roles"
								},
								{
									icon: HeartHandshake,
									label: "Welfare-focused",
									detail: "Support-oriented — never disciplinary, never diagnostic"
								}
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 shrink-0 place-items-center rounded-lg bg-white/8 text-sidebar-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-white",
									children: t.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-sidebar-foreground/70",
									children: t.detail
								})] })]
							}, t.label))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative text-[11px] text-sidebar-foreground/55",
					children: "Prototype • Synthetic Data • AI risk indicators are not medical diagnoses"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center bg-background px-5 py-12 sm:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center gap-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-xl bg-navy text-navy-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: "SentinelWell"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "AI-powered welfare intelligence for resilient personnel."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: "Sign in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Authorised access only. All sessions are logged."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "mt-6 space-y-5",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "serviceId",
											children: "Service ID / Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "serviceId",
											value: serviceId,
											onChange: (e) => setServiceId(e.target.value),
											placeholder: "e.g. WO-208",
											autoComplete: "username"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password",
												type: showPassword ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												autoComplete: "current-password",
												className: "pr-10"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword((v) => !v),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
												"aria-label": showPassword ? "Hide password" : "Show password",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
											})]
										})]
									}),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive",
										children: error
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Demo Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-2",
											children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setSelectedRole(r);
													setServiceId(r === "personnel" ? "P-1024" : r === "welfare" ? "WO-208" : r === "commander" ? "CO-014" : "AD-001");
												},
												className: cn("rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors", role === r ? "border-navy bg-navy text-navy-foreground" : "border-border bg-card hover:bg-surface"),
												children: ROLE_LABEL[r]
											}, r))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full",
										size: "lg",
										disabled: loading,
										children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, loading ? "Signing in…" : "Sign In"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-center text-xs text-muted-foreground",
						children: "Prototype environment — synthetic data only"
					})
				]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
