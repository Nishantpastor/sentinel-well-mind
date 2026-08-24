//#region node_modules/.nitro/vite/services/ssr/assets/api-CcZELwza.js
var BASE_URL = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_API_URL"] || "http://localhost:5000/api";
async function apiFetch(endpoint, options = {}) {
	const token = typeof window !== "undefined" ? localStorage.getItem("sentinelwell.token") : null;
	const role = typeof window !== "undefined" ? localStorage.getItem("sentinelwell.role") : null;
	const headers = {
		"Content-Type": "application/json",
		...options.headers
	};
	if (token) headers["Authorization"] = `Bearer ${token}`;
	if (role) {
		headers["x-demo-role"] = role;
		headers["x-demo-service-id"] = role === "welfare" ? "WO-208" : role === "commander" ? "CO-014" : role === "admin" ? "AD-001" : "P-1024";
	}
	const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
	const res = await fetch(url, {
		...options,
		headers
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) {
		const error = new Error(data?.error?.message || `HTTP ${res.status} Error`);
		Object.assign(error, { status: res.status });
		throw error;
	}
	return data.data !== void 0 ? data.data : data;
}
//#endregion
export { apiFetch as t };
