import { Router } from "express";
import { simulateIncreasingStress } from "../controllers/simulationController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.post("/increasing-stress", requireRole(["WELFARE_OFFICER", "ADMIN"]), simulateIncreasingStress);

export default router;
