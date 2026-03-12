import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET not configured");

  try {
    const payload = jwt.verify(token, secret) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "Missing or invalid token" });
  }
}

export { authMiddleware };
