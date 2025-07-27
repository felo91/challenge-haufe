import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { AppDataSource } from "../../config/database";
import { RegisterRequest, LoginRequest, AuthResponse } from "@rick-morty-app/libs";

export class AuthService {
  private userRepository: Repository<User> | null;

  constructor() {
    try {
      this.userRepository = AppDataSource.getRepository(User);
    } catch (error) {
      console.log("Database not available, using mock repository");
      this.userRepository = null as any;
    }
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
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

  async login(data: LoginRequest): Promise<AuthResponse> {
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

  async validateToken(token: string): Promise<User | null> {
    if (!this.userRepository) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, process.env["JWT_SECRET"] || "default-secret") as any;
      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  private generateToken(user: User): string {
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
