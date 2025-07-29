import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errorHandler";
import { AppError, AuthenticationError, AuthorizationError, ValidationError, InvalidCharacterIdError } from "../errors";

describe("ErrorHandler", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      url: "/api/test",
      method: "GET",
      ip: "127.0.0.1",
      get: vi.fn().mockReturnValue("test-user-agent"),
      path: "/api/test",
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    mockNext = vi.fn() as any;
    vi.clearAllMocks();
  });

  it("should handle AppError instances correctly", async (): Promise<void> => {
    const error = new AuthenticationError("Custom auth error");

    whenErrorHandlerIsCalled(error);

    thenErrorResponseIsSent(401, "Custom auth error");
  });

  it("should handle ValidationError with field details", async (): Promise<void> => {
    const error = new ValidationError("Invalid field", "email", "invalid-email");

    whenErrorHandlerIsCalled(error);

    thenErrorResponseIsSent(400, "Invalid field");
    thenErrorResponseIncludesDetails();
  });

  it("should handle generic Error instances as 500", async (): Promise<void> => {
    const error = new Error("Generic error");

    whenErrorHandlerIsCalled(error);

    thenErrorResponseIsSent(500, "Internal server error");
  });

  it("should include timestamp and path in error response", async (): Promise<void> => {
    const error = new InvalidCharacterIdError();

    whenErrorHandlerIsCalled(error);

    thenErrorResponseIncludesMetadata();
  });

  it("should handle AuthorizationError with role details", async (): Promise<void> => {
    const error = new AuthorizationError("Access denied", ["admin"], "user");

    whenErrorHandlerIsCalled(error);

    thenErrorResponseIsSent(403, "Access denied. Required roles: admin. User role: user");
  });

  function whenErrorHandlerIsCalled(error: Error): void {
    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);
  }

  function thenErrorResponseIsSent(statusCode: number, message: string): void {
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: message,
        statusCode,
        timestamp: expect.any(String),
        path: "/api/test",
        method: "GET",
      })
    );
  }

  function thenErrorResponseIncludesDetails(): void {
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        details: {
          field: "email",
          value: "invalid-email",
        },
      })
    );
  }

  function thenErrorResponseIncludesMetadata(): void {
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        timestamp: expect.any(String),
        path: "/api/test",
        method: "GET",
      })
    );
  }
});
