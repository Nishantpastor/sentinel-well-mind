import { Router } from "express";
import { login, me, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.post("/login", logAudit("User Login", (req) => req.body.serviceId || "Login"), login);
router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, logAudit("User Logout"), logout);

export default router;
