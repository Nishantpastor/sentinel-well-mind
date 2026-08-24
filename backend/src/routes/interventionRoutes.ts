import { Router } from "express";
import { listInterventions, recordIntervention } from "../controllers/interventionController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.use(requireAuth);

router.get("/", requireRole(["WELFARE_OFFICER", "ADMIN"]), listInterventions);
router.post("/", requireRole(["WELFARE_OFFICER", "ADMIN"]), logAudit("Recorded Intervention", (req) => req.body.personnelId), recordIntervention);

export default router;
