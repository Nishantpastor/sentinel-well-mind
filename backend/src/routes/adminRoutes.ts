import { Router } from "express";
import { listUsers, listRoles, listAuditLogs } from "../controllers/adminController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole(["ADMIN"]));

router.get("/users", listUsers);
router.get("/roles", listRoles);
router.get("/audit-logs", listAuditLogs);

export default router;
