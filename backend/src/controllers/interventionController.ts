import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";
import { createInterventionSchema } from "../validators/index.js";
import { bandForScore } from "../utils/risk.js";

export async function listInterventions(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const records = await prisma.intervention.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = records.map((r) => ({
      id: r.id,
      personnelId: r.personnelId,
      band: r.band,
      type: r.interventionType,
      officer: r.officerName,
      date: r.dateFormatted,
      status: r.status,
      followUp: r.followUpDate,
      restricted: r.restricted,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}

export async function recordIntervention(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payload = createInterventionSchema.parse(req.body);

    const personnel = await prisma.personnel.findUnique({
      where: { id: payload.personnelId },
    });

    const band = personnel ? personnel.band : "HIGH";
    const id = `IN-${Math.floor(200 + Math.random() * 700)}`;
    const officerName = payload.officer || req.user?.displayName || "WO Sharma";
    const dateFormatted = payload.date || "Today";
    const followUp = payload.followUp || "In 7 days";

    const record = await prisma.intervention.create({
      data: {
        id,
        personnelId: payload.personnelId,
        band,
        interventionType: payload.type,
        officerName,
        dateFormatted,
        status: payload.status as any,
        followUpDate: followUp,
        restricted: payload.restricted,
        notes: payload.notes || "Confidential officer log entry",
      },
    });

    res.json({
      success: true,
      data: {
        id: record.id,
        personnelId: record.personnelId,
        band: record.band,
        type: record.interventionType,
        officer: record.officerName,
        date: record.dateFormatted,
        status: record.status,
        followUp: record.followUpDate,
        restricted: record.restricted,
      },
    });
  } catch (error) {
    next(error);
  }
}
