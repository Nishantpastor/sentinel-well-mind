import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { F as ChevronRight, I as ChevronLeft, M as Circle, N as CircleCheck, c as ShieldCheck, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Slider } from "./slider-BjtFJp27.mjs";
import { n as submitAssessment } from "./wellnessService-Ba7MtLkx.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/radix-ui__react-radio-group.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personnel.assessment-Dxss5ccm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
var QUESTIONS = [
	{
		key: "stress",
		title: "How would you rate your current stress level?",
		helper: "1 = very calm · 10 = extremely stressed",
		kind: "slider",
		max: 10
	},
	{
		key: "sleep",
		title: "How well have you been sleeping?",
		helper: "1 = very poorly · 5 = very well",
		kind: "slider",
		max: 5
	},
	{
		key: "energy",
		title: "How would you rate your energy?",
		helper: "1 = depleted · 5 = energised",
		kind: "slider",
		max: 5
	},
	{
		key: "workload",
		title: "How manageable is your workload?",
		helper: "Select the option that fits best",
		kind: "cards",
		options: [
			"Very manageable",
			"Manageable",
			"Demanding",
			"Heavy",
			"Unsustainable"
		]
	},
	{
		key: "exhaustion",
		title: "How often have you felt mentally exhausted after duty?",
		helper: "Over the last four weeks",
		kind: "radio",
		options: [
			"Never",
			"Rarely",
			"Sometimes",
			"Often",
			"Almost always"
		]
	},
	{
		key: "balance",
		title: "How satisfied are you with your current work-life balance?",
		helper: "Over the last four weeks",
		kind: "radio",
		options: [
			"Very satisfied",
			"Satisfied",
			"Neutral",
			"Dissatisfied",
			"Very dissatisfied"
		]
	},
	{
		key: "support",
		title: "Would you like to speak with a welfare professional?",
		helper: "Entirely voluntary and confidential",
		kind: "cards",
		options: ["yes", "no"]
	}
];
var SUPPORT_LABEL = {
	yes: "Yes, please arrange a confidential conversation",
	no: "Not at this time"
};
function AssessmentForm() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)({
		stress: 5,
		sleep: 3,
		energy: 3
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const q = QUESTIONS[step];
	const value = answers[q.key];
	const progress = (step + (result ? 1 : 0)) / QUESTIONS.length * 100;
	function set(v) {
		setAnswers((a) => ({
			...a,
			[q.key]: v
		}));
		setError("");
	}
	async function next() {
		if (value === void 0 || value === "") {
			setError("Please answer this question to continue.");
			return;
		}
		if (step < QUESTIONS.length - 1) {
			setStep((s) => s + 1);
			return;
		}
		setLoading(true);
		const res = await submitAssessment(answers);
		setLoading(false);
		setResult({ supportRequested: res.supportRequested });
	}
	if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-auto grid size-14 place-items-center rounded-full bg-risk-low/12 text-risk-low",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-display text-xl font-semibold",
				children: "Thank you for completing your wellness check-in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-lg text-sm text-muted-foreground",
				children: "Your responses are stored under role-based access controls and contribute only to your confidential welfare indicators."
			}),
			result.supportRequested ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto mt-5 max-w-lg rounded-xl border border-navy/20 bg-navy/5 px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-2 inline size-4 text-navy" }), "Your confidential support request has been sent to the authorized welfare team."]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				variant: "outline",
				onClick: () => {
					setResult(null);
					setStep(0);
				},
				children: "Start a new assessment"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Step ",
					step + 1,
					" of ",
					QUESTIONS.length
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(progress), "% complete"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: progress,
				className: "mt-2 h-1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-7 font-display text-xl font-semibold",
				children: q.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: q.helper
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [
					q.kind === "slider" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-4xl font-semibold tabular-nums",
							children: [Number(value ?? 1), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-base font-normal text-muted-foreground",
								children: ["/ ", q.max]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							value: [Number(value ?? 1)],
							min: 1,
							max: q.max ?? 5,
							step: 1,
							onValueChange: (v) => set(v[0] ?? 1),
							"aria-label": q.title
						})]
					}) : null,
					q.kind === "radio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
						value: String(value ?? ""),
						onValueChange: set,
						className: "gap-2",
						children: q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: cn("flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors", value === o ? "border-navy bg-navy/5" : "border-border hover:bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: o }), o]
						}, o))
					}) : null,
					q.kind === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("grid gap-2", q.key === "support" ? "sm:grid-cols-2" : "sm:grid-cols-3"),
						children: q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => set(o),
							className: cn("rounded-xl border px-4 py-4 text-left text-sm font-medium transition-colors", value === o ? "border-navy bg-navy text-navy-foreground" : "border-border hover:bg-surface"),
							children: q.key === "support" ? SUPPORT_LABEL[o] : o
						}, o))
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					disabled: step === 0,
					onClick: () => setStep((s) => s - 1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: next,
					disabled: loading,
					children: [
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null,
						step === QUESTIONS.length - 1 ? "Submit Assessment" : "Continue",
						step < QUESTIONS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }) : null
					]
				})]
			})
		]
	});
}
function AssessmentPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Wellness Self-Assessment",
				subtitle: "Voluntary and confidential. Your answers support welfare planning only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
		]
	});
}
//#endregion
export { AssessmentPage as component };
