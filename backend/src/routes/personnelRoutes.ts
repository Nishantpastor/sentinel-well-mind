import { Router } from "express";
import { listPersonnel, getPersonnel, listUnits, getMyProfile } from "../controllers/personnelController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { logAudit } from "../middleware/audit.js";

const router = Router();

router.use(requireAuth);

router.get("/me", getMyProfile);
router.get("/units", listUnits);

// RBAC: Only Welfare Officer and Admin can view overall personnel list
router.get("/", requireRole(["WELFARE_OFFICER", "ADMIN"]), logAudit("Viewed Personnel Directory"), listPersonnel);

// RBAC: Welfare officer and Admin can view any personnel profile. Personnel can only view their own profile.
router.get("/:id", (req, res, next) => {
  const userRole = req.user?.role?.toUpperCase();
  const userServiceId = req.user?.serviceId;
  const requestedId = req.params.id;

  if (userRole === "COMMANDER") {
    res.status(403).json({
      success: false,
      error: { code: "FORBIDDEN", message: "Commanders are restricted to aggregated unit analytics." },
    });
    return;
  }

  if (userRole === "PERSONNEL" && userServiceId !== requestedId) {
    res.status(403).json({
      success: false,
      error: { code: "FORBIDDEN", message: "Personnel can only access their own profile." },
    });
    return;
  }

  next();
}, logAudit("Viewed Risk Profile", (req) => String(req.params.id)), getPersonnel);

export default router;
