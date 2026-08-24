import { Router } from "express";
import { getMyTrends, submitCheckIn, submitAssessment, requestSupport } from "../controllers/wellnessController.js";
import { requireAuth } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.use(requireAuth);

router.get("/trends/me", getMyTrends);
router.post("/check-in", logAudit("Submitted Check-In"), submitCheckIn);
router.post("/assessment", logAudit("Submitted Wellness Assessment"), submitAssessment);
router.post("/support/request", logAudit("Requested Confidential Support"), requestSupport);

export default router;
