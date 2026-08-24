import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as apiFetch } from "./api-CcZELwza.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as FileClock, G as BellRing, J as ArrowRight, c as ShieldCheck, n as Users, r as UserCheck } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as StatCard } from "./StatCard-Bc_83ZeS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-DjZ4GoRC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const [userCount, setUserCount] = (0, import_react.useState)(null);
	const [welfareOfficerCount, setWelfareOfficerCount] = (0, import_react.useState)(null);
	const [alertCount, setAlertCount] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		Promise.all([apiFetch("/admin/users"), apiFetch("/alerts")]).then(([users, alerts]) => {
			setUserCount(users.length);
			setWelfareOfficerCount(users.filter((user) => user.role.name.toUpperCase() === "WELFARE_OFFICER").length);
			setAlertCount(alerts.length);
		}).catch(() => setError("Unable to load live administration data."));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Administration",
			subtitle: "System configuration and access governance."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 rounded-lg bg-destructive/8 px-3 py-2 text-sm text-destructive",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Users",
					value: userCount ?? "—",
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Active Users",
					value: "Unavailable",
					sublabel: "Activity data not recorded",
					icon: UserCheck,
					accent: "low"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Welfare Officers",
					value: welfareOfficerCount ?? "—",
					icon: ShieldCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "System Alerts",
					value: alertCount ?? "—",
					sublabel: "Recorded alerts",
					icon: BellRing,
					accent: "moderate"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-6 md:grid-cols-3",
			children: [
				{
					title: "Users",
					detail: "Provision accounts and manage access status."
				},
				{
					title: "Roles",
					detail: "Define role-based permissions and data visibility."
				},
				{
					title: "Audit Logs",
					detail: "Review every access to welfare information."
				}
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted-foreground",
						children: c.detail
					}),
					c.title === "Audit Logs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/audit-logs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileClock, { className: "size-4" }), " Open audit logs"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "mt-4 px-0",
						disabled: true,
						children: ["Manage ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				]
			}, c.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { AdminDashboard as component };
