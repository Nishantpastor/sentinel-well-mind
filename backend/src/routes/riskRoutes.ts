import { Router } from "express";
import { getOrgSummary, getCommanderSummary, getRiskTrend, getRecommendations, explainRisk } from "../controllers/riskController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.use(requireAuth);

router.get("/org-summary", requireRole(["WELFARE_OFFICER", "ADMIN"]), getOrgSummary);
router.get("/commander-summary", requireRole(["COMMANDER", "ADMIN"]), getCommanderSummary);
router.get("/risk-trend", getRiskTrend);

router.get("/recommendations/:personnelId", requireRole(["WELFARE_OFFICER", "ADMIN"]), getRecommendations);
router.get("/explain/:personnelId", requireRole(["WELFARE_OFFICER", "ADMIN"]), logAudit("Viewed Risk Explanation", (req) => String(req.params.personnelId)), explainRisk);

export default router;
