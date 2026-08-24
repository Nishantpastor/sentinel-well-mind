import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";

function buildSeries(dutyRecords: any[], riskAssessments: any[], wellnessAssessments: any[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, idx) => {
    const duty = dutyRecords.find((d) => d.month === month) || dutyRecords[idx] || {};
    const risk = riskAssessments[idx] || riskAssessments[riskAssessments.length - 1] || {};
    const wellness = wellnessAssessments[idx] || wellnessAssessments[wellnessAssessments.length - 1] || {};

    return {
      month,
      stress: wellness.stressScore ?? 4,
      sleep: wellness.sleepScore ?? 3,
      workload: wellness.workloadScore ?? 3,
      dutyHours: duty.dutyHours ?? (180 + idx * 10),
      risk: risk.riskScore ?? 40,
    };
  });
}

function formatPersonnel(p: any) {
  const latestRisk = p.riskAssessments[0] || {};
  const latestFactors = latestRisk.factors || [];

  let parsedIndicators: string[] = [];
  try {
    parsedIndicators = typeof p.indicatorsJson === "string" ? JSON.parse(p.indicatorsJson) : (p.indicators || []);
  } catch {
    parsedIndicators = ["Poor sleep", "High workload"];
  }

  return {
    id: p.id,
    unit: p.unit.name,
    role: p.rankRole,
    riskScore: p.riskScore,
    previousScore: p.previousScore,
    band: p.band,
    trend: p.trend,
    indicators: parsedIndicators,
    lastAssessment: p.lastAssessment,
    deploymentDays: p.deploymentDays,
    nightShifts: p.nightShifts,
    leaveTaken: p.leaveTaken,
    series: buildSeries(p.dutyRecords, p.riskAssessments, p.wellnessAssessments),
    factors: latestFactors.length > 0
      ? latestFactors.map((f: any) => ({ label: f.label, value: f.value }))
      : [
          { label: "Duty Hours", value: Math.min(100, Math.round((p.nightShifts * 4))) },
          { label: "Night Shifts", value: Math.min(100, p.nightShifts * 4) },
          { label: "Sleep Quality", value: Math.min(100, p.riskScore) },
          { label: "Deployment Duration", value: Math.min(100, Math.round(p.deploymentDays / 2)) },
          { label: "Low Leave Utilisation", value: Math.min(100, 100 - p.leaveTaken * 5) },
          { label: "Reported Workload", value: Math.min(100, p.riskScore - 5) },
        ],
  };
}

export async function listPersonnel(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const search = req.query.search ? String(req.query.search) : undefined;
    const unitId = req.query.unitId ? String(req.query.unitId) : undefined;
    const riskLevel = req.query.riskLevel ? String(req.query.riskLevel) : undefined;

    const where: any = {};
    if (unitId) where.unitId = unitId;
    if (riskLevel) where.band = riskLevel.toUpperCase();
    if (search) {
      where.OR = [
        { id: { contains: search } },
        { rankRole: { contains: search } },
      ];
    }

    const records = await prisma.personnel.findMany({
      where,
      include: {
        unit: true,
        dutyRecords: { orderBy: { date: "asc" } },
        wellnessAssessments: { orderBy: { createdAt: "asc" } },
        riskAssessments: {
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { factors: true },
        },
      },
      orderBy: { riskScore: "desc" },
    });

    const formatted = records.map(formatPersonnel);
    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}

export async function getPersonnel(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id;
    const p = await prisma.personnel.findUnique({
      where: { id: String(id) },
      include: {
        unit: true,
        dutyRecords: { orderBy: { date: "asc" } },
        wellnessAssessments: { orderBy: { createdAt: "asc" } },
        riskAssessments: {
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { factors: true },
        },
      },
    });

    if (!p) {
      res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Personnel not found" } });
      return;
    }

    res.json({ success: true, data: formatPersonnel(p) });
  } catch (error) {
    next(error);
  }
}

export async function listUnits(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const units = await prisma.unit.findMany({
      orderBy: { name: "asc" },
    });

    const formatted = units.map((u) => ({
      id: u.id,
      name: u.name,
      personnel: u.personnelCount,
      band: u.band,
      trend: u.trend,
      averageRisk: Math.round(u.averageRisk),
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
}

export async function getMyProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const serviceId = req.user?.serviceId || "P-1024";
    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
      include: {
        unit: true,
        dutyRecords: { orderBy: { date: "asc" } },
        wellnessAssessments: { orderBy: { createdAt: "asc" } },
        riskAssessments: {
          orderBy: { createdAt: "desc" },
          take: 6,
          include: { factors: true },
        },
      },
    });

    if (!p) {
      res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Profile not found" } });
      return;
    }

    res.json({ success: true, data: formatPersonnel(p) });
  } catch (error) {
    next(error);
  }
}
