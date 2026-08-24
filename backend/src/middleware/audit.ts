import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";
import { logger } from "../utils/logger.js";

export function logAudit(action: string, getResource?: (req: Request) => string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.json;

    res.json = function (body: any) {
      const isSuccess = res.statusCode >= 200 && res.statusCode < 400;
      const resource = getResource ? getResource(req) : (req.params.id || req.params.personnelId || req.body?.personnelId || "General");

      // Asynchronously log audit record to DB
      prisma.auditLog
        .create({
          data: {
            userId: req.user?.userId === "demo-user-id" ? null : req.user?.userId || null,
            userName: req.user?.displayName || req.user?.role || "System User",
            action,
            resource: String(resource),
            result: isSuccess ? "Authorized" : "Denied",
            ipAddress: req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1",
            metadata: JSON.stringify({ method: req.method, url: req.originalUrl, statusCode: res.statusCode }),
          },
        })
        .catch((err) => {
          logger.error("Failed to write audit log entry: %s", err);
        });

      return originalSend.call(this, body);
    };

    next();
  };
}
