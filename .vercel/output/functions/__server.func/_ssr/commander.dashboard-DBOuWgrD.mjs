import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as ArrowRight, b as Lightbulb, c as ShieldCheck, n as Users } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as StatCard } from "./StatCard-Bc_83ZeS.mjs";
import { i as TrendChart, r as SimpleBarChart } from "./charts-Cc_fLfta.mjs";
import { r as listUnits } from "./personnelService-YOzc5-E1.mjs";
import { a as getLeaveUtilisation, i as getFatigueIndicators, l as getUnitTrends, n as getCommanderSummary, r as getDeploymentDistribution, u as getWorkloadTrend } from "./riskService-I7--In7t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/commander.dashboard-DBOuWgrD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommanderDashboard() {
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [units, setUnits] = (0, import_react.useState)([]);
	const [workload, setWorkload] = (0, import_react.useState)([]);
	const [fatigue, setFatigue] = (0, import_react.useState)([]);
	const [deployment, setDeployment] = (0, import_react.useState)([]);
	const [leave, setLeave] = (0, import_react.useState)([]);
	const [unitTrends, setUnitTrends] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		Promise.all([
			getCommanderSummary(),
			listUnits(),
			getWorkloadTrend(),
			getFatigueIndicators(),
			getDeploymentDistribution(),
			getLeaveUtilisation(),
			getUnitTrends()
		]).then(([summaryData, unitsData, workloadData, fatigueData, deploymentData, leaveData, trendsData]) => {
			setSummary(summaryData);
			setUnits(unitsData);
			setWorkload(workloadData);
			setFatigue(fatigueData);
			setDeployment(deploymentData);
			setLeave(leaveData);
			setUnitTrends(trendsData);
		}).catch(() => setError("Unable to load live command data."));
	}, []);
	const currentUnit = units.reduce((highest, unit) => !highest || unit.averageRisk > highest.averageRisk ? unit : highest, void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Unit Wellness Overview",
			subtitle: "Aggregated and anonymised. Individual wellness details are not displayed at this access level.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/commander/analytics",
					children: ["Detailed analytics ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-start gap-3 rounded-xl border border-border bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-risk-low" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Commander access shows unit-level indicators only. Individual welfare profiles remain restricted to authorised welfare officers."
			})]
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Personnel",
					value: summary?.total ?? "—",
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Low Risk",
					value: summary?.low ?? "—",
					accent: "low"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Moderate",
					value: summary?.moderate ?? "—",
					accent: "moderate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "High",
					value: summary?.high ?? "—",
					accent: "high"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Critical",
					value: summary?.critical ?? "—",
					accent: "critical"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Unit wellness trend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Average welfare risk by unit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: unitTrends,
								yDomain: [0, 100],
								series: [
									{
										key: "unitA",
										label: "Unit A",
										color: "var(--risk-low)"
									},
									{
										key: "unitB",
										label: "Unit B",
										color: "var(--risk-moderate)"
									},
									{
										key: "unitC",
										label: "Unit C",
										color: "var(--risk-high)"
									},
									{
										key: "unitD",
										label: "Unit D",
										color: "var(--teal)"
									}
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Workload trend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Average monthly duty hours recorded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: workload,
								series: [{
									key: "hours",
									label: "Duty hours",
									color: "var(--navy)"
								}]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Deployment distribution"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Personnel by continuous deployment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleBarChart, {
								data: deployment,
								xKey: "band",
								dataKey: "personnel",
								color: "var(--navy)"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Average leave days taken"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Average recorded leave days by unit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleBarChart, {
								data: leave,
								xKey: "unit",
								dataKey: "daysTaken",
								color: "var(--teal)"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6 xl:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Fatigue indicators"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Recorded night shifts by month; sleep-deficit history is unavailable"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
								data: fatigue,
								series: [{
									key: "nightShifts",
									label: "Night shifts",
									color: "var(--risk-high)"
								}]
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-6 border-l-[3px] border-l-navy p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-5 text-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Operational Welfare Insights"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-high" }), currentUnit ? `${currentUnit.name} has the highest current average risk at ${currentUnit.averageRisk}.` : "Current unit risk is unavailable."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-moderate" }),
								units.find((unit) => unit.trend === "Increasing")?.name || "No unit is currently marked as increasing",
								" shows increasing fatigue indicators."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-risk-low" }),
								units.find((unit) => unit.trend === "Stable")?.name || "No stable unit is currently recorded",
								" wellness indicators remain stable."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 rounded-lg bg-surface px-4 py-3 text-sm font-medium",
					children: ["Recommendation: ", currentUnit ? `Review duty distribution for ${currentUnit.name}.` : "No recommendation is available."]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { CommanderDashboard as component };
