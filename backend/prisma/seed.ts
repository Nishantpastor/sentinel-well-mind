import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const RAW_PERSONNEL = [
  {
    id: "P-1024",
    unit: "Unit A",
    role: "Section Commander",
    s: [4, 5, 5, 6, 7, 8],
    sl: [4, 4, 3, 3, 2, 2],
    w: [3, 4, 4, 5, 5, 5],
    d: [188, 196, 210, 224, 238, 252],
    r: [38, 44, 51, 63, 72, 82],
    f: [92, 78, 74, 62, 55, 88],
    indicators: ["Poor sleep", "High workload", "Frequent night shifts"],
    lastAssessment: "2 days ago",
    deploymentDays: 148,
    nightShifts: 19,
    leaveTaken: 4,
  },
  {
    id: "P-1031",
    unit: "Unit C",
    role: "Constable",
    s: [5, 6, 6, 7, 8, 8],
    sl: [3, 3, 3, 2, 2, 2],
    w: [4, 4, 5, 5, 5, 5],
    d: [204, 214, 226, 240, 250, 262],
    r: [46, 52, 60, 71, 79, 86],
    f: [95, 84, 80, 74, 60, 90],
    indicators: ["Prolonged deployment", "Poor sleep", "Elevated stress"],
    lastAssessment: "1 day ago",
    deploymentDays: 176,
    nightShifts: 22,
    leaveTaken: 2,
  },
  {
    id: "P-1042",
    unit: "Unit C",
    role: "Head Constable",
    s: [4, 4, 5, 6, 6, 7],
    sl: [4, 3, 3, 3, 2, 2],
    w: [3, 4, 4, 4, 5, 5],
    d: [180, 190, 202, 214, 226, 236],
    r: [34, 40, 48, 57, 66, 74],
    f: [82, 70, 72, 58, 50, 80],
    indicators: ["Rising fatigue", "Reduced rest cycles"],
    lastAssessment: "3 days ago",
    deploymentDays: 132,
    nightShifts: 16,
    leaveTaken: 5,
  },
  {
    id: "P-1057",
    unit: "Unit B",
    role: "Rifleman",
    s: [3, 4, 4, 5, 6, 7],
    sl: [4, 4, 4, 3, 3, 2],
    w: [3, 3, 4, 4, 5, 5],
    d: [172, 182, 192, 206, 218, 230],
    r: [30, 36, 42, 52, 61, 69],
    f: [76, 66, 64, 52, 48, 74],
    indicators: ["Increasing workload", "Declining sleep"],
    lastAssessment: "4 days ago",
    deploymentDays: 110,
    nightShifts: 14,
    leaveTaken: 6,
  },
  {
    id: "P-1063",
    unit: "Unit B",
    role: "Signals Operator",
    s: [4, 4, 5, 5, 6, 6],
    sl: [4, 3, 3, 3, 3, 2],
    w: [3, 4, 4, 4, 4, 5],
    d: [168, 178, 186, 196, 208, 216],
    r: [32, 37, 43, 50, 58, 64],
    f: [70, 62, 66, 48, 44, 68],
    indicators: ["Night-shift frequency", "Moderate fatigue"],
    lastAssessment: "5 days ago",
    deploymentDays: 96,
    nightShifts: 18,
    leaveTaken: 7,
  },
  {
    id: "P-1078",
    unit: "Unit C",
    role: "Driver",
    s: [5, 5, 6, 6, 7, 7],
    sl: [3, 3, 2, 2, 2, 2],
    w: [4, 4, 4, 5, 5, 5],
    d: [196, 206, 216, 228, 240, 248],
    r: [44, 50, 56, 64, 72, 78],
    f: [88, 80, 84, 56, 52, 82],
    indicators: ["Poor sleep", "Extended duty hours"],
    lastAssessment: "2 days ago",
    deploymentDays: 154,
    nightShifts: 21,
    leaveTaken: 3,
  },
  {
    id: "P-1085",
    unit: "Unit A",
    role: "Constable",
    s: [3, 3, 3, 4, 4, 4],
    sl: [4, 4, 4, 4, 4, 4],
    w: [3, 3, 3, 3, 3, 4],
    d: [152, 154, 158, 160, 164, 168],
    r: [22, 24, 26, 28, 30, 32],
    f: [40, 32, 28, 30, 34, 38],
    indicators: ["Stable wellness indicators"],
    lastAssessment: "6 days ago",
    deploymentDays: 62,
    nightShifts: 6,
    leaveTaken: 12,
  },
  {
    id: "P-1090",
    unit: "Unit A",
    role: "Medic",
    s: [2, 3, 3, 3, 3, 4],
    sl: [5, 4, 4, 4, 4, 4],
    w: [2, 3, 3, 3, 3, 3],
    d: [144, 148, 150, 152, 156, 158],
    r: [18, 20, 22, 24, 26, 28],
    f: [34, 26, 24, 22, 30, 32],
    indicators: ["Within expected range"],
    lastAssessment: "1 week ago",
    deploymentDays: 48,
    nightShifts: 4,
    leaveTaken: 14,
  },
  {
    id: "P-1133",
    unit: "Unit C",
    role: "Rifleman",
    s: [5, 6, 6, 7, 7, 8],
    sl: [3, 3, 2, 2, 2, 1],
    w: [4, 4, 5, 5, 5, 5],
    d: [206, 218, 228, 242, 252, 264],
    r: [48, 55, 63, 72, 80, 88],
    f: [96, 88, 86, 78, 64, 92],
    indicators: ["Prolonged deployment", "Severe sleep deficit"],
    lastAssessment: "1 day ago",
    deploymentDays: 188,
    nightShifts: 24,
    leaveTaken: 1,
  },
  {
    id: "P-1179",
    unit: "Unit C",
    role: "Head Constable",
    s: [4, 5, 5, 6, 6, 7],
    sl: [3, 3, 3, 2, 2, 2],
    w: [4, 4, 4, 5, 5, 5],
    d: [192, 200, 210, 222, 232, 244],
    r: [42, 47, 54, 62, 70, 77],
    f: [86, 76, 78, 60, 54, 84],
    indicators: ["High workload", "Poor sleep"],
    lastAssessment: "2 days ago",
    deploymentDays: 162,
    nightShifts: 20,
    leaveTaken: 3,
  },
];

