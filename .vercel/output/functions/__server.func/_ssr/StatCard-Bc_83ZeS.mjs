import { t as cn } from "./utils-C_uf36nf.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatCard-Bc_83ZeS.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, sublabel, icon: Icon, accent = "navy", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("panel relative overflow-hidden p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-y-0 left-0 w-[3px]", {
			navy: "bg-navy",
			low: "bg-risk-low",
			moderate: "bg-risk-moderate",
			high: "bg-risk-high",
			critical: "bg-risk-critical"
		}[accent]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-semibold tabular-nums",
					children: value
				}),
				sublabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: sublabel
				}) : null
			] }), Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-9 place-items-center rounded-lg", {
					navy: "text-navy bg-navy/8",
					low: "text-risk-low bg-risk-low/10",
					moderate: "text-risk-moderate bg-risk-moderate/12",
					high: "text-risk-high bg-risk-high/10",
					critical: "text-risk-critical bg-risk-critical/10"
				}[accent]),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4.5",
					strokeWidth: 2
				})
			}) : null]
		})]
	});
}
//#endregion
export { StatCard as t };
