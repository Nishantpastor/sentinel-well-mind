import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/index.js";
import { predictWelfareRisk } from "../services/mlClient.js";
import { assessmentSchema, checkInSchema } from "../validators/index.js";

export async function getMyTrends(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const serviceId = req.user?.serviceId || "P-1024";
    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
      include: {
        dutyRecords: { orderBy: { date: "asc" } },
        wellnessAssessments: { orderBy: { createdAt: "asc" } },
        riskAssessments: { orderBy: { createdAt: "asc" } },
      },
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const series = months.map((month, idx) => {
      const duty: any = p?.dutyRecords[idx] || {};
      const risk: any = p?.riskAssessments[idx] || {};
      const wellness: any = p?.wellnessAssessments[idx] || {};

      return {
        month,
        stress: wellness.stressScore ?? 4,
        sleep: wellness.sleepScore ?? 4,
        workload: wellness.workloadScore ?? 3,
        dutyHours: duty.dutyHours ?? (180 + idx * 10),
        risk: risk.riskScore ?? 38,
      };
    });

    res.json({ success: true, data: series });
  } catch (error) {
    next(error);
  }
}

export async function submitCheckIn(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payload = checkInSchema.parse(req.body);
    const serviceId = req.user?.serviceId || "P-1024";

    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
    });

    if (p) {
      await prisma.wellnessAssessment.create({
        data: {
          personnelId: p.id,
          stressScore: payload.stress,
          sleepScore: payload.sleep,
          energyScore: payload.energy,
          workloadScore: payload.workload,
          exhaustionLevel: payload.mood || "Normal",
          supportRequested: false,
        },
      });
    }

    res.json({ success: true, recordedAt: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
}

export async function submitAssessment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body;
    const stress = Number(body.stress ?? 5);
    const sleep = Number(body.sleep ?? 3);
    const energy = Number(body.energy ?? 3);
    const workloadStr = String(body.workload ?? "Manageable");
    
    const workloadMap: Record<string, number> = {
      "Very manageable": 1,
      "Manageable": 2,
      "Demanding": 3,
      "Heavy": 4,
      "Unsustainable": 5,
    };
    const workloadNum = workloadMap[workloadStr] || 3;
    const supportRequested = body.support === "yes";

    const serviceId = req.user?.serviceId || "P-1024";
    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
      include: { unit: true },
    });

    if (p) {
      // 1. Save Wellness Assessment
      await prisma.wellnessAssessment.create({
        data: {
          personnelId: p.id,
          stressScore: stress,
          sleepScore: sleep,
          energyScore: energy,
          workloadScore: workloadNum,
          exhaustionLevel: String(body.exhaustion || "Sometimes"),
          workLifeBalance: String(body.balance || "Neutral"),
          supportRequested,
        },
      });

      // 2. Query FastAPI ML Risk Engine
      const mlResult = await predictWelfareRisk({
        dutyHours: 220,
        nightShifts: p.nightShifts,
        deploymentDays: p.deploymentDays,
        leaveDays: p.leaveTaken,
        stressScore: stress,
        sleepScore: sleep,
        energyScore: energy,
        workloadScore: workloadNum,
        previousScore: p.riskScore,
      });

      // 3. Save Risk Assessment & Factors
      const riskRecord = await prisma.riskAssessment.create({
        data: {
          personnelId: p.id,
          riskScore: mlResult.riskScore,
          riskBand: mlResult.riskLevel,
          trend: mlResult.trend as any,
          modelVersion: mlResult.modelVersion,
          factors: {
            create: mlResult.factors.map((f) => ({
              label: f.label,
              value: f.value,
            })),
          },
        },
      });

      // 4. Update Personnel summary score
      await prisma.personnel.update({
        where: { id: p.id },
        data: {
          previousScore: p.riskScore,
          riskScore: mlResult.riskScore,
          band: mlResult.riskLevel,
          trend: mlResult.trend as any,
          lastAssessment: "Today",
        },
      });

      // 5. Generate Alert if high risk or critical threshold crossed
      if (mlResult.riskScore >= 70 || mlResult.riskScore - p.riskScore >= 10) {
        await prisma.alert.create({
          data: {
            id: `AL-${Math.floor(4400 + Math.random() * 500)}`,
            personnelId: p.id,
            unitName: p.unit.name,
            alertType: mlResult.riskScore >= 80 ? "High Welfare Risk" : "Increasing Fatigue Trend",
            severity: mlResult.riskLevel,
            score: mlResult.riskScore,
            previousScore: p.riskScore,
            detectedChanges: JSON.stringify([
              `Self-reported stress rose to ${stress}/10`,
              `Sleep quality rated ${sleep}/5`,
              `Welfare risk score increased by ${mlResult.riskScore - p.riskScore} points`,
            ]),
            recommendation: "Confidential welfare follow-up and duty review.",
            raisedAtFormatted: "Today, Just now",
            acknowledged: false,
          },
        });
      }

      // 6. Handle Support Request if requested
      if (supportRequested) {
        await prisma.supportRequest.create({
          data: {
            personnelId: p.id,
            reference: `SR-${Math.floor(1000 + Math.random() * 8999)}`,
            status: "PENDING",
            notes: "Voluntary self-assessment support request",
          },
        });
      }
    }

    res.json({ ok: true, supportRequested });
  } catch (error) {
    next(error);
  }
}

export async function requestSupport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const serviceId = req.user?.serviceId || "P-1024";
    const ref = `SR-${Math.floor(1000 + Math.random() * 8999)}`;

    const p = await prisma.personnel.findFirst({
      where: { OR: [{ id: serviceId }, { id: "P-1024" }] },
    });

    if (p) {
      await prisma.supportRequest.create({
        data: {
          personnelId: p.id,
          reference: ref,
          status: "PENDING",
          notes: "Confidential support requested via Support Portal",
        },
      });
    }

    res.json({ ok: true, reference: ref });
  } catch (error) {
    next(error);
  }
}
