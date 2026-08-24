import { t as cn } from "./utils-C_uf36nf.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RiskBadge-EwFkDndi.js
var import_jsx_runtime = require_jsx_runtime();
var STYLES = {
	LOW: "bg-risk-low/12 text-risk-low border-risk-low/30",
	MODERATE: "bg-risk-moderate/15 text-risk-moderate border-risk-moderate/35",
	HIGH: "bg-risk-high/12 text-risk-high border-risk-high/30",
	CRITICAL: "bg-risk-critical/10 text-risk-critical border-risk-critical/30"
};
function RiskBadge({ band, className, size = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider", size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs", STYLES[band], className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), band]
	});
}
//#endregion
export { RiskBadge as t };
