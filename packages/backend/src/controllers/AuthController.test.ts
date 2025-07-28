import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response } from "express";
import { AuthController } from "./AuthController";
import { AuthService } from "../services/auth/AuthService";
import { UserRole } from "@rick-morty-app/libs";

// Mock the AuthService
const mockAuthService = {
  register: vi.fn(),
  login: vi.fn(),
};

vi.mock("../services/auth/AuthService", () => ({
  AuthService: vi.fn().mockImplementation(() => mockAuthService),
}));

describe("AuthController", () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: any;

  beforeEach(() => {
    authController = new AuthController();
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  it("should register a new user successfully", async (): Promise<void> => {
    const registerData = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
      role: UserRole.FAN,
    };

    const expectedResponse = {
      token: "jwt-token",
      user: {
        id: "user-id",
        email: "test@example.com",
        name: "Test User",
        role: UserRole.FAN,
      },
    };

    givenValidRegisterRequest(registerData);
    givenAuthServiceReturnsSuccess(expectedResponse);

    await whenRegisterIsCalled();

    thenResponseIsSuccessful(expectedResponse);
  });

  it("should handle registration errors", async (): Promise<void> => {
    const registerData = {
      email: "existing@example.com",
      password: "password123",
      name: "Existing User",
      role: UserRole.FAN,
    };

    givenValidRegisterRequest(registerData);
    givenAuthServiceThrowsError("User already exists");

    await expect(whenRegisterIsCalled()).rejects.toThrow("User already exists");
  });

  it("should login user successfully", async (): Promise<void> => {
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    const expectedResponse = {
      token: "jwt-token",
      user: {
        id: "user-id",
        email: "test@example.com",
        name: "Test User",
        role: UserRole.FAN,
      },
    };

    givenValidLoginRequest(loginData);
    givenAuthServiceReturnsSuccess(expectedResponse);

    await whenLoginIsCalled();

    thenLoginIsSuccessful(expectedResponse);
  });

  it("should handle login errors", async (): Promise<void> => {
    const loginData = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    givenValidLoginRequest(loginData);
    givenAuthServiceThrowsError("Invalid credentials");

    await expect(whenLoginIsCalled()).rejects.toThrow("Invalid credentials");
  });

  // Given functions
  function givenValidRegisterRequest(data: any): void {
    mockRequest.body = data;
  }

  function givenValidLoginRequest(data: any): void {
    mockRequest.body = data;
  }

  function givenAuthServiceReturnsSuccess(response: any): void {
    mockAuthService.register.mockResolvedValue(response);
    mockAuthService.login.mockResolvedValue(response);
  }

  function givenAuthServiceThrowsError(message: string): void {
    mockAuthService.register.mockRejectedValue(new Error(message));
    mockAuthService.login.mockRejectedValue(new Error(message));
  }

  // When functions
  async function whenRegisterIsCalled(): Promise<void> {
    await authController.register(mockRequest as Request, mockResponse as Response, mockNext);
  }

  async function whenLoginIsCalled(): Promise<void> {
    await authController.login(mockRequest as Request, mockResponse as Response, mockNext);
  }

  // Then functions
  function thenResponseIsSuccessful(expectedResponse: any): void {
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  }

  function thenLoginIsSuccessful(expectedResponse: any): void {
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse);
  }

  function thenErrorIsHandled(statusCode: number, message: string): void {
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: message });
  }
});
