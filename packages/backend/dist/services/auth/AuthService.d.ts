import { User } from "../../entities/User";
import { RegisterRequest, LoginRequest, AuthResponse } from "@rick-morty-app/libs";
export declare class AuthService {
    private userRepository;
    constructor();
    register(data: RegisterRequest): Promise<AuthResponse>;
    login(data: LoginRequest): Promise<AuthResponse>;
    validateToken(token: string): Promise<User | null>;
    private generateToken;
}
//# sourceMappingURL=AuthService.d.ts.map