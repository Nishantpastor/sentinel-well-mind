import { a as MY_SERIES } from "./mockData-pcP1SyUk.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as TrendingUp, b as Lightbulb } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { i as TrendChart } from "./charts-Cc_fLfta.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personnel.trends-CdUxRvYw.js
var import_jsx_runtime = require_jsx_runtime();
function Panel({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children
			})
		]
	});
}
function TrendsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "My Wellness Trends",
			subtitle: "Six months of self-reported and duty-derived indicators."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel mb-6 flex flex-col gap-4 border-l-[3px] border-l-risk-high p-6 sm:flex-row sm:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-lg bg-risk-high/10 text-risk-high",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "Your stress indicators have increased over the last 3 weeks."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: "Consider completing a wellness check-in or requesting support. These are prototype welfare indicators, not a medical assessment."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-3.5" }), "Sleep quality has declined alongside a rise in reported workload."]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Stress Trend",
					subtitle: "Self-reported, scale 1–10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: MY_SERIES,
						series: [{
							key: "stress",
							label: "Stress",
							color: "var(--risk-high)"
						}],
						yDomain: [0, 10]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Sleep Trend",
					subtitle: "Self-reported quality, scale 1–5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: MY_SERIES,
						series: [{
							key: "sleep",
							label: "Sleep",
							color: "var(--teal)"
						}],
						yDomain: [0, 5]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Workload Trend",
					subtitle: "Perceived workload, scale 1–5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: MY_SERIES,
						series: [{
							key: "workload",
							label: "Workload",
							color: "var(--risk-moderate)"
						}],
						yDomain: [0, 5]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Wellness Risk",
					subtitle: "Composite prototype welfare risk score",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
						data: MY_SERIES,
						series: [{
							key: "risk",
							label: "Welfare risk",
							color: "var(--navy)"
						}],
						yDomain: [0, 100]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { TrendsPage as component };
