import request from "supertest";
import app from "../src/app.js";

describe("SentinelWell Backend API Test Suite", () => {
  let welfareToken: string;
  let commanderToken: string;
  let personnelToken: string;
  let adminToken: string;

  beforeAll(async () => {
    // Obtain tokens for all roles
    const wRes = await request(app).post("/api/auth/login").send({ serviceId: "WO-208", password: "demo-access", role: "welfare" });
    welfareToken = wRes.body.data.accessToken;

    const cRes = await request(app).post("/api/auth/login").send({ serviceId: "CO-014", password: "demo-access", role: "commander" });
    commanderToken = cRes.body.data.accessToken;

    const pRes = await request(app).post("/api/auth/login").send({ serviceId: "P-1024", password: "demo-access", role: "personnel" });
    personnelToken = pRes.body.data.accessToken;

    const aRes = await request(app).post("/api/auth/login").send({ serviceId: "AD-001", password: "demo-access", role: "admin" });
    adminToken = aRes.body.data.accessToken;
  });

  describe("1. Health Check", () => {
    it("should return 200 OK and healthy status", async () => {
      const res = await request(app).get("/api/health");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe("healthy");
    });
  });

  describe("2. Authentication", () => {
    it("should login successfully with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ serviceId: "WO-208", password: "demo-access" });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
    });

    it("should fail login with invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ serviceId: "WO-208", password: "wrong-password" });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("3. Role-Based Access Control (RBAC)", () => {
    it("Welfare Officer can view personnel list", async () => {
      const res = await request(app)
        .get("/api/personnel")
        .set("Authorization", `Bearer ${welfareToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("Commander CANNOT access individual personnel risk details (403 Forbidden)", async () => {
      const res = await request(app)
        .get("/api/personnel/P-1024")
        .set("Authorization", `Bearer ${commanderToken}`);
      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it("Welfare Officer CAN access individual personnel risk detail", async () => {
      const res = await request(app)
        .get("/api/personnel/P-1024")
        .set("Authorization", `Bearer ${welfareToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe("P-1024");
      expect(res.body.data.riskScore).toBeDefined();
    });

    it("Personnel CANNOT access another personnel profile", async () => {
      const res = await request(app)
        .get("/api/personnel/P-1133")
        .set("Authorization", `Bearer ${personnelToken}`);
      expect(res.status).toBe(403);
    });

    it("Admin can access audit logs", async () => {
      const res = await request(app)
        .get("/api/admin/audit-logs")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("4. Wellness Assessment & Alert Engine", () => {
    it("Personnel can submit a wellness assessment", async () => {
      const res = await request(app)
        .post("/api/wellness/assessment")
        .set("Authorization", `Bearer ${personnelToken}`)
        .send({
          stress: 7,
          sleep: 2,
          energy: 2,
          workload: "Heavy",
          exhaustion: "Often",
          balance: "Dissatisfied",
          support: "yes",
        });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.supportRequested).toBe(true);
    });
  });

  describe("5. Interventions", () => {
    it("Welfare Officer can record a new intervention", async () => {
      const res = await request(app)
        .post("/api/interventions")
        .set("Authorization", `Bearer ${welfareToken}`)
        .send({
          personnelId: "P-1024",
          type: "Confidential Welfare Check",
          officer: "WO Sharma",
          status: "In Progress",
          followUp: "In 5 days",
          restricted: true,
        });

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.personnelId).toBe("P-1024");
    });
  });

  describe("6. Stress Simulation Engine", () => {
    it("Welfare Officer can trigger stress simulation", async () => {
      const res = await request(app)
        .post("/api/simulation/increasing-stress")
        .set("Authorization", `Bearer ${welfareToken}`)
        .send({ personnelId: "P-1024" });

      expect(res.status).toBe(200);
      expect(res.body.data.riskScore).toBe(82);
      expect(res.body.data.riskLevel).toBe("CRITICAL");
      expect(res.body.data.alertCreated).toBeDefined();
    });
  });
});
