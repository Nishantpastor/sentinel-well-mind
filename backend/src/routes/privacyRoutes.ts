import { Router } from "express";
import { getConsent, updateConsent } from "../controllers/privacyController.js";
import { requireAuth } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.use(requireAuth);

router.get("/consent", getConsent);
router.patch("/consent", logAudit("Updated Privacy Consent"), updateConsent);

export default router;
