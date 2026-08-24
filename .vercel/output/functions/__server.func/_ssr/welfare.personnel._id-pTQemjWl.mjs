import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { p as bandForScore, u as RISK_COLOR } from "./mockData-pcP1SyUk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Info, H as BrainCircuit, R as Check, V as CalendarClock, X as ArrowDownRight, Y as ArrowLeft, h as Minus, q as ArrowUpRight, t as X, v as Lock } from "../_libs/lucide-react.mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { t as RiskBadge } from "./RiskBadge-EwFkDndi.mjs";
import { i as TrendChart } from "./charts-Cc_fLfta.mjs";
import { t as getPersonnel } from "./personnelService-YOzc5-E1.mjs";
import { s as getRecommendations, t as explainRisk } from "./riskService-I7--In7t.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./welfare.personnel._id-CLLt0Yj0.mjs";
import { t as Skeleton } from "./skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welfare.personnel._id-pTQemjWl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RiskGauge({ score, size = 220 }) {
	const band = bandForScore(score);
	const color = RISK_COLOR[band];
	const radius = size / 2 - 16;
	const circumference = Math.PI * radius;
	const progress = Math.min(Math.max(score, 0), 100) / 100;
	const cx = size / 2;
	const cy = size / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		style: { width: size },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size / 2 + 12,
				viewBox: `0 0 ${size} ${size / 2 + 12}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
					fill: "none",
					stroke: "var(--border)",
					strokeWidth: 14,
					strokeLinecap: "round"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
					fill: "none",
					stroke: color,
					strokeWidth: 14,
					strokeLinecap: "round",
					strokeDasharray: circumference,
					strokeDashoffset: circumference * (1 - progress),
					style: { transition: "stroke-dashoffset 900ms ease, stroke 500ms ease" }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mt-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl font-semibold tabular-nums",
					children: score
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest",
					style: { color },
					children: band
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid w-full grid-cols-4 gap-1 text-center text-[10px] text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0–30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "31–60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "61–80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "81–100" })
				]
			})
		]
	});
}
function RiskScore({ score, previous, compact = false, className }) {
	const band = bandForScore(score);
	const delta = previous === void 0 ? 0 : score - previous;
	const Icon = delta > 0 ? ArrowUpRight : delta < 0 ? ArrowDownRight : Minus;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-2", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: "Welfare Risk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("font-display font-semibold tabular-nums leading-none", compact ? "text-3xl" : "text-5xl"),
					children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-base font-normal text-muted-foreground",
						children: "/ 100"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { band })]
			}),
			previous !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("inline-flex items-center gap-1 text-sm font-medium", delta > 0 ? "text-risk-high" : delta < 0 ? "text-risk-low" : "text-muted-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), delta === 0 ? "No change" : `${Math.abs(delta)} points from previous assessment`]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: "Prototype welfare risk bands"
			})
		]
	});
}
var PRIORITY = {
	High: "bg-risk-high/12 text-risk-high",
	Medium: "bg-risk-moderate/15 text-risk-moderate",
	Low: "bg-risk-low/12 text-risk-low"
};
function RecommendationCard({ recommendation }) {
	const [state, setState] = (0, import_react.useState)("open");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border border-border p-4 transition-colors", state === "dismissed" && "opacity-55", state !== "open" && state !== "dismissed" && "border-risk-low/40 bg-risk-low/5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: recommendation.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: recommendation.detail
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", PRIORITY[recommendation.priority]),
				children: [recommendation.priority, " priority"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: state === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => {
						setState("accepted");
						toast.success("Recommendation accepted", { description: recommendation.title });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Accept"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => {
						setState("scheduled");
						toast.success("Follow-up scheduled", { description: "Within 7 days" });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }), " Schedule Follow-Up"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setState("dismissed"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Dismiss"]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: state === "accepted" ? "Accepted" : state === "scheduled" ? "Follow-up scheduled" : "Dismissed"
			})
		})]
	});
}
function PersonnelDetail() {
	const { id } = Route.useParams();
	const [person, setPerson] = (0, import_react.useState)(null);
	const [recs, setRecs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setLoading(true);
		Promise.all([getPersonnel(id), getRecommendations(id)]).then(([p, r]) => {
			setPerson(p ?? null);
			setRecs(r);
			setLoading(false);
		});
	}, [id]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-64" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full rounded-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 w-full rounded-xl" })
		]
	});
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-semibold",
				children: "Personnel record not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [id, " is not available in this prototype dataset."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/welfare/personnel",
					children: "Back to personnel"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			size: "sm",
			className: "mb-3 px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/welfare/personnel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to personnel"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Personnel ${person.id}`,
			subtitle: `${person.unit} · ${person.role} · last assessment ${person.lastAssessment}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[380px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel flex flex-col items-center gap-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskGauge, { score: person.riskScore }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskScore, {
						score: person.riskScore,
						previous: person.previousScore,
						compact: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid w-full grid-cols-3 gap-3 border-t border-border pt-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Deployment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1 font-display text-lg font-semibold",
								children: [person.deploymentDays, "d"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Night shifts"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-lg font-semibold",
								children: person.nightShifts
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Leave days"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-display text-lg font-semibold",
								children: person.leaveTaken
							})] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Risk Factors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Relative contribution to the current welfare risk indicator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-4",
							children: person.factors.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: f.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted-foreground",
									children: f.value
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-navy transition-[width] duration-700",
									style: { width: `${f.value}%` }
								})
							})] }, f.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel border-l-[3px] border-l-teal p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-5 text-teal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Why is this risk elevated?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: explainRisk(person.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-3 rounded-lg bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-4 shrink-0 text-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Important"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-sm text-muted-foreground",
								children: "This is an AI-generated welfare risk indicator and is NOT a medical diagnosis. It supports, and never replaces, human welfare judgement."
							})] })]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-lg font-semibold",
				children: "Recent Trends"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 xl:grid-cols-2",
				children: [
					{
						key: "stress",
						label: "Stress",
						color: "var(--risk-high)",
						domain: [0, 10]
					},
					{
						key: "sleep",
						label: "Sleep",
						color: "var(--teal)",
						domain: [0, 5]
					},
					{
						key: "workload",
						label: "Workload",
						color: "var(--risk-moderate)",
						domain: [0, 5]
					},
					{
						key: "dutyHours",
						label: "Duty Hours (monthly)",
						color: "var(--navy)",
						domain: [120, 280]
					},
					{
						key: "risk",
						label: "Risk Score",
						color: "var(--risk-critical)",
						domain: [0, 100]
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
							data: person.series,
							series: [{
								key: s.key,
								label: s.label,
								color: s.color
							}],
							yDomain: s.domain,
							height: 200
						})
					})]
				}, s.key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Recommended Welfare Actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Supportive actions only · never disciplinary"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Restricted to authorised welfare roles"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-3",
				children: recs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationCard, { recommendation: r }, r.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { PersonnelDetail as component };
