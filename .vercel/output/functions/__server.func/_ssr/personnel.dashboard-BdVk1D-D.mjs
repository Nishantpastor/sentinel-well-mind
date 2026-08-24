import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as MY_SERIES } from "./mockData-pcP1SyUk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as ArrowRight, K as BatteryCharging, Z as Activity, m as Moon, u as Send, w as HeartPulse, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as StatCard } from "./StatCard-Bc_83ZeS.mjs";
import { t as AreaTrendChart } from "./charts-Cc_fLfta.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Slider } from "./slider-BjtFJp27.mjs";
import { r as submitCheckIn } from "./wellnessService-Ba7MtLkx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personnel.dashboard-BdVk1D-D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOODS = [
	"Very Low",
	"Low",
	"Okay",
	"Good",
	"Excellent"
];
function ScaleField({ label, value, min, max, hint, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-semibold tabular-nums",
					children: [value, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [" / ", max]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				value: [value],
				min,
				max,
				step: 1,
				onValueChange: (v) => onChange(v[0] ?? value),
				"aria-label": label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function WellnessCheckIn() {
	const [stress, setStress] = (0, import_react.useState)(4);
	const [sleep, setSleep] = (0, import_react.useState)(4);
	const [energy, setEnergy] = (0, import_react.useState)(4);
	const [workload, setWorkload] = (0, import_react.useState)(3);
	const [mood, setMood] = (0, import_react.useState)("Okay");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	async function submit() {
		setLoading(true);
		await submitCheckIn({
			stress,
			sleep,
			energy,
			workload,
			mood
		});
		setLoading(false);
		setDone(true);
		toast.success("Wellness check-in recorded securely.", { description: "Visible only to authorised welfare roles." });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "How are you feeling today?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Voluntary daily check-in · takes under a minute"
				})] }), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-risk-low/12 px-3 py-1 text-xs font-medium text-risk-low",
					children: "Recorded today"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleField, {
						label: "Stress",
						value: stress,
						min: 1,
						max: 10,
						hint: "1 = very calm · 10 = extremely stressed",
						onChange: setStress
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleField, {
						label: "Sleep",
						value: sleep,
						min: 1,
						max: 5,
						hint: "1 = very poor · 5 = fully rested",
						onChange: setSleep
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleField, {
						label: "Energy",
						value: energy,
						min: 1,
						max: 5,
						hint: "1 = depleted · 5 = energised",
						onChange: setEnergy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleField, {
						label: "Workload",
						value: workload,
						min: 1,
						max: 5,
						hint: "1 = light · 5 = very heavy",
						onChange: setWorkload
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mood" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
					children: MOODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMood(m),
						className: cn("rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors", mood === m ? "border-navy bg-navy text-navy-foreground" : "border-border hover:bg-surface"),
						children: m
					}, m))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-6",
				size: "lg",
				onClick: submit,
				disabled: loading,
				children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), loading ? "Recording…" : "Complete Check-In"]
			})
		]
	});
}
function PersonnelDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Good morning",
			subtitle: "Your wellness matters. Take a moment to check in.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/personnel/assessment",
					children: ["Full assessment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Wellness Score",
					value: "78 / 100",
					sublabel: "Good",
					icon: HeartPulse,
					accent: "low"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Stress",
					value: "4 / 10",
					sublabel: "Moderate",
					icon: Activity,
					accent: "moderate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Sleep",
					value: "4 / 5",
					sublabel: "Good",
					icon: Moon,
					accent: "low"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Energy",
					value: "4 / 5",
					sublabel: "Good",
					icon: BatteryCharging,
					accent: "low"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WellnessCheckIn, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Your 6-month wellness trend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Self-reported stress indicators"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaTrendChart, {
								data: MY_SERIES,
								dataKey: "stress",
								color: "var(--risk-high)",
								height: 180
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "mt-2 px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/personnel/trends",
								children: ["View all trends ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel border-l-[3px] border-l-navy p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Support is available"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: "Requesting welfare support is voluntary and confidential. It is never recorded as a performance or disciplinary matter."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/personnel/support",
								children: "Request Support"
							})
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { PersonnelDashboard as component };
