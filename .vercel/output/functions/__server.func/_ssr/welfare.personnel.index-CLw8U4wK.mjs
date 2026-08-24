import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as PrototypeNote, t as PageHeader } from "./PrototypeNote-DPVlr9hx.mjs";
import { n as listPersonnel } from "./personnelService-YOzc5-E1.mjs";
import { t as PersonnelTable } from "./PersonnelTable-CTGm3rGX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welfare.personnel.index-CLw8U4wK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonnelDirectory() {
	const [people, setPeople] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		listPersonnel().then((p) => {
			setPeople(p);
			setLoading(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Personnel",
			subtitle: "Confidential welfare risk directory · identifiers only, access logged."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "panel p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonnelTable, {
				data: people,
				loading
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrototypeNote, {})
	] });
}
//#endregion
export { PersonnelDirectory as component };
