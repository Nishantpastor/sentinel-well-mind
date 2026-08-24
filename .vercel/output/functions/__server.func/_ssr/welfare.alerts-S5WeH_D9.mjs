import { i as __toESM } from "../_runtime.mjs";
import { t as ALERTS } from "./mockData-pcP1SyUk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as apiFetch } from "./api-CcZELwza.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as Check, l as ShieldAlert, q as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as RiskBadge } from "./RiskBadge-EwFkDndi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welfare.alerts-S5WeH_D9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AlertCard({ alert, onAcknowledge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-lg bg-risk-high/10 text-risk-high",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-semibold",
									children: alert.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
									band: alert.severity,
									size: "sm"
								}),
								alert.acknowledged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
									children: "Acknowledged"
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								alert.id,
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: alert.personnelId
								}),
								" · ",
								alert.unit,
								" ·",
								" ",
								alert.raisedAt
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-semibold tabular-nums",
							children: alert.score
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-1 text-xs text-risk-high",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" }),
								alert.previousScore,
								" → ",
								alert.score
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Detected changes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5",
						children: alert.detectedChanges.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-high" }), c]
						}, c))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Recommendation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: alert.recommendation
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[11px] text-muted-foreground",
							children: "AI-generated welfare indicator · not a medical diagnosis"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/welfare/personnel/$id",
						params: { id: alert.personnelId },
						children: "Review"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					disabled: alert.acknowledged,
					onClick: () => onAcknowledge?.(alert.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), alert.acknowledged ? "Acknowledged" : "Acknowledge"]
				})]
			})
		]
	});
}
async function listAlerts() {
	try {
		return await apiFetch("/alerts");
	} catch (err) {
		console.warn("Backend listAlerts call fallback to mockData", err);
		return ALERTS;
	}
}
async function acknowledgeAlert(id) {
	try {
		return await apiFetch(`/alerts/${id}/acknowledge`, { method: "PATCH" });
	} catch (err) {
		console.warn(`Backend acknowledgeAlert(${id}) call fallback`, err);
		return { ok: true };
	}
}
function AlertsPage() {
	const [alerts, setAlerts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		listAlerts().then((a) => {
			setAlerts(a);
			setLoading(false);
		});
	}, []);
	async function acknowledge(id) {
		await acknowledgeAlert(id);
		setAlerts((list) => list.map((a) => a.id === id ? {
			...a,
			acknowledged: true
		} : a));
		toast.success("Alert acknowledged", { description: `${id} routed for welfare follow-up.` });
	}
	const open = alerts.filter((a) => !a.acknowledged).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Alert Center",
			subtitle: `${open} alerts awaiting welfare review · all access is logged.`
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-xl" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertCard, {
				alert: a,
				onAcknowledge: acknowledge
			}, a.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { AlertsPage as component };
