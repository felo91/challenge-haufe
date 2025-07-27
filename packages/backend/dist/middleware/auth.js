"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AuthService_1 = require("../services/auth/AuthService");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "No token provided" });
            return;
        }
        const token = authHeader.substring(7);
        const authService = new AuthService_1.AuthService();
        const user = await authService.validateToken(token);
        if (!user) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Authentication failed" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map