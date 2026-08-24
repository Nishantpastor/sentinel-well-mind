import { c as PERSONNEL, f as UNITS } from "./mockData-pcP1SyUk.mjs";
import { t as apiFetch } from "./api-CcZELwza.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personnelService-YOzc5-E1.js
async function listPersonnel() {
	try {
		return await apiFetch("/personnel");
	} catch (err) {
		console.warn("Backend listPersonnel call fallback to mockData", err);
		return PERSONNEL;
	}
}
async function getPersonnel(id) {
	try {
		return await apiFetch(`/personnel/${id}`);
	} catch (err) {
		console.warn(`Backend getPersonnel(${id}) call fallback to mockData`, err);
		return PERSONNEL.find((p) => p.id === id);
	}
}
async function listUnits() {
	try {
		return await apiFetch("/personnel/units");
	} catch (err) {
		console.warn("Backend listUnits call fallback to mockData", err);
		return UNITS;
	}
}
//#endregion
export { listPersonnel as n, listUnits as r, getPersonnel as t };
