"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = require("../../entities/User");
const database_1 = require("../../config/database");
class AuthService {
    constructor() {
        try {
            this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
        }
        catch (error) {
            console.log("Database not available, using mock repository");
            this.userRepository = null;
        }
    }
    async register(data) {
        if (!this.userRepository) {
            throw new Error("Database not available");
        }
        const existingUser = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const user = this.userRepository.create({
            email: data.email,
            name: data.name,
            role: data.role,
        });
        user.setPassword(data.password);
        const savedUser = await this.userRepository.save(user);
        const token = this.generateToken(savedUser);
        return {
            token,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                name: savedUser.name,
                role: savedUser.role,
            },
        };
    }
    async login(data) {
        if (!this.userRepository) {
            throw new Error("Database not available");
        }
        const user = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (!user || !user.validatePassword(data.password)) {
            throw new Error("Invalid credentials");
        }
        const token = this.generateToken(user);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async validateToken(token) {
        if (!this.userRepository) {
            return null;
        }
        try {
            const decoded = jwt.verify(token, process.env["JWT_SECRET"] || "default-secret");
            const user = await this.userRepository.findOne({
                where: { id: decoded.userId },
            });
            return user;
        }
        catch (error) {
            return null;
        }
    }
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        return jwt.sign(payload, process.env["JWT_SECRET"] || "default-secret", {
            expiresIn: "24h",
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map