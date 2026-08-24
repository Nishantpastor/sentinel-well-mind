import { Router } from "express";
import {
  getWorkloadTrends,
  getFatigueIndicators,
  getDeploymentDistribution,
  getLeaveUtilisation,
  getUnitTrends,
} from "../controllers/analyticsController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getOrgSummary, getCommanderSummary, getRiskTrend } from "../controllers/riskController.js";

const router = Router();

router.use(requireAuth);

router.get("/org-summary", requireRole(["WELFARE_OFFICER", "ADMIN"]), getOrgSummary);
router.get("/commander-summary", requireRole(["COMMANDER", "ADMIN"]), getCommanderSummary);
router.get("/risk-trend", getRiskTrend);

router.get("/workload", requireRole(["COMMANDER", "WELFARE_OFFICER", "ADMIN"]), getWorkloadTrends);
router.get("/fatigue", requireRole(["COMMANDER", "WELFARE_OFFICER", "ADMIN"]), getFatigueIndicators);
router.get("/deployment", requireRole(["COMMANDER", "WELFARE_OFFICER", "ADMIN"]), getDeploymentDistribution);
router.get("/leave", requireRole(["COMMANDER", "WELFARE_OFFICER", "ADMIN"]), getLeaveUtilisation);
router.get("/unit-trends", requireRole(["COMMANDER", "WELFARE_OFFICER", "ADMIN"]), getUnitTrends);

export default router;
