import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, h as Legend, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-Cc_fLfta.js
var import_jsx_runtime = require_jsx_runtime();
var axis = {
	stroke: "var(--muted-foreground)",
	fontSize: 12,
	tickLine: false,
	axisLine: false
};
var tooltipStyle = {
	contentStyle: {
		background: "var(--card)",
		border: "1px solid var(--border)",
		borderRadius: 12,
		fontSize: 12,
		boxShadow: "var(--shadow-card)"
	},
	labelStyle: {
		color: "var(--muted-foreground)",
		fontSize: 11
	}
};
function TrendChart({ data, series, height = 240, yDomain }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data,
			margin: {
				top: 8,
				right: 12,
				left: -18,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					strokeDasharray: "3 3",
					stroke: "var(--border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "month",
					...axis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					...axis,
					domain: yDomain ?? ["auto", "auto"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle }),
				series.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					iconType: "circle",
					wrapperStyle: { fontSize: 12 }
				}) : null,
				series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					type: "monotone",
					dataKey: s.key,
					name: s.label,
					stroke: s.color,
					strokeWidth: 2.4,
					dot: {
						r: 3,
						strokeWidth: 0,
						fill: s.color
					},
					activeDot: { r: 5 }
				}, s.key))
			]
		})
	});
}
function AreaTrendChart({ data, dataKey, color, height = 200 }) {
	const id = `grad-${dataKey}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			margin: {
				top: 8,
				right: 12,
				left: -18,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: color,
						stopOpacity: .35
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: color,
						stopOpacity: .02
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					strokeDasharray: "3 3",
					stroke: "var(--border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "month",
					...axis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey,
					stroke: color,
					strokeWidth: 2.4,
					fill: `url(#${id})`
				})
			]
		})
	});
}
function RiskDistributionChart({ data, height = 300 }) {
	const total = data.reduce((a, b) => a + b.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-6 lg:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-[320px]",
			style: { height },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					nameKey: "name",
					innerRadius: "64%",
					outerRadius: "92%",
					paddingAngle: 2,
					stroke: "var(--card)",
					strokeWidth: 2,
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.color }, d.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltipStyle })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-semibold tabular-nums",
						children: total.toLocaleString()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Personnel"
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "w-full flex-1 space-y-3",
			children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2.5 rounded-full",
						style: { background: d.color }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-sm font-medium",
						children: d.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm tabular-nums text-muted-foreground",
						children: d.value.toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-14 text-right text-sm font-semibold tabular-nums",
						children: total > 0 ? `${(d.value / total * 100).toFixed(1)}%` : "—"
					})
				]
			}, d.name))
		})]
	});
}
function SimpleBarChart({ data, xKey, dataKey, color, height = 220 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			margin: {
				top: 8,
				right: 12,
				left: -18,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					strokeDasharray: "3 3",
					stroke: "var(--border)",
					vertical: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: xKey,
					...axis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { ...axis }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					...tooltipStyle,
					cursor: { fill: "var(--muted)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey,
					fill: color,
					radius: [
						6,
						6,
						0,
						0
					],
					maxBarSize: 44
				})
			]
		})
	});
}
//#endregion
export { TrendChart as i, RiskDistributionChart as n, SimpleBarChart as r, AreaTrendChart as t };
