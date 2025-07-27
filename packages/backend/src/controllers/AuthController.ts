import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth/AuthService";
import { RegisterRequest, LoginRequest } from "@rick-morty-app/libs";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const registerData: RegisterRequest = req.body;
      const result = await this.authService.register(registerData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const loginData: LoginRequest = req.body;
      const result = await this.authService.login(loginData);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
