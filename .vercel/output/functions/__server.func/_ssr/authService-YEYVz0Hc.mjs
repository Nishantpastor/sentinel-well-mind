import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as apiFetch } from "./api-CcZELwza.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authService-YEYVz0Hc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "sentinelwell.role";
var current = null;
var listeners = /* @__PURE__ */ new Set();
function emit() {
	listeners.forEach((l) => l());
}
function setRole(role) {
	current = role;
	if (typeof window !== "undefined") if (role) window.localStorage.setItem(KEY, role);
	else window.localStorage.removeItem(KEY);
	emit();
}
function subscribe(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function getSnapshot() {
	if (current === null && typeof window !== "undefined") {
		const stored = window.localStorage.getItem(KEY);
		if (stored) current = stored;
	}
	return current;
}
function useSession() {
	return {
		role: (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, () => null),
		setRole
	};
}
var DEMO_USERS = {
	personnel: {
		role: "personnel",
		displayName: "Personnel Demo",
		serviceId: "P-1024"
	},
	welfare: {
		role: "welfare",
		displayName: "Welfare Officer Demo",
		serviceId: "WO-208"
	},
	commander: {
		role: "commander",
		displayName: "Commander Demo",
		serviceId: "CO-014"
	},
	admin: {
		role: "admin",
		displayName: "Administrator Demo",
		serviceId: "AD-001"
	}
};
var ROLE_LABEL = {
	personnel: "Personnel",
	welfare: "Welfare Officer",
	commander: "Commander",
	admin: "Administrator"
};
var ROLE_HOME = {
	personnel: "/personnel/dashboard",
	welfare: "/welfare/dashboard",
	commander: "/commander/dashboard",
	admin: "/admin/dashboard"
};
async function signInDemo(role, serviceId = DEMO_USERS[role].serviceId, password = "demo-access") {
	try {
		const demo = DEMO_USERS[role];
		const res = await apiFetch("/auth/login", {
			method: "POST",
			body: JSON.stringify({
				serviceId,
				password,
				role
			})
		});
		if (res?.accessToken) localStorage.setItem("sentinelwell.token", res.accessToken);
		return {
			role: res?.user?.role || role,
			displayName: res?.user?.displayName || demo.displayName,
			serviceId: res?.user?.serviceId || demo.serviceId
		};
	} catch (err) {
		if (typeof err === "object" && err !== null && "status" in err) throw err;
		console.warn("Backend auth call fallback to local demo user", err);
		return {
			...DEMO_USERS[role],
			serviceId
		};
	}
}
function getDemoUser(role) {
	return DEMO_USERS[role];
}
//#endregion
export { useSession as a, signInDemo as i, ROLE_LABEL as n, getDemoUser as r, ROLE_HOME as t };
