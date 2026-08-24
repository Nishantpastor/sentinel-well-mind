import { Router } from "express";
import { listAlerts, acknowledgeAlert, listNotifications } from "../controllers/alertController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.use(requireAuth);

router.get("/notifications", listNotifications);
router.get("/", requireRole(["WELFARE_OFFICER", "ADMIN"]), listAlerts);
router.patch("/:id/acknowledge", requireRole(["WELFARE_OFFICER", "ADMIN"]), logAudit("Acknowledged Alert", (req) => String(req.params.id)), acknowledgeAlert);

export default router;
