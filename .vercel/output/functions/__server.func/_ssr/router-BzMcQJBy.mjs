import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$20 } from "./welfare.personnel._id-CLLt0Yj0.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BzMcQJBy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CwG86fKi.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SentinelWell — AI Personnel Welfare Monitoring" },
			{
				name: "description",
				content: "AI-powered welfare intelligence for resilient personnel: stress, fatigue and burnout risk indicators with explainable welfare recommendations."
			},
			{
				name: "author",
				content: "SentinelWell"
			},
			{
				property: "og:title",
				content: "SentinelWell — AI Personnel Welfare Monitoring"
			},
			{
				property: "og:description",
				content: "AI-powered welfare intelligence for resilient personnel."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$18 = () => import("./routes-DTEZEvkE.mjs");
var Route$18 = createFileRoute("/")({
	beforeLoad: () => {
		throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin-D_3S65tW.mjs");
var Route$17 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./commander-CyD9GZo-.mjs");
var Route$16 = createFileRoute("/commander")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./login-C-JQgrMF.mjs");
var Route$15 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Sign In — SentinelWell Welfare Intelligence" },
		{
			name: "description",
			content: "Secure demo sign-in for SentinelWell, an AI-assisted personnel stress, fatigue and welfare monitoring platform."
		},
		{
			property: "og:title",
			content: "Sign In — SentinelWell"
		},
		{
			property: "og:description",
			content: "AI-powered welfare intelligence for resilient personnel."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./personnel-BkJmpCcS.mjs");
var Route$14 = createFileRoute("/personnel")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./welfare-SaFYossL.mjs");
var Route$13 = createFileRoute("/welfare")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./admin.audit-logs-D3XMTUG_.mjs");
var Route$12 = createFileRoute("/admin/audit-logs")({
	head: () => ({ meta: [
		{ title: "Audit Logs — SentinelWell" },
		{
			name: "description",
			content: "Immutable access log of every welfare data view, action and authorisation result."
		},
		{
			property: "og:title",
			content: "Audit Logs — SentinelWell"
		},
		{
			property: "og:description",
			content: "Every access to welfare information is recorded and reviewable."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.dashboard-DjZ4GoRC.mjs");
var Route$11 = createFileRoute("/admin/dashboard")({
	head: () => ({ meta: [
		{ title: "Administration — SentinelWell" },
		{
			name: "description",
			content: "System administration overview: users, roles, welfare officers and system alerts."
		},
		{
			property: "og:title",
			content: "Administration — SentinelWell"
		},
		{
			property: "og:description",
			content: "Manage users, roles and audit visibility across SentinelWell."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./commander.analytics-BGaMMfNT.mjs");
var Route$10 = createFileRoute("/commander/analytics")({
	head: () => ({ meta: [
		{ title: "Unit Analytics — SentinelWell" },
		{
			name: "description",
			content: "Anonymised unit welfare analytics: risk mix, trends and leave utilisation."
		},
		{
			property: "og:title",
			content: "Unit Analytics — SentinelWell"
		},
		{
			property: "og:description",
			content: "Anonymised welfare analytics across units."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./commander.dashboard-DBOuWgrD.mjs");
var Route$9 = createFileRoute("/commander/dashboard")({
	head: () => ({ meta: [
		{ title: "Unit Wellness Overview — SentinelWell" },
		{
			name: "description",
			content: "Aggregated, anonymised unit welfare indicators: workload, deployment, leave and fatigue trends."
		},
		{
			property: "og:title",
			content: "Unit Wellness Overview — SentinelWell"
		},
		{
			property: "og:description",
			content: "Aggregated operational welfare insights for commanders."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./personnel.assessment-Dxss5ccm.mjs");
var Route$8 = createFileRoute("/personnel/assessment")({
	head: () => ({ meta: [
		{ title: "Wellness Assessment — SentinelWell" },
		{
			name: "description",
			content: "Voluntary step-by-step wellness self-assessment with confidential support option."
		},
		{
			property: "og:title",
			content: "Wellness Assessment — SentinelWell"
		},
		{
			property: "og:description",
			content: "A short, confidential wellness self-assessment for personnel."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./personnel.dashboard-BdVk1D-D.mjs");
var Route$7 = createFileRoute("/personnel/dashboard")({
	head: () => ({ meta: [
		{ title: "My Wellness — SentinelWell" },
		{
			name: "description",
			content: "Personal wellness dashboard with daily check-in, stress, sleep and energy indicators."
		},
		{
			property: "og:title",
			content: "My Wellness — SentinelWell"
		},
		{
			property: "og:description",
			content: "Confidential personal wellness check-in and welfare indicators."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./personnel.privacy-550tqnc3.mjs");
var Route$6 = createFileRoute("/personnel/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy & Data Protection — SentinelWell" },
		{
			name: "description",
			content: "Role-based access, data minimisation, anonymised analytics and consent settings for personnel wellness data."
		},
		{
			property: "og:title",
			content: "Privacy & Data Protection — SentinelWell"
		},
		{
			property: "og:description",
			content: "How SentinelWell protects personnel wellness data."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./personnel.support-B_bHKZ1C.mjs");
var Route$5 = createFileRoute("/personnel/support")({
	head: () => ({ meta: [
		{ title: "Confidential Support — SentinelWell" },
		{
			name: "description",
			content: "Request confidential welfare support and access wellness resources."
		},
		{
			property: "og:title",
			content: "Confidential Support — SentinelWell"
		},
		{
			property: "og:description",
			content: "Connect with an authorised welfare professional, confidentially."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./personnel.trends-CdUxRvYw.mjs");
var Route$4 = createFileRoute("/personnel/trends")({
	head: () => ({ meta: [
		{ title: "My Trends — SentinelWell" },
		{
			name: "description",
			content: "Six-month personal trends for stress, sleep, workload and welfare risk."
		},
		{
			property: "og:title",
			content: "My Trends — SentinelWell"
		},
		{
			property: "og:description",
			content: "Track your stress, sleep, workload and welfare risk indicators over time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./welfare.alerts-S5WeH_D9.mjs");
var Route$3 = createFileRoute("/welfare/alerts")({
	head: () => ({ meta: [
		{ title: "Alert Center — SentinelWell" },
		{
			name: "description",
			content: "Welfare alerts for elevated risk, fatigue trends, excessive workload and prolonged deployment."
		},
		{
			property: "og:title",
			content: "Alert Center — SentinelWell"
		},
		{
			property: "og:description",
			content: "Review and acknowledge confidential welfare alerts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./welfare.dashboard-CS4r7gBF.mjs");
var Route$2 = createFileRoute("/welfare/dashboard")({
	head: () => ({ meta: [
		{ title: "Personnel Wellness Command Center — SentinelWell" },
		{
			name: "description",
			content: "Confidential welfare intelligence: risk distribution, trends, unit overview and high-risk personnel."
		},
		{
			property: "og:title",
			content: "Personnel Wellness Command Center — SentinelWell"
		},
		{
			property: "og:description",
			content: "Confidential welfare intelligence for authorized personnel."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./welfare.interventions-DCvh0t4U.mjs");
var Route$1 = createFileRoute("/welfare/interventions")({
	head: () => ({ meta: [
		{ title: "Interventions — SentinelWell" },
		{
			name: "description",
			content: "Log and track confidential welfare interventions, owners, status and follow-ups."
		},
		{
			property: "og:title",
			content: "Interventions — SentinelWell"
		},
		{
			property: "og:description",
			content: "Track supportive welfare interventions through to follow-up."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./welfare.personnel.index-CLw8U4wK.mjs");
var Route = createFileRoute("/welfare/personnel/")({
	head: () => ({ meta: [
		{ title: "Personnel Directory — SentinelWell" },
		{
			name: "description",
			content: "Filterable welfare risk directory of monitored personnel identifiers."
		},
		{
			property: "og:title",
			content: "Personnel Directory — SentinelWell"
		},
		{
			property: "og:description",
			content: "Search and filter personnel welfare risk indicators by unit, band and trend."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AdminRoute = Route$17.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$19
});
var CommanderRoute = Route$16.update({
	id: "/commander",
	path: "/commander",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$15.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var PersonnelRoute = Route$14.update({
	id: "/personnel",
	path: "/personnel",
	getParentRoute: () => Route$19
});
var WelfareRoute = Route$13.update({
	id: "/welfare",
	path: "/welfare",
	getParentRoute: () => Route$19
});
var AdminAuditLogsRoute = Route$12.update({
	id: "/audit-logs",
	path: "/audit-logs",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$11.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var CommanderAnalyticsRoute = Route$10.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => CommanderRoute
});
var CommanderDashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => CommanderRoute
});
var PersonnelAssessmentRoute = Route$8.update({
	id: "/assessment",
	path: "/assessment",
	getParentRoute: () => PersonnelRoute
});
var PersonnelDashboardRoute = Route$7.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => PersonnelRoute
});
var PersonnelPrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => PersonnelRoute
});
var PersonnelSupportRoute = Route$5.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => PersonnelRoute
});
var PersonnelTrendsRoute = Route$4.update({
	id: "/trends",
	path: "/trends",
	getParentRoute: () => PersonnelRoute
});
var WelfareAlertsRoute = Route$3.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => WelfareRoute
});
var WelfareDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => WelfareRoute
});
var WelfareInterventionsRoute = Route$1.update({
	id: "/interventions",
	path: "/interventions",
	getParentRoute: () => WelfareRoute
});
var WelfarePersonnelIndexRoute = Route.update({
	id: "/personnel/",
	path: "/personnel/",
	getParentRoute: () => WelfareRoute
});
var WelfarePersonnelIdRoute = Route$20.update({
	id: "/personnel/$id",
	path: "/personnel/$id",
	getParentRoute: () => WelfareRoute
});
var AdminRouteChildren = {
	AdminAuditLogsRoute,
	AdminDashboardRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var CommanderRouteChildren = {
	CommanderAnalyticsRoute,
	CommanderDashboardRoute
};
var CommanderRouteWithChildren = CommanderRoute._addFileChildren(CommanderRouteChildren);
var PersonnelRouteChildren = {
	PersonnelAssessmentRoute,
	PersonnelDashboardRoute,
	PersonnelPrivacyRoute,
	PersonnelSupportRoute,
	PersonnelTrendsRoute
};
var PersonnelRouteWithChildren = PersonnelRoute._addFileChildren(PersonnelRouteChildren);
var WelfareRouteChildren = {
	WelfareAlertsRoute,
	WelfareDashboardRoute,
	WelfareInterventionsRoute,
	WelfarePersonnelIdRoute,
	WelfarePersonnelIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRouteWithChildren,
	CommanderRoute: CommanderRouteWithChildren,
	LoginRoute,
	PersonnelRoute: PersonnelRouteWithChildren,
	WelfareRoute: WelfareRoute._addFileChildren(WelfareRouteChildren)
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