function bandForScore(score: number): string {
  if (score <= 30) return "LOW";
  if (score <= 60) return "MODERATE";
  if (score <= 80) return "HIGH";
  return "CRITICAL";
}

async function main() {
  console.log("Seeding SentinelWell MySQL database...");

  // 1. Seed Roles
  const roles = [
    { name: "PERSONNEL", description: "Monitored personnel role" },
    { name: "WELFARE_OFFICER", description: "Welfare officer role with risk access" },
    { name: "COMMANDER", description: "Commander role with aggregated unit analytics" },
    { name: "ADMIN", description: "System administrator" },
  ];

  const roleMap: Record<string, string> = {};
  for (const r of roles) {
    const created = await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
    roleMap[r.name] = created.id;
  }

  // 2. Seed Demo Users
  const passwordHash = await bcrypt.hash("demo-access", 10);
  const demoUsers = [
    { serviceId: "P-1024", displayName: "Personnel Demo", roleName: "PERSONNEL" },
    { serviceId: "WO-208", displayName: "Welfare Officer Demo", roleName: "WELFARE_OFFICER" },
    { serviceId: "CO-014", displayName: "Commander Demo", roleName: "COMMANDER" },
    { serviceId: "AD-001", displayName: "Administrator Demo", roleName: "ADMIN" },
  ];

  const userMap: Record<string, string> = {};
  for (const u of demoUsers) {
    const created = await prisma.user.upsert({
      where: { serviceId: u.serviceId },
      update: {},
      create: {
        serviceId: u.serviceId,
        displayName: u.displayName,
        passwordHash,
        roleId: roleMap[u.roleName]!,
      },
    });
    userMap[u.serviceId] = created.id;
  }

  // 3. Seed Units
  const unitsData = [
    { name: "Unit A", personnelCount: 320, averageRisk: 31, band: "LOW", trend: "Stable" },
    { name: "Unit B", personnelCount: 340, averageRisk: 54, band: "MODERATE", trend: "Increasing" },
    { name: "Unit C", personnelCount: 295, averageRisk: 71, band: "HIGH", trend: "Increasing" },
    { name: "Unit D", personnelCount: 295, averageRisk: 27, band: "LOW", trend: "Stable" },
  ];

  const unitMap: Record<string, string> = {};
  for (const u of unitsData) {
    const created = await prisma.unit.upsert({
      where: { name: u.name },
      update: u,
      create: u,
    });
    unitMap[u.name] = created.id;
  }

  // 4. Seed Personnel, Duty, Wellness, and Risk Records
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const factorLabels = [
    "Duty Hours",
    "Night Shifts",
    "Sleep Quality",
    "Deployment Duration",
    "Low Leave Utilisation",
    "Reported Workload",
  ];

  for (const raw of RAW_PERSONNEL) {
    const finalRisk = raw.r[raw.r.length - 1]!;
    const prevRisk = raw.r[raw.r.length - 2]!;
    const delta = finalRisk - prevRisk;
    const trend = delta > 2 ? "Increasing" : delta < -2 ? "Decreasing" : "Stable";

    const personnel = await prisma.personnel.upsert({
      where: { id: raw.id },
      update: {
        userId: userMap[raw.id] || null,
        unitId: unitMap[raw.unit]!,
        rankRole: raw.role,
        riskScore: finalRisk,
        previousScore: prevRisk,
        band: bandForScore(finalRisk),
        trend,
        indicatorsJson: JSON.stringify(raw.indicators),
        lastAssessment: raw.lastAssessment,
        deploymentDays: raw.deploymentDays,
        nightShifts: raw.nightShifts,
        leaveTaken: raw.leaveTaken,
      },
      create: {
        id: raw.id,
        userId: userMap[raw.id] || null,
        unitId: unitMap[raw.unit]!,
        rankRole: raw.role,
        riskScore: finalRisk,
        previousScore: prevRisk,
        band: bandForScore(finalRisk),
        trend,
        indicatorsJson: JSON.stringify(raw.indicators),
        lastAssessment: raw.lastAssessment,
        deploymentDays: raw.deploymentDays,
        nightShifts: raw.nightShifts,
        leaveTaken: raw.leaveTaken,
      },
    });

    // Seed Privacy Consent
    await prisma.privacyConsent.upsert({
      where: { personnelId: personnel.id },
      update: {},
      create: {
        personnelId: personnel.id,
        wellnessData: true,
        optionalData: true,
        analyticsParticipation: true,
        biometricData: false,
      },
    });

    // Seed monthly duty, wellness, risk assessments
    for (let i = 0; i < months.length; i++) {
      const month = months[i]!;
      const dutyHours = raw.d[i]!;
      const stress = raw.s[i]!;
      const sleep = raw.sl[i]!;
      const workload = raw.w[i]!;
      const riskScore = raw.r[i]!;

      await prisma.dutyRecord.create({
        data: {
          personnelId: personnel.id,
          month,
          dutyHours,
          shiftType: i % 2 === 0 ? "Day" : "Night",
          isNightShift: i % 2 === 1,
          workloadScore: workload,
        },
      });

      await prisma.wellnessAssessment.create({
        data: {
          personnelId: personnel.id,
          stressScore: stress,
          sleepScore: sleep,
          energyScore: 6 - sleep,
          workloadScore: workload,
          exhaustionLevel: stress >= 6 ? "Often" : "Rarely",
          workLifeBalance: stress >= 6 ? "Dissatisfied" : "Satisfied",
          supportRequested: false,
        },
      });

      await prisma.riskAssessment.create({
        data: {
          personnelId: personnel.id,
          riskScore,
          riskBand: bandForScore(riskScore),
          trend: i > 0 ? (riskScore - raw.r[i - 1]! > 2 ? "Increasing" : "Stable") : "Stable",
          modelVersion: "v1.0.0-prototype",
          factors: {
            create: factorLabels.map((label, idx) => ({
              label,
              value: raw.f[idx] || 50,
            })),
          },
        },
      });
    }
  }

  // 5. Seed Alerts
  const alertsData = [
    {
      id: "AL-4401",
      personnelId: "P-1024",
      unitName: "Unit A",
      alertType: "High Welfare Risk",
      severity: "CRITICAL",
      score: 82,
      previousScore: 54,
      detectedChanges: JSON.stringify([
        "Duty hours increased 14% over 30 days",
        "Sleep quality decreased from 4 to 2",
        "Night shifts increased from 9 to 19",
      ]),
      recommendation: "Confidential welfare follow-up.",
      raisedAtFormatted: "Today, 10:42",
      acknowledged: false,
    },
    {
      id: "AL-4398",
      personnelId: "P-1133",
      unitName: "Unit C",
      alertType: "Increasing Fatigue Trend",
      severity: "CRITICAL",
      score: 88,
      previousScore: 80,
      detectedChanges: JSON.stringify([
        "Sustained sleep deficit across 6 weeks",
        "Continuous deployment beyond 180 days",
      ]),
      recommendation: "Prioritise rest rotation where operationally feasible.",
      raisedAtFormatted: "Today, 08:15",
      acknowledged: false,
    },
    {
      id: "AL-4392",
      personnelId: "P-1078",
      unitName: "Unit C",
      alertType: "Excessive Workload",
      severity: "HIGH",
      score: 78,
      previousScore: 72,
      detectedChanges: JSON.stringify(["Duty hours above unit average for 5 consecutive weeks"]),
      recommendation: "Review recent duty workload distribution.",
      raisedAtFormatted: "Yesterday, 17:20",
      acknowledged: false,
    },
  ];

  for (const a of alertsData) {
    await prisma.alert.upsert({
      where: { id: a.id },
      update: a,
      create: a,
    });
  }

  // 6. Seed Interventions
  const interventionsData = [
    {
      id: "IN-201",
      personnelId: "P-1024",
      band: "CRITICAL",
      interventionType: "Confidential welfare follow-up",
      officerName: "WO Sharma",
      dateFormatted: "18 Jun 2026",
      status: "In Progress",
      followUpDate: "25 Jun 2026",
      restricted: true,
    },
    {
      id: "IN-198",
      personnelId: "P-1133",
      band: "CRITICAL",
      interventionType: "Rest rotation review",
      officerName: "WO Iyer",
      dateFormatted: "17 Jun 2026",
      status: "Pending",
      followUpDate: "24 Jun 2026",
      restricted: true,
    },
  ];

  for (const i of interventionsData) {
    await prisma.intervention.upsert({
      where: { id: i.id },
      update: i,
      create: i,
    });
  }

  // 7. Seed Audit Logs
  const auditLogsData = [
    {
      userName: "Welfare Officer",
      action: "Viewed Risk Profile",
      resource: "P-1024",
      result: "Authorized",
    },
    {
      userName: "Commander",
      action: "Viewed Aggregated Unit Analytics",
      resource: "Unit B",
      result: "Authorized",
    },
    {
      userName: "Commander",
      action: "Attempted Individual Wellness Access",
      resource: "P-1133",
      result: "Denied",
    },
  ];

  for (const l of auditLogsData) {
    await prisma.auditLog.create({ data: l });
  }

  // 8. Seed Notifications
  const notificationsData = [
    { title: "New high-risk welfare alert", detail: "P-1024 · Unit A", time: "10:42 AM" },
    { title: "Intervention recorded", detail: "IN-201 · In Progress", time: "09:31 AM" },
  ];

  for (const n of notificationsData) {
    await prisma.notification.create({ data: n });
  }

  console.log("Database successfully seeded!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
