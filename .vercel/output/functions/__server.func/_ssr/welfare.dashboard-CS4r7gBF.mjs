import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as apiFetch } from "./api-CcZELwza.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as BellRing, J as ArrowRight, N as CircleCheck, h as Minus, i as TriangleAlert, l as ShieldAlert, n as Users, q as ArrowUpRight, s as Sparkles, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as StatCard } from "./StatCard-Bc_83ZeS.mjs";
import { t as RiskBadge } from "./RiskBadge-EwFkDndi.mjs";
import { i as TrendChart, n as RiskDistributionChart } from "./charts-Cc_fLfta.mjs";
import { n as listPersonnel, r as listUnits } from "./personnelService-YOzc5-E1.mjs";
import { c as getRiskTrend, o as getOrgSummary } from "./riskService-I7--In7t.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
import { t as PersonnelTable } from "./PersonnelTable-CTGm3rGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welfare.dashboard-CS4r7gBF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIM_STEPS = [
	"Workload increases",
	"Sleep quality decreases",
	"Night shifts increase",
	"Self-reported stress increases",
	"AI detects sustained trend",
	"Welfare risk recalculated: 42 → 82",
	"High-risk alert raised",
	"Welfare recommendation generated"
];
function SimulationPanel({ active, step }) {
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel border-l-[3px] border-l-teal p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-teal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "AI welfare analysis in progress"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Demonstration of the detection pipeline on synthetic data for P-1024."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 grid gap-2 md:grid-cols-2",
				children: SIM_STEPS.map((s, i) => {
					const done = i < step;
					const current = i === step;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors", done ? "border-risk-low/35 bg-risk-low/5" : current ? "border-teal/40 bg-teal/5" : "border-border opacity-55"),
						children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-risk-low" }) : current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 animate-spin text-teal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 shrink-0 rounded-full border border-border" }), s]
					}, s);
				})
			})
		]
	});
}
function WelfareDashboard() {
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [trend, setTrend] = (0, import_react.useState)([]);
	const [units, setUnits] = (0, import_react.useState)([]);
	const [people, setPeople] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [simStep, setSimStep] = (0, import_react.useState)(-1);
	const [simDone, setSimDone] = (0, import_react.useState)(false);
	const timers = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		Promise.all([
			getOrgSummary(),
			getRiskTrend(),
			listUnits(),
			listPersonnel()
		]).then(([s, t, u, p]) => {
			setSummary(s);
			setTrend(t);
			setUnits(u);
			setPeople(p);
			setLoading(false);
		});
		return () => timers.current.forEach((t) => window.clearTimeout(t));
	}, []);
	async function runSimulation() {
		if (simStep >= 0 && !simDone) return;
		setSimDone(false);
		setSimStep(0);
		timers.current.forEach((t) => window.clearTimeout(t));
		try {
			await apiFetch("/simulation/increasing-stress", {
				method: "POST",
				body: JSON.stringify({ personnelId: "P-1024" })
			});
		} catch (e) {
			console.warn("Simulation backend sync warning:", e);
		}
		timers.current = SIM_STEPS.map((_, i) => window.setTimeout(() => {
			setSimStep(i + 1);
			if (i === SIM_STEPS.length - 1) {
				setSimDone(true);
				setSummary((s) => s ? {
					...s,
					moderate: s.moderate - 1,
					high: s.high,
					critical: s.critical + 1
				} : s);
				setTrend((t) => t.map((p, idx) => idx === t.length - 1 ? {
					...p,
					moderate: p.moderate - 1,
					critical: p.critical + 1
				} : p));
				toast.warning("AI detected a significant increase in welfare risk indicators.", { description: "P-1024 · welfare risk 42 → 82 · new alert raised" });
			}
		}, 700 * (i + 1)));
	}
	const simulated = simDone ? { "P-1024": {
		score: 82,
		band: "CRITICAL",
		trend: "Increasing"
	} } : void 0;
	const distribution = summary ? [
		{
			name: "Low",
			value: summary.low,
			color: "var(--risk-low)"
		},
		{
			name: "Moderate",
			value: summary.moderate,
			color: "var(--risk-moderate)"
		},
		{
			name: "High",
			value: summary.high,
			color: "var(--risk-high)"
		},
		{
			name: "Critical",
			value: summary.critical,
			color: "var(--risk-critical)"
		}
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Personnel Wellness Command Center",
			subtitle: "Confidential welfare intelligence for authorized personnel.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/welfare/alerts",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "size-4" }),
						"Alerts",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 rounded-full bg-risk-high/12 px-1.5 text-xs font-semibold text-risk-high",
							children: simDone ? 6 : 5
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: runSimulation,
				disabled: simStep >= 0 && !simDone,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), "Simulate Increasing Stress"]
			})] })
		}),
		loading || !summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
			children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Personnel",
					value: summary.total.toLocaleString(),
					sublabel: "Monitored across 4 units",
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Low Risk",
					value: summary.low,
					sublabel: "Stable indicators",
					accent: "low"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Moderate Risk",
					value: summary.moderate,
					sublabel: "Monitoring advised",
					accent: "moderate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "High Risk",
					value: summary.high,
					sublabel: "Support recommended",
					accent: "high",
					icon: TriangleAlert
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Critical",
					value: summary.critical,
					sublabel: "Priority welfare follow-up",
					accent: "critical",
					icon: ShieldAlert
				})
			]
		}),
		simStep >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulationPanel, {
				active: true,
				step: simStep
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1fr_1.25fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Current Welfare Risk Distribution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Aggregated across all monitored personnel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[300px] w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskDistributionChart, { data: distribution })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Personnel Welfare Risk Trend"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "January – June, by risk band"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[300px] w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
							data: trend,
							height: 300,
							series: [
								{
									key: "low",
									label: "Low",
									color: "var(--risk-low)"
								},
								{
									key: "moderate",
									label: "Moderate",
									color: "var(--risk-moderate)"
								},
								{
									key: "high",
									label: "High",
									color: "var(--risk-high)"
								},
								{
									key: "critical",
									label: "Critical",
									color: "var(--risk-critical)"
								}
							]
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Unit Wellness Overview"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
				children: [(loading ? [] : units).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base font-semibold",
								children: u.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
								band: u.band,
								size: "sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs uppercase tracking-wider text-muted-foreground",
							children: "Average risk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-semibold tabular-nums",
							children: u.averageRisk
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: u.trend === "Increasing" ? "mt-2 inline-flex items-center gap-1 text-sm text-risk-high" : "mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground",
							children: [
								u.trend === "Increasing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" }),
								u.trend,
								" · ",
								u.personnel,
								" personnel"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "mt-3 px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/commander/analytics",
								children: ["View Unit Analytics ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})
						})
					]
				}, u.id)), loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-44 w-full rounded-xl" }, i)) : null]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "High-Risk Personnel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Identifiers only. Access to individual profiles is logged."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonnelTable, {
				data: people,
				loading,
				overrides: simulated
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { WelfareDashboard as component };
