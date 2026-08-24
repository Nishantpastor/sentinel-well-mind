import { d as RISK_TREND, l as RECOMMENDATIONS, r as COMMANDER_SUMMARY, s as ORG_SUMMARY } from "./mockData-pcP1SyUk.mjs";
import { t as apiFetch } from "./api-CcZELwza.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/riskService-I7--In7t.js
async function getOrgSummary() {
	try {
		return await apiFetch("/analytics/org-summary");
	} catch (err) {
		console.warn("Backend getOrgSummary call fallback to mockData", err);
		return ORG_SUMMARY;
	}
}
async function getCommanderSummary() {
	try {
		return await apiFetch("/analytics/commander-summary");
	} catch (err) {
		console.warn("Backend getCommanderSummary call fallback to mockData", err);
		return COMMANDER_SUMMARY;
	}
}
async function getRiskTrend() {
	try {
		return await apiFetch("/analytics/risk-trend");
	} catch (err) {
		console.warn("Backend getRiskTrend call fallback to mockData", err);
		return RISK_TREND;
	}
}
async function getWorkloadTrend() {
	return apiFetch("/analytics/workload");
}
async function getFatigueIndicators() {
	return apiFetch("/analytics/fatigue");
}
async function getDeploymentDistribution() {
	return apiFetch("/analytics/deployment");
}
async function getLeaveUtilisation() {
	return apiFetch("/analytics/leave");
}
async function getUnitTrends() {
	return apiFetch("/analytics/unit-trends");
}
async function getRecommendations(personnelId) {
	try {
		return await apiFetch(`/risk/recommendations/${personnelId}`);
	} catch (err) {
		console.warn(`Backend getRecommendations(${personnelId}) call fallback to mockData`, err);
		return RECOMMENDATIONS;
	}
}
function explainRisk(personnelId) {
	return `AI analysis indicates elevated welfare risk for ${personnelId}, primarily associated with increased duty hours, frequent night shifts, prolonged deployment, declining sleep quality, and increasing self-reported stress.`;
}
//#endregion
export { getLeaveUtilisation as a, getRiskTrend as c, getFatigueIndicators as i, getUnitTrends as l, getCommanderSummary as n, getOrgSummary as o, getDeploymentDistribution as r, getRecommendations as s, explainRisk as t, getWorkloadTrend as u };
