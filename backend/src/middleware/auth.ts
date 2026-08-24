import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtPayload } from "../utils/jwt.js";
import { logger } from "../utils/logger.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Demo fallback for frontend authorization header
    const demoRole = req.headers["x-demo-role"] as string;
    const demoServiceId = req.headers["x-demo-service-id"] as string;

    if (demoRole) {
      const mappedRole = demoRole.toUpperCase() === "WELFARE" ? "WELFARE_OFFICER" : demoRole.toUpperCase();
      req.user = {
        userId: "demo-user-id",
        serviceId: demoServiceId || "DEMO-USER",
        role: mappedRole,
        displayName: `${demoRole} User`,
      };
      return next();
    }

    res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Authentication token is required" },
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    logger.warn("Invalid access token attempt: %s", error);
    res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Invalid or expired access token" },
    });
    return;
  }
}

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
      });
      return;
    }

    const normalizedRole = req.user.role.toUpperCase();
    const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

    if (!normalizedAllowed.includes(normalizedRole)) {
      logger.warn(`Forbidden access attempt by ${req.user.serviceId} (${req.user.role}) to ${req.originalUrl}`);
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Insufficient permissions for this resource" },
      });
      return;
    }

    next();
  };
}
