//#region node_modules/.nitro/vite/services/ssr/assets/mockData-pcP1SyUk.js
function bandForScore(score) {
	if (score <= 30) return "LOW";
	if (score <= 60) return "MODERATE";
	if (score <= 80) return "HIGH";
	return "CRITICAL";
}
var RISK_COLOR = {
	LOW: "var(--risk-low)",
	MODERATE: "var(--risk-moderate)",
	HIGH: "var(--risk-high)",
	CRITICAL: "var(--risk-critical)"
};
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun"
];
function series(stress, sleep, workload, duty, risk) {
	return MONTHS.map((month, i) => ({
		month,
		stress: stress[i],
		sleep: sleep[i],
		workload: workload[i],
		dutyHours: duty[i],
		risk: risk[i]
	}));
}
function factors(values) {
	return [
		"Duty Hours",
		"Night Shifts",
		"Sleep Quality",
		"Deployment Duration",
		"Low Leave Utilisation",
		"Reported Workload"
	].map((label, i) => ({
		label,
		value: values[i]
	}));
}
var PERSONNEL = [
	{
		id: "P-1024",
		unit: "Unit A",
		role: "Section Commander",
		s: [
			4,
			5,
			5,
			6,
			7,
			8
		],
		sl: [
			4,
			4,
			3,
			3,
			2,
			2
		],
		w: [
			3,
			4,
			4,
			5,
			5,
			5
		],
		d: [
			188,
			196,
			210,
			224,
			238,
			252
		],
		r: [
			38,
			44,
			51,
			63,
			72,
			82
		],
		f: [
			92,
			78,
			74,
			62,
			55,
			88
		],
		indicators: [
			"Poor sleep",
			"High workload",
			"Frequent night shifts"
		],
		lastAssessment: "2 days ago",
		deploymentDays: 148,
		nightShifts: 19,
		leaveTaken: 4
	},
	{
		id: "P-1031",
		unit: "Unit C",
		role: "Constable",
		s: [
			5,
			6,
			6,
			7,
			8,
			8
		],
		sl: [
			3,
			3,
			3,
			2,
			2,
			2
		],
		w: [
			4,
			4,
			5,
			5,
			5,
			5
		],
		d: [
			204,
			214,
			226,
			240,
			250,
			262
		],
		r: [
			46,
			52,
			60,
			71,
			79,
			86
		],
		f: [
			95,
			84,
			80,
			74,
			60,
			90
		],
		indicators: [
			"Prolonged deployment",
			"Poor sleep",
			"Elevated stress"
		],
		lastAssessment: "1 day ago",
		deploymentDays: 176,
		nightShifts: 22,
		leaveTaken: 2
	},
	{
		id: "P-1042",
		unit: "Unit C",
		role: "Head Constable",
		s: [
			4,
			4,
			5,
			6,
			6,
			7
		],
		sl: [
			4,
			3,
			3,
			3,
			2,
			2
		],
		w: [
			3,
			4,
			4,
			4,
			5,
			5
		],
		d: [
			180,
			190,
			202,
			214,
			226,
			236
		],
		r: [
			34,
			40,
			48,
			57,
			66,
			74
		],
		f: [
			82,
			70,
			72,
			58,
			50,
			80
		],
		indicators: ["Rising fatigue", "Reduced rest cycles"],
		lastAssessment: "3 days ago",
		deploymentDays: 132,
		nightShifts: 16,
		leaveTaken: 5
	},
	{
		id: "P-1057",
		unit: "Unit B",
		role: "Rifleman",
		s: [
			3,
			4,
			4,
			5,
			6,
			7
		],
		sl: [
			4,
			4,
			4,
			3,
			3,
			2
		],
		w: [
			3,
			3,
			4,
			4,
			5,
			5
		],
		d: [
			172,
			182,
			192,
			206,
			218,
			230
		],
		r: [
			30,
			36,
			42,
			52,
			61,
			69
		],
		f: [
			76,
			66,
			64,
			52,
			48,
			74
		],
		indicators: ["Increasing workload", "Declining sleep"],
		lastAssessment: "4 days ago",
		deploymentDays: 110,
		nightShifts: 14,
		leaveTaken: 6
	},
	{
		id: "P-1063",
		unit: "Unit B",
		role: "Signals Operator",
		s: [
			4,
			4,
			5,
			5,
			6,
			6
		],
		sl: [
			4,
			3,
			3,
			3,
			3,
			2
		],
		w: [
			3,
			4,
			4,
			4,
			4,
			5
		],
		d: [
			168,
			178,
			186,
			196,
			208,
			216
		],
		r: [
			32,
			37,
			43,
			50,
			58,
			64
		],
		f: [
			70,
			62,
			66,
			48,
			44,
			68
		],
		indicators: ["Night-shift frequency", "Moderate fatigue"],
		lastAssessment: "5 days ago",
		deploymentDays: 96,
		nightShifts: 18,
		leaveTaken: 7
	},
	{
		id: "P-1078",
		unit: "Unit C",
		role: "Driver",
		s: [
			5,
			5,
			6,
			6,
			7,
			7
		],
		sl: [
			3,
			3,
			2,
			2,
			2,
			2
		],
		w: [
			4,
			4,
			4,
			5,
			5,
			5
		],
		d: [
			196,
			206,
			216,
			228,
			240,
			248
		],
		r: [
			44,
			50,
			56,
			64,
			72,
			78
		],
		f: [
			88,
			80,
			84,
			56,
			52,
			82
		],
		indicators: ["Poor sleep", "Extended duty hours"],
		lastAssessment: "2 days ago",
		deploymentDays: 154,
		nightShifts: 21,
		leaveTaken: 3
	},
	{
		id: "P-1085",
		unit: "Unit A",
		role: "Constable",
		s: [
			3,
			3,
			3,
			4,
			4,
			4
		],
		sl: [
			4,
			4,
			4,
			4,
			4,
			4
		],
		w: [
			3,
			3,
			3,
			3,
			3,
			4
		],
		d: [
			152,
			154,
			158,
			160,
			164,
			168
		],
		r: [
			22,
			24,
			26,
			28,
			30,
			32
		],
		f: [
			40,
			32,
			28,
			30,
			34,
			38
		],
		indicators: ["Stable wellness indicators"],
		lastAssessment: "6 days ago",
		deploymentDays: 62,
		nightShifts: 6,
		leaveTaken: 12
	},
	{
		id: "P-1090",
		unit: "Unit A",
		role: "Medic",
		s: [
			2,
			3,
			3,
			3,
			3,
			4
		],
		sl: [
			5,
			4,
			4,
			4,
			4,
			4
		],
		w: [
			2,
			3,
			3,
			3,
			3,
			3
		],
		d: [
			144,
			148,
			150,
			152,
			156,
			158
		],
		r: [
			18,
			20,
			22,
			24,
			26,
			28
		],
		f: [
			34,
			26,
			24,
			22,
			30,
			32
		],
		indicators: ["Within expected range"],
		lastAssessment: "1 week ago",
		deploymentDays: 48,
		nightShifts: 4,
		leaveTaken: 14
	},
	{
		id: "P-1102",
		unit: "Unit D",
		role: "Constable",
		s: [
			3,
			3,
			3,
			3,
			4,
			4
		],
		sl: [
			4,
			4,
			4,
			4,
			4,
			3
		],
		w: [
			2,
			3,
			3,
			3,
			3,
			3
		],
		d: [
			140,
			146,
			150,
			152,
			158,
			162
		],
		r: [
			20,
			22,
			24,
			26,
			27,
			29
		],
		f: [
			38,
			28,
			30,
			24,
			26,
			34
		],
		indicators: ["Stable wellness indicators"],
		lastAssessment: "5 days ago",
		deploymentDays: 54,
		nightShifts: 5,
		leaveTaken: 11
	},
	{
		id: "P-1114",
		unit: "Unit D",
		role: "Storekeeper",
		s: [
			2,
			2,
			3,
			3,
			3,
			3
		],
		sl: [
			5,
			5,
			4,
			4,
			4,
			4
		],
		w: [
			2,
			2,
			3,
			3,
			3,
			3
		],
		d: [
			132,
			136,
			140,
			142,
			146,
			148
		],
		r: [
			16,
			18,
			20,
			21,
			23,
			25
		],
		f: [
			30,
			22,
			20,
			18,
			24,
			28
		],
		indicators: ["Within expected range"],
		lastAssessment: "1 week ago",
		deploymentDays: 40,
		nightShifts: 3,
		leaveTaken: 15
	},
	{
		id: "P-1126",
		unit: "Unit B",
		role: "Section Commander",
		s: [
			4,
			5,
			5,
			6,
			6,
			7
		],
		sl: [
			4,
			3,
			3,
			3,
			2,
			2
		],
		w: [
			3,
			4,
			4,
			4,
			5,
			5
		],
		d: [
			178,
			188,
			198,
			210,
			220,
			232
		],
		r: [
			36,
			42,
			49,
			58,
			66,
			73
		],
		f: [
			84,
			72,
			70,
			56,
			50,
			78
		],
		indicators: ["High workload", "Declining sleep"],
		lastAssessment: "3 days ago",
		deploymentDays: 128,
		nightShifts: 17,
		leaveTaken: 5
	},
	{
		id: "P-1133",
		unit: "Unit C",
		role: "Rifleman",
		s: [
			5,
			6,
			6,
			7,
			7,
			8
		],
		sl: [
			3,
			3,
			2,
			2,
			2,
			1
		],
		w: [
			4,
			4,
			5,
			5,
			5,
			5
		],
		d: [
			206,
			218,
			228,
			242,
			252,
			264
		],
		r: [
			48,
			55,
			63,
			72,
			80,
			88
		],
		f: [
			96,
			88,
			86,
			78,
			64,
			92
		],
		indicators: ["Prolonged deployment", "Severe sleep deficit"],
		lastAssessment: "1 day ago",
		deploymentDays: 188,
		nightShifts: 24,
		leaveTaken: 1
	},
	{
		id: "P-1147",
		unit: "Unit A",
		role: "Signals Operator",
		s: [
			3,
			3,
			4,
			4,
			5,
			5
		],
		sl: [
			4,
			4,
			3,
			3,
			3,
			3
		],
		w: [
			3,
			3,
			3,
			4,
			4,
			4
		],
		d: [
			160,
			166,
			174,
			182,
			190,
			196
		],
		r: [
			26,
			30,
			35,
			41,
			47,
			52
		],
		f: [
			58,
			50,
			46,
			40,
			38,
			56
		],
		indicators: ["Moderate workload increase"],
		lastAssessment: "4 days ago",
		deploymentDays: 84,
		nightShifts: 10,
		leaveTaken: 9
	},
	{
		id: "P-1158",
		unit: "Unit B",
		role: "Driver",
		s: [
			4,
			4,
			5,
			5,
			5,
			6
		],
		sl: [
			3,
			3,
			3,
			3,
			3,
			2
		],
		w: [
			3,
			4,
			4,
			4,
			4,
			5
		],
		d: [
			174,
			182,
			190,
			200,
			208,
			218
		],
		r: [
			34,
			39,
			45,
			51,
			57,
			62
		],
		f: [
			72,
			64,
			68,
			46,
			42,
			70
		],
		indicators: ["Night-shift frequency", "Fatigue risk"],
		lastAssessment: "6 days ago",
		deploymentDays: 104,
		nightShifts: 16,
		leaveTaken: 8
	},
	{
		id: "P-1166",
		unit: "Unit D",
		role: "Constable",
		s: [
			3,
			3,
			3,
			4,
			4,
			5
		],
		sl: [
			4,
			4,
			4,
			3,
			3,
			3
		],
		w: [
			3,
			3,
			3,
			4,
			4,
			4
		],
		d: [
			156,
			160,
			168,
			176,
			182,
			190
		],
		r: [
			24,
			27,
			31,
			37,
			42,
			48
		],
		f: [
			56,
			44,
			42,
			36,
			40,
			52
		],
		indicators: ["Slight increase in stress indicators"],
		lastAssessment: "1 week ago",
		deploymentDays: 76,
		nightShifts: 9,
		leaveTaken: 10
	},
	{
		id: "P-1179",
		unit: "Unit C",
		role: "Head Constable",
		s: [
			4,
			5,
			5,
			6,
			6,
			7
		],
		sl: [
			3,
			3,
			3,
			2,
			2,
			2
		],
		w: [
			4,
			4,
			4,
			5,
			5,
			5
		],
		d: [
			192,
			200,
			210,
			222,
			232,
			244
		],
		r: [
			42,
			47,
			54,
			62,
			70,
			77
		],
		f: [
			86,
			76,
			78,
			60,
			54,
			84
		],
		indicators: ["High workload", "Poor sleep"],
		lastAssessment: "2 days ago",
		deploymentDays: 162,
		nightShifts: 20,
		leaveTaken: 3
	},
	{
		id: "P-1188",
		unit: "Unit A",
		role: "Rifleman",
		s: [
			3,
			3,
			3,
			3,
			4,
			4
		],
		sl: [
			4,
			4,
			4,
			4,
			3,
			3
		],
		w: [
			3,
			3,
			3,
			3,
			4,
			4
		],
		d: [
			150,
			156,
			160,
			166,
			172,
			178
		],
		r: [
			22,
			25,
			28,
			32,
			36,
			40
		],
		f: [
			52,
			40,
			38,
			34,
			36,
			48
		],
		indicators: ["Monitoring recommended"],
		lastAssessment: "5 days ago",
		deploymentDays: 70,
		nightShifts: 8,
		leaveTaken: 10
	},
	{
		id: "P-1195",
		unit: "Unit D",
		role: "Medic",
		s: [
			2,
			3,
			3,
			3,
			3,
			3
		],
		sl: [
			5,
			4,
			4,
			4,
			4,
			4
		],
		w: [
			2,
			2,
			3,
			3,
			3,
			3
		],
		d: [
			138,
			142,
			146,
			150,
			152,
			156
		],
		r: [
			17,
			19,
			21,
			23,
			24,
			26
		],
		f: [
			32,
			24,
			22,
			20,
			26,
			30
		],
		indicators: ["Within expected range"],
		lastAssessment: "1 week ago",
		deploymentDays: 44,
		nightShifts: 4,
		leaveTaken: 13
	},
	{
		id: "P-1203",
		unit: "Unit B",
		role: "Constable",
		s: [
			4,
			4,
			5,
			5,
			6,
			6
		],
		sl: [
			4,
			3,
			3,
			3,
			2,
			2
		],
		w: [
			3,
			4,
			4,
			4,
			5,
			5
		],
		d: [
			170,
			180,
			190,
			202,
			212,
			222
		],
		r: [
			33,
			38,
			44,
			52,
			60,
			67
		],
		f: [
			78,
			68,
			66,
			50,
			46,
			72
		],
		indicators: ["Declining sleep", "Workload increase"],
		lastAssessment: "3 days ago",
		deploymentDays: 118,
		nightShifts: 15,
		leaveTaken: 6
	},
	{
		id: "P-1217",
		unit: "Unit A",
		role: "Constable",
		s: [
			3,
			3,
			4,
			4,
			4,
			5
		],
		sl: [
			4,
			4,
			4,
			3,
			3,
			3
		],
		w: [
			3,
			3,
			3,
			4,
			4,
			4
		],
		d: [
			158,
			164,
			170,
			178,
			186,
			192
		],
		r: [
			25,
			28,
			32,
			38,
			44,
			50
		],
		f: [
			60,
			48,
			44,
			38,
			40,
			54
		],
		indicators: ["Moderate fatigue indicators"],
		lastAssessment: "4 days ago",
		deploymentDays: 88,
		nightShifts: 11,
		leaveTaken: 9
	}
].map((p) => {
	const risk = p.r[p.r.length - 1];
	const prev = p.r[p.r.length - 2];
	const delta = risk - prev;
	return {
		id: p.id,
		unit: p.unit,
		role: p.role,
		riskScore: risk,
		previousScore: prev,
		band: bandForScore(risk),
		trend: delta > 2 ? "Increasing" : delta < -2 ? "Decreasing" : "Stable",
		indicators: p.indicators,
		lastAssessment: p.lastAssessment,
		series: series(p.s, p.sl, p.w, p.d, p.r),
		factors: factors(p.f),
		deploymentDays: p.deploymentDays,
		nightShifts: p.nightShifts,
		leaveTaken: p.leaveTaken
	};
});
var UNITS = [
	{
		id: "unit-a",
		name: "Unit A",
		personnel: 320,
		band: "LOW",
		trend: "Stable",
		averageRisk: 31
	},
	{
		id: "unit-b",
		name: "Unit B",
		personnel: 340,
		band: "MODERATE",
		trend: "Increasing",
		averageRisk: 54
	},
	{
		id: "unit-c",
		name: "Unit C",
		personnel: 295,
		band: "HIGH",
		trend: "Increasing",
		averageRisk: 71
	},
	{
		id: "unit-d",
		name: "Unit D",
		personnel: 295,
		band: "LOW",
		trend: "Stable",
		averageRisk: 27
	}
];
var ORG_SUMMARY = {
	total: 1250,
	low: 820,
	moderate: 310,
	high: 95,
	critical: 25
};
var RISK_TREND = [
	{
		month: "January",
		low: 910,
		moderate: 245,
		high: 72,
		critical: 23
	},
	{
		month: "February",
		low: 890,
		moderate: 262,
		high: 76,
		critical: 22
	},
	{
		month: "March",
		low: 872,
		moderate: 275,
		high: 80,
		critical: 23
	},
	{
		month: "April",
		low: 855,
		moderate: 288,
		high: 84,
		critical: 23
	},
	{
		month: "May",
		low: 838,
		moderate: 299,
		high: 89,
		critical: 24
	},
	{
		month: "June",
		low: 820,
		moderate: 310,
		high: 95,
		critical: 25
	}
];
var ALERTS = [
	{
		id: "AL-4401",
		personnelId: "P-1024",
		unit: "Unit A",
		type: "High Welfare Risk",
		severity: "CRITICAL",
		score: 82,
		previousScore: 54,
		detectedChanges: [
			"Duty hours increased 14% over 30 days",
			"Sleep quality decreased from 4 to 2",
			"Night shifts increased from 9 to 19"
		],
		recommendation: "Confidential welfare follow-up.",
		raisedAt: "Today, 10:42",
		acknowledged: false
	},
	{
		id: "AL-4398",
		personnelId: "P-1133",
		unit: "Unit C",
		type: "Increasing Fatigue Trend",
		severity: "CRITICAL",
		score: 88,
		previousScore: 80,
		detectedChanges: ["Sustained sleep deficit across 6 weeks", "Continuous deployment beyond 180 days"],
		recommendation: "Prioritise rest rotation where operationally feasible.",
		raisedAt: "Today, 08:15",
		acknowledged: false
	},
	{
		id: "AL-4392",
		personnelId: "P-1078",
		unit: "Unit C",
		type: "Excessive Workload",
		severity: "HIGH",
		score: 78,
		previousScore: 72,
		detectedChanges: ["Duty hours above unit average for 5 consecutive weeks"],
		recommendation: "Review recent duty workload distribution.",
		raisedAt: "Yesterday, 17:20",
		acknowledged: false
	},
	{
		id: "AL-4387",
		personnelId: "P-1031",
		unit: "Unit C",
		type: "Prolonged Deployment",
		severity: "CRITICAL",
		score: 86,
		previousScore: 79,
		detectedChanges: ["176 continuous deployment days", "Leave utilisation at 12%"],
		recommendation: "Confidential welfare follow-up and leave review.",
		raisedAt: "Yesterday, 09:05",
		acknowledged: true
	},
	{
		id: "AL-4380",
		personnelId: "P-1179",
		unit: "Unit C",
		type: "Repeated Wellness Concern",
		severity: "HIGH",
		score: 77,
		previousScore: 70,
		detectedChanges: ["Three consecutive assessments reporting mental exhaustion", "Self-reported stress rose from 5 to 7"],
		recommendation: "Offer available counselling and wellness resources.",
		raisedAt: "2 days ago",
		acknowledged: false
	}
];
var INTERVENTIONS = [
	{
		id: "IN-201",
		personnelId: "P-1024",
		band: "CRITICAL",
		type: "Confidential welfare follow-up",
		officer: "WO Sharma",
		date: "18 Jun 2026",
		status: "In Progress",
		followUp: "25 Jun 2026",
		restricted: true
	},
	{
		id: "IN-198",
		personnelId: "P-1133",
		band: "CRITICAL",
		type: "Rest rotation review",
		officer: "WO Iyer",
		date: "17 Jun 2026",
		status: "Pending",
		followUp: "24 Jun 2026",
		restricted: true
	},
	{
		id: "IN-194",
		personnelId: "P-1078",
		band: "HIGH",
		type: "Duty workload review",
		officer: "WO Kaur",
		date: "15 Jun 2026",
		status: "Completed",
		followUp: "—",
		restricted: false
	},
	{
		id: "IN-190",
		personnelId: "P-1179",
		band: "HIGH",
		type: "Counselling resources offered",
		officer: "WO Sharma",
		date: "12 Jun 2026",
		status: "Follow-up Required",
		followUp: "26 Jun 2026",
		restricted: true
	},
	{
		id: "IN-185",
		personnelId: "P-1203",
		band: "HIGH",
		type: "Scheduled follow-up assessment",
		officer: "WO Iyer",
		date: "10 Jun 2026",
		status: "Completed",
		followUp: "—",
		restricted: false
	}
];
var RECOMMENDATIONS = [
	{
		id: "R1",
		title: "Confidential welfare follow-up",
		detail: "Authorised welfare officer to schedule a private supportive conversation.",
		priority: "High"
	},
	{
		id: "R2",
		title: "Review recent duty workload",
		detail: "Duty hours have risen consistently across the last two rotations.",
		priority: "High"
	},
	{
		id: "R3",
		title: "Consider rest/rotation where operationally feasible",
		detail: "Sustained night-shift exposure is a leading contributor to the current score.",
		priority: "Medium"
	},
	{
		id: "R4",
		title: "Offer available counselling and wellness resources",
		detail: "Voluntary, confidential and access-controlled.",
		priority: "Medium"
	},
	{
		id: "R5",
		title: "Schedule follow-up assessment",
		detail: "Re-assess welfare indicators within 7 days.",
		priority: "Medium"
	}
];
var AUDIT_LOGS = [
	{
		id: "A-9001",
		user: "Welfare Officer",
		action: "Viewed Risk Profile",
		resource: "P-1024",
		timestamp: "10:42 AM",
		result: "Authorized"
	},
	{
		id: "A-9002",
		user: "Commander",
		action: "Viewed Aggregated Unit Analytics",
		resource: "Unit B",
		timestamp: "10:16 AM",
		result: "Authorized"
	},
	{
		id: "A-9003",
		user: "Commander",
		action: "Attempted Individual Wellness Access",
		resource: "P-1133",
		timestamp: "09:58 AM",
		result: "Denied"
	},
	{
		id: "A-9004",
		user: "Welfare Officer",
		action: "Recorded Intervention",
		resource: "IN-201",
		timestamp: "09:31 AM",
		result: "Authorized"
	},
	{
		id: "A-9005",
		user: "Administrator",
		action: "Updated Role Assignment",
		resource: "WO Kaur",
		timestamp: "09:04 AM",
		result: "Authorized"
	},
	{
		id: "A-9006",
		user: "Personnel",
		action: "Submitted Wellness Assessment",
		resource: "Self",
		timestamp: "08:47 AM",
		result: "Authorized"
	},
	{
		id: "A-9007",
		user: "Welfare Officer",
		action: "Acknowledged Alert",
		resource: "AL-4387",
		timestamp: "08:22 AM",
		result: "Authorized"
	}
];
var NOTIFICATIONS = [
	{
		id: "N1",
		title: "New high-risk welfare alert",
		detail: "P-1024 · Unit A",
		time: "10:42 AM"
	},
	{
		id: "N2",
		title: "Intervention recorded",
		detail: "IN-201 · In Progress",
		time: "09:31 AM"
	},
	{
		id: "N3",
		title: "Increasing fatigue trend detected",
		detail: "Unit C · 6-week window",
		time: "Yesterday"
	},
	{
		id: "N4",
		title: "Weekly wellness report available",
		detail: "Week 25 summary",
		time: "Monday"
	}
];
var COMMANDER_SUMMARY = {
	total: 350,
	low: 250,
	moderate: 72,
	high: 22,
	critical: 6
};
var MY_SERIES = PERSONNEL[0].series;
//#endregion
export { MY_SERIES as a, PERSONNEL as c, RISK_TREND as d, UNITS as f, INTERVENTIONS as i, RECOMMENDATIONS as l, AUDIT_LOGS as n, NOTIFICATIONS as o, bandForScore as p, COMMANDER_SUMMARY as r, ORG_SUMMARY as s, ALERTS as t, RISK_COLOR as u };
