import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  databaseUrl:
    process.env.DATABASE_URL ||
    "mysql://root:YOUR_MYSQL_PASSWORD@127.0.0.1:3306/sentinelwell",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "sentinelwell_jwt_access_secret_key_2026",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "sentinelwell_jwt_refresh_secret_key_2026",
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1h",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  mlServiceUrl: process.env.ML_SERVICE_URL || "http://localhost:8000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

export const prisma = new PrismaClient();
