"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/auth/AuthService");
class AuthController {
    constructor() {
        this.authService = new AuthService_1.AuthService();
    }
    async register(req, res, _next) {
        try {
            const registerData = req.body;
            const result = await this.authService.register(registerData);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async login(req, res, _next) {
        try {
            const loginData = req.body;
            const result = await this.authService.login(loginData);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map