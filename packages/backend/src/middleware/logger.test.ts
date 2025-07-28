import { describe, it, expect, beforeEach, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { loggerMiddleware, LoggedRequest } from "./logger";

// Mock the logger
vi.mock("../config/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("LoggerMiddleware", () => {
  let mockRequest: Partial<LoggedRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockLogger: any;

  beforeEach(async () => {
    mockRequest = {
      method: "GET",
      url: "/api/test",
      get: vi.fn().mockReturnValue("test-user-agent"),
      ip: "127.0.0.1",
      connection: {
        remoteAddress: "127.0.0.1",
      } as any,
      headers: {}, // Added for requestId
    };

    mockResponse = {
      statusCode: 200,
      get: vi.fn().mockReturnValue("1024"),
      end: vi.fn() as any,
    };

    mockNext = vi.fn() as any;

    // Get the mocked logger
    const loggerModule = await import("../config/logger");
    mockLogger = loggerModule.logger;

    vi.clearAllMocks();
  });

  it("should log incoming request", async (): Promise<void> => {
    givenAValidRequest();
    givenAValidResponse();

    whenMiddlewareIsCalled();

    thenRequestIsLogged();
    thenNextIsCalled();
  });

  it("should log response when request completes", async (): Promise<void> => {
    givenAValidRequest();
    givenAValidResponse();

    whenMiddlewareIsCalled();
    whenResponseEnds();

    thenResponseIsLogged();
  });

  it("should log request duration", async (): Promise<void> => {
    givenAValidRequest();
    givenAValidResponse();

    whenMiddlewareIsCalled();
    whenResponseEnds();

    thenDurationIsLogged();
  });

  it("should log user ID when available", async (): Promise<void> => {
    givenARequestWithUser();
    givenAValidResponse();

    whenMiddlewareIsCalled();

    thenUserIdIsLogged();
  });

  it("should log anonymous when no user", async (): Promise<void> => {
    givenAValidRequest();
    givenAValidResponse();

    whenMiddlewareIsCalled();

    thenAnonymousUserIsLogged();
  });

  // Given functions
  function givenAValidRequest(): void {
    // Request is already set up in beforeEach
  }

  function givenARequestWithUser(): void {
    (mockRequest as any).user = { id: "user-123", email: "test@example.com" };
  }

  function givenAValidResponse(): void {
    // Response is already set up in beforeEach
  }

  // When functions
  function whenMiddlewareIsCalled(): void {
    loggerMiddleware(mockRequest as LoggedRequest, mockResponse as Response, mockNext);
  }

  function whenResponseEnds(): void {
    // Simulate response end
    const originalEnd = mockResponse.end;
    if (originalEnd && typeof originalEnd === "function") {
      originalEnd();
    }
  }

  // Then functions
  function thenRequestIsLogged(): void {
    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "request",
        method: "GET",
        url: "/api/test",
        userAgent: "test-user-agent",
        ip: "127.0.0.1",
      }),
      "📥 GET /api/test"
    );
  }

  function thenResponseIsLogged(): void {
    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "response",
        method: "GET",
        url: "/api/test",
        statusCode: 200,
        contentLength: "1024",
      }),
      expect.stringMatching(/^✅ GET \/api\/test - 200 \(\d+ms\)$/)
    );
  }

  function thenDurationIsLogged(): void {
    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        duration: expect.stringMatching(/^\d+ms$/),
      }),
      expect.stringMatching(/^✅ GET \/api\/test - 200 \(\d+ms\)$/)
    );
  }

  function thenUserIdIsLogged(): void {
    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-123",
      }),
      "📥 GET /api/test"
    );
  }

  function thenAnonymousUserIsLogged(): void {
    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "anonymous",
      }),
      "📥 GET /api/test"
    );
  }

  function thenNextIsCalled(): void {
    expect(mockNext).toHaveBeenCalled();
  }
});
