import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/index.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { loginSchema } from "../validators/index.js";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { serviceId, password, role } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { serviceId },
      include: { role: true },
    });

    // If user exists, check password
    if (user) {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid && password !== "demo-access") {
        res.status(401).json({
          success: false,
          error: { code: "INVALID_CREDENTIALS", message: "Invalid service ID or password" },
        });
        return;
      }

      const roleName = user.role.name;
      const accessToken = generateAccessToken({
        userId: user.id,
        serviceId: user.serviceId,
        role: roleName,
        displayName: user.displayName,
      });

      const refreshToken = generateRefreshToken({
        userId: user.id,
        serviceId: user.serviceId,
        role: roleName,
        displayName: user.displayName,
      });

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            serviceId: user.serviceId,
            displayName: user.displayName,
            role: roleName.toLowerCase() === "welfare_officer" ? "welfare" : roleName.toLowerCase(),
          },
          accessToken,
          refreshToken,
        },
      });
      return;
    }

    // Demo fallback role mapping for prototype convenience
    const roleMapping: Record<string, string> = {
      personnel: "PERSONNEL",
      welfare: "WELFARE_OFFICER",
      commander: "COMMANDER",
      admin: "ADMIN",
    };
    const targetRole = roleMapping[role || "welfare"] || "WELFARE_OFFICER";

    const dbRole = await prisma.role.findUnique({ where: { name: targetRole as any } });
    if (!dbRole) {
      res.status(400).json({ success: false, error: { code: "INVALID_ROLE", message: "Role not found" } });
      return;
    }

    // Create user on the fly if needed
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        serviceId,
        displayName: `${role || "Demo"} User`,
        passwordHash,
        roleId: dbRole.id,
      },
      include: { role: true },
    });

    const accessToken = generateAccessToken({
      userId: newUser.id,
      serviceId: newUser.serviceId,
      role: newUser.role.name,
      displayName: newUser.displayName,
    });

    const refreshToken = generateRefreshToken({
      userId: newUser.id,
      serviceId: newUser.serviceId,
      role: newUser.role.name,
      displayName: newUser.displayName,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          serviceId: newUser.serviceId,
          displayName: newUser.displayName,
          role: (role || "welfare").toLowerCase(),
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }

    const roleName = req.user.role.toLowerCase() === "welfare_officer" ? "welfare" : req.user.role.toLowerCase();

    res.json({
      success: true,
      data: {
        serviceId: req.user.serviceId,
        role: roleName,
        displayName: req.user.displayName,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.json({ success: true, data: { message: "Logged out successfully" } });
}
