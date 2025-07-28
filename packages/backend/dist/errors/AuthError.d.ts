import { AppError } from "./AppError";
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string, requiredRoles?: string[], userRole?: string);
}
export declare class InvalidCredentialsError extends AppError {
    constructor(message?: string);
}
export declare class UserAlreadyExistsError extends AppError {
    constructor(message?: string);
}
export declare class InvalidTokenError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=AuthError.d.ts.map