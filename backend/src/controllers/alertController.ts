import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";

export async function listAlerts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: "desc" },
      include: { personnel: { select: { id: true, unit: { select: { name: true } } } } },
    });

    const formatted = alerts.map((a) => {
      let changes: string[] = [];
      try {
        changes = typeof a.detectedChanges === "string" ? JSON.parse(a.detectedChanges) : (a.detectedChanges || []);
      } catch {
        changes = ["Duty hours increased", "Sleep quality decreased"];
      }

      return {
        id: a.id,
        personnelId: a.personnelId,
        unit: a.unitName || a.personnel.unit.name,
        type: a.alertType,
        severity: a.severity,
        score: a.score,
        previousScore: a.previousScore,
        detectedChanges: changes,
        recommendation: a.recommendation,
        raisedAt: a.raisedAtFormatted || "Today",
        acknowledged: a.acknowledged,
      };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}

export async function acknowledgeAlert(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.alert.update({
      where: { id: String(id) },
      data: { acknowledged: true },
    });

    res.json({ success: true, data: { ok: true } });
  } catch (error) {
    next(error);
  }
}

export async function listNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const formatted = notifications.map((n) => ({
      id: n.id,
      title: n.title,
      detail: n.detail,
      time: n.time,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}
