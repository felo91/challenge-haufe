import { AppError } from "./AppError";

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions", requiredRoles?: string[], userRole?: string) {
    const errorMessage =
      requiredRoles && userRole
        ? `${message}. Required roles: ${requiredRoles.join(", ")}. User role: ${userRole}`
        : message;
    super(errorMessage, 403);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = "Invalid credentials") {
    super(message, 401);
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(message = "User already exists") {
    super(message, 409);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message = "Invalid or expired token") {
    super(message, 401);
  }
}
