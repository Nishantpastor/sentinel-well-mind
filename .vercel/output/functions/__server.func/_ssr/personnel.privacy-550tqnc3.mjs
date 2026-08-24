import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as Database, B as ChartColumn, S as KeyRound, k as EyeOff } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personnel.privacy-550tqnc3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrivacyCard({ icon: Icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 place-items-center rounded-lg bg-navy/8 text-navy",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-display text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: description
			})
		]
	});
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var CONSENTS = [
	{
		key: "self",
		label: "Wellness Self-Assessment",
		detail: "Your voluntary check-ins and assessments.",
		initial: true
	},
	{
		key: "optional",
		label: "Optional Wellness Data",
		detail: "Sleep, energy and workload signals you choose to share.",
		initial: true
	},
	{
		key: "biometric",
		label: "Biometric Data",
		detail: "Optional and only applicable where legally permitted and explicitly authorized.",
		initial: false
	},
	{
		key: "analytics",
		label: "Analytics Participation",
		detail: "Include my anonymised data in aggregated unit analytics.",
		initial: true
	}
];
function PrivacyPage() {
	const [state, setState] = (0, import_react.useState)(Object.fromEntries(CONSENTS.map((c) => [c.key, c.initial])));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Privacy & Data Protection",
			subtitle: "You control what is collected. Access is limited by role and always logged."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
					icon: KeyRound,
					title: "Role-Based Access",
					description: "Users can only access information appropriate to their role."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
					icon: Database,
					title: "Data Protection",
					description: "Sensitive information is protected using secure storage and controlled access."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
					icon: EyeOff,
					title: "Data Minimization",
					description: "Only necessary information should be collected."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {
					icon: ChartColumn,
					title: "Anonymized Analytics",
					description: "Aggregated analytics can be displayed without exposing individual identities."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-6 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Consent Settings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Changes apply immediately to future data collection."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 divide-y divide-border",
					children: CONSENTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm text-muted-foreground",
							children: c.detail
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: state[c.key] ?? false,
							onCheckedChange: (v) => {
								setState((s) => ({
									...s,
									[c.key]: v
								}));
								toast.success(`${c.label} ${v ? "enabled" : "disabled"}`);
							},
							"aria-label": c.label
						})]
					}, c.key))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { PrivacyPage as component };
