import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth/AuthService";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const authService = new AuthService();
    const user = await authService.validateToken(token);

    if (!user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
