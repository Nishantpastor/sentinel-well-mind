import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";
import { updateConsentSchema } from "../validators/index.js";

export async function getConsent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const serviceId = req.user?.serviceId || "P-1024";

    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
      include: { privacyConsent: true },
    });

    const consent = p?.privacyConsent || {
      wellnessData: true,
      optionalData: true,
      analyticsParticipation: true,
      biometricData: false, // Biometric collection permanently disabled in prototype
    };

    res.json({ success: true, data: consent });
  } catch (error) {
    next(error);
  }
}

export async function updateConsent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payload = updateConsentSchema.parse(req.body);
    const serviceId = req.user?.serviceId || "P-1024";

    if (payload.biometricData === true) {
      res.status(400).json({
        success: false,
        error: {
          code: "BIOMETRIC_NOT_ALLOWED",
          message: "Biometric collection is strictly disabled in this welfare monitoring prototype.",
        },
      });
      return;
    }

    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
    });

    if (p) {
      const updated = await prisma.privacyConsent.upsert({
        where: { personnelId: p.id },
        update: {
          wellnessData: payload.wellnessData ?? true,
          optionalData: payload.optionalData ?? true,
          analyticsParticipation: payload.analyticsParticipation ?? true,
          biometricData: false,
        },
        create: {
          personnelId: p.id,
          wellnessData: payload.wellnessData ?? true,
          optionalData: payload.optionalData ?? true,
          analyticsParticipation: payload.analyticsParticipation ?? true,
          biometricData: false,
        },
      });
      res.json({ success: true, data: updated });
      return;
    }

    res.json({ success: true, data: { ...payload, biometricData: false } });
  } catch (error) {
    next(error);
  }
}
