import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";

export async function getWorkloadTrends(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const records = await prisma.dutyRecord.findMany({ select: { month: true, dutyHours: true } });
    const totals = new Map<string, { total: number; count: number }>();
    records.forEach(({ month, dutyHours }) => {
      const current = totals.get(month) || { total: 0, count: 0 };
      totals.set(month, { total: current.total + dutyHours, count: current.count + 1 });
    });
    const workload = Array.from(totals, ([month, value]) => ({
      month,
      hours: Math.round(value.total / value.count),
    }));
    res.json({ success: true, data: workload });
  } catch (error) {
    next(error);
  }
}

export async function getFatigueIndicators(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const records = await prisma.dutyRecord.findMany({
      select: { month: true, isNightShift: true, personnelId: true },
    });
    const months = Array.from(new Set(records.map((record) => record.month)));
    const fatigue = months.map((month) => ({
      month,
      nightShifts: records.filter((record) => record.month === month && record.isNightShift).length,
      sleepDeficit: null,
    }));
    res.json({ success: true, data: fatigue });
  } catch (error) {
    next(error);
  }
}

export async function getDeploymentDistribution(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const personnel = await prisma.personnel.findMany({ select: { deploymentDays: true } });
    const deployment = ["0-30 days", "31-90 days", "91-150 days", "151+ days"].map((band) => ({
      band,
      personnel: personnel.filter(({ deploymentDays }) =>
        band === "0-30 days" ? deploymentDays <= 30
          : band === "31-90 days" ? deploymentDays <= 90
            : band === "91-150 days" ? deploymentDays <= 150
              : deploymentDays > 150,
      ).length,
    }));
    res.json({ success: true, data: deployment });
  } catch (error) {
    next(error);
  }
}

export async function getLeaveUtilisation(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const leave = await prisma.personnel.findMany({
      select: { leaveTaken: true, unit: { select: { name: true } } },
    });
    const totals = new Map<string, { total: number; count: number }>();
    leave.forEach(({ leaveTaken, unit }) => {
      const current = totals.get(unit.name) || { total: 0, count: 0 };
      totals.set(unit.name, { total: current.total + leaveTaken, count: current.count + 1 });
    });
    const formattedLeave = Array.from(totals, ([unit, value]) => ({
      unit,
      daysTaken: Math.round(value.total / value.count),
    }));
    res.json({ success: true, data: formattedLeave });
  } catch (error) {
    next(error);
  }
}

export async function getUnitTrends(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const units = await prisma.unit.findMany({ orderBy: { name: "asc" } });
    const unitTrends = [{
      month: "Current",
      ...Object.fromEntries(units.map((unit) => [unit.name.replace("Unit ", "unit"), Math.round(unit.averageRisk)])),
    }];
    res.json({ success: true, data: unitTrends });
  } catch (error) {
    next(error);
  }
}
