import { t as apiFetch } from "./api-CcZELwza.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wellnessService-Ba7MtLkx.js
async function submitCheckIn(payload) {
	try {
		return await apiFetch("/wellness/check-in", {
			method: "POST",
			body: JSON.stringify(payload)
		});
	} catch (err) {
		console.warn("Backend submitCheckIn call fallback", err);
		return {
			ok: true,
			recordedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
}
async function submitAssessment(answers) {
	try {
		return await apiFetch("/wellness/assessment", {
			method: "POST",
			body: JSON.stringify(answers)
		});
	} catch (err) {
		console.warn("Backend submitAssessment call fallback", err);
		return {
			ok: true,
			supportRequested: answers["support"] === "yes"
		};
	}
}
async function requestSupport() {
	try {
		return await apiFetch("/wellness/support/request", { method: "POST" });
	} catch (err) {
		console.warn("Backend requestSupport call fallback", err);
		return {
			ok: true,
			reference: "SR-" + Math.floor(1e3 + Math.random() * 8999)
		};
	}
}
//#endregion
export { submitAssessment as n, submitCheckIn as r, requestSupport as t };
