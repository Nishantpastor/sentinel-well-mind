import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/index.js";
import { prisma } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import personnelRoutes from "./routes/personnelRoutes.js";
import wellnessRoutes from "./routes/wellnessRoutes.js";
import riskRoutes from "./routes/riskRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import interventionRoutes from "./routes/interventionRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import privacyRoutes from "./routes/privacyRoutes.js";
import simulationRoutes from "./routes/simulationRoutes.js";

const app = express();

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      config.frontendUrl,
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: "TOO_MANY_REQUESTS", message: "Too many requests, please try again later." } },
});
app.use("/api", limiter);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OpenAPI Swagger Spec Definition
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "SentinelWell Backend API",
    version: "1.0.0",
    description: "REST API for SentinelWell AI Personnel Stress & Welfare Monitoring System",
  },
  servers: [{ url: `http://localhost:${config.port}/api` }],
  paths: {
    "/health": { get: { summary: "System Health Check", responses: { 200: { description: "Healthy status" } } } },
    "/auth/login": { post: { summary: "User Authentication", responses: { 200: { description: "JWT Access Token" } } } },
    "/personnel": { get: { summary: "List personnel welfare indicators", responses: { 200: { description: "Personnel List" } } } },
    "/wellness/assessment": { post: { summary: "Submit voluntary self-assessment", responses: { 200: { description: "Recorded" } } } },
    "/simulation/increasing-stress": { post: { summary: "Trigger demo stress simulation engine", responses: { 200: { description: "Alert created" } } } },
  },
};

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Endpoint
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        mlService: config.mlServiceUrl,
      },
    });
  } catch (error) {
    console.error("Database health check failed", error);
    res.status(503).json({
      success: false,
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "unavailable",
        mlService: config.mlServiceUrl,
      },
    });
  }
});

// Mount API Routers
app.use("/api/auth", authRoutes);
app.use("/api/personnel", personnelRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/risk", riskRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/interventions", interventionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/simulation", simulationRoutes);

// Centralized Error Handling
app.use(errorHandler);

export default app;
