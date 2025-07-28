"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = exports.UserAlreadyExistsError = exports.InvalidCredentialsError = exports.AuthorizationError = exports.AuthenticationError = void 0;
const AppError_1 = require("./AppError");
class AuthenticationError extends AppError_1.AppError {
    constructor(message = "Authentication required") {
        super(message, 401);
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends AppError_1.AppError {
    constructor(message = "Insufficient permissions", requiredRoles, userRole) {
        const errorMessage = requiredRoles && userRole
            ? `${message}. Required roles: ${requiredRoles.join(", ")}. User role: ${userRole}`
            : message;
        super(errorMessage, 403);
    }
}
exports.AuthorizationError = AuthorizationError;
class InvalidCredentialsError extends AppError_1.AppError {
    constructor(message = "Invalid credentials") {
        super(message, 401);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class UserAlreadyExistsError extends AppError_1.AppError {
    constructor(message = "User already exists") {
        super(message, 409);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class InvalidTokenError extends AppError_1.AppError {
    constructor(message = "Invalid or expired token") {
        super(message, 401);
    }
}
exports.InvalidTokenError = InvalidTokenError;
//# sourceMappingURL=AuthError.js.map