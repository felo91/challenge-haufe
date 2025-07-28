import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth/AuthService";
import { RegisterRequest, LoginRequest } from "@rick-morty-app/libs";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const registerData: RegisterRequest = req.body;
    const result = await this.authService.register(registerData);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const loginData: LoginRequest = req.body;
    const result = await this.authService.login(loginData);
    res.status(200).json(result);
  }
}
