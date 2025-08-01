import { describe, it, expect, beforeEach, vi } from "vitest";
import { Response, NextFunction } from "express";
import { requireRole, requireProductOwner, requireFan, requireAnyRole } from "./roleAuth";
import { AuthenticatedRequest } from "./auth";
import { UserRoleEnum } from "@rick-morty-app/libs";

describe("RoleAuthMiddleware", () => {
  let mockRequest: Partial<AuthenticatedRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn() as any;
    vi.clearAllMocks();
  });

  it("should allow access for product owner role", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.PRODUCT_OWNER);

    whenProductOwnerMiddlewareIsCalled();

    thenAccessIsGranted();
  });

  it("should deny access for fan role when product owner required", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.FAN);

    expect(() => whenProductOwnerMiddlewareIsCalled()).toThrow("Insufficient permissions");
  });

  it("should deny access when no user is authenticated", async (): Promise<void> => {
    givenNoUser();

    expect(() => whenProductOwnerMiddlewareIsCalled()).toThrow("Authentication required");
  });

  it("should allow access for any role with requireAnyRole", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.FAN);

    whenAnyRoleMiddlewareIsCalled();

    thenAccessIsGranted();
  });

  it("should allow access for product owner with requireAnyRole", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.PRODUCT_OWNER);

    whenAnyRoleMiddlewareIsCalled();

    thenAccessIsGranted();
  });

  it("should allow access for fan role with requireFan", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.FAN);

    whenFanMiddlewareIsCalled();

    thenAccessIsGranted();
  });

  it("should deny access for product owner when fan role required", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.PRODUCT_OWNER);

    expect(() => whenFanMiddlewareIsCalled()).toThrow("Insufficient permissions");
  });

  it("should allow access with custom role requirement", async (): Promise<void> => {
    givenUserWithRole(UserRoleEnum.FAN);

    whenCustomRoleMiddlewareIsCalled([UserRoleEnum.FAN, UserRoleEnum.PRODUCT_OWNER]);

    thenAccessIsGranted();
  });

  function givenUserWithRole(role: string): void {
    mockRequest.user = {
      id: "user-123",
      email: "test@example.com",
      name: "Test User",
      role: role,
    } as any;
  }

  function givenNoUser(): void {
    mockRequest.user = undefined;
  }

  function whenProductOwnerMiddlewareIsCalled(): void {
    requireProductOwner(mockRequest as AuthenticatedRequest, mockResponse as Response, mockNext);
  }

  function whenFanMiddlewareIsCalled(): void {
    requireFan(mockRequest as AuthenticatedRequest, mockResponse as Response, mockNext);
  }

  function whenAnyRoleMiddlewareIsCalled(): void {
    requireAnyRole(mockRequest as AuthenticatedRequest, mockResponse as Response, mockNext);
  }

  function whenCustomRoleMiddlewareIsCalled(allowedRoles: string[]): void {
    requireRole(allowedRoles)(mockRequest as AuthenticatedRequest, mockResponse as Response, mockNext);
  }

  function thenAccessIsGranted(): void {
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  }

  function thenAccessIsDenied(statusCode: number): void {
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    expect(mockResponse.json).toHaveBeenCalled();
  }

  function thenErrorIncludesRequiredRoles(requiredRoles: string[]): void {
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Insufficient permissions",
        requiredRoles: requiredRoles,
        userRole: mockRequest.user?.role,
      })
    );
  }
});
