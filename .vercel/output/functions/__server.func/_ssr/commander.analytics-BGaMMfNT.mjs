import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as RiskBadge } from "./RiskBadge-EwFkDndi.mjs";
import { i as TrendChart, n as RiskDistributionChart, r as SimpleBarChart } from "./charts-Cc_fLfta.mjs";
import { r as listUnits } from "./personnelService-YOzc5-E1.mjs";
import { a as getLeaveUtilisation, l as getUnitTrends, n as getCommanderSummary } from "./riskService-I7--In7t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/commander.analytics-BGaMMfNT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommanderAnalytics() {
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [units, setUnits] = (0, import_react.useState)([]);
	const [leave, setLeave] = (0, import_react.useState)([]);
	const [unitTrends, setUnitTrends] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		Promise.all([
			getCommanderSummary(),
			listUnits(),
			getLeaveUtilisation(),
			getUnitTrends()
		]).then(([summaryData, unitsData, leaveData, trendsData]) => {
			setSummary(summaryData);
			setUnits(unitsData);
			setLeave(leaveData);
			setUnitTrends(trendsData);
		}).catch(() => setError("Unable to load live analytics data."));
	}, []);
	const distribution = [
		{
			name: "Low",
			value: summary?.low ?? 0,
			color: "var(--risk-low)"
		},
		{
			name: "Moderate",
			value: summary?.moderate ?? 0,
			color: "var(--risk-moderate)"
		},
		{
			name: "High",
			value: summary?.high ?? 0,
			color: "var(--risk-high)"
		},
		{
			name: "Critical",
			value: summary?.critical ?? 0,
			color: "var(--risk-critical)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Unit Analytics",
			subtitle: "Anonymised aggregate analysis · no individual wellness records displayed."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Risk mix across command"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskDistributionChart, {
						data: distribution,
						height: 260
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Current average risk by unit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: unitTrends,
						height: 260,
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
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Average leave days taken by unit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleBarChart, {
						data: leave,
						xKey: "unit",
						dataKey: "daysTaken",
						color: "var(--teal)"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Unit standing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border",
					children: units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: unit.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								unit.personnel,
								" personnel · trend ",
								unit.trend.toLowerCase()
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-semibold tabular-nums",
								children: unit.averageRisk
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, {
								band: unit.band,
								size: "sm"
							})]
						})]
					}, unit.id))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { CommanderAnalytics as component };
