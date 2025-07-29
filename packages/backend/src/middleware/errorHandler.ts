import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { logger } from "../config/logger";

export interface ErrorResponse {
  error: string;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  details?: any;
}

export const errorHandler = (error: Error | AppError, req: Request, res: Response, _next: NextFunction): void => {
  let statusCode = 500;
  let message = "Internal server error";
  let details: any = undefined;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;

    // Add additional details for validation errors
    if ("field" in error && error.field) {
      details = { field: error.field, value: (error as any).value };
    }
  }

  if (statusCode >= 500) {
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        userId: (req as any).user?.id || "anonymous",
      },
      "🚨 Server error occurred"
    );
  } else {
    logger.warn(
      {
        error: error.message,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userId: (req as any).user?.id || "anonymous",
      },
      "⚠️ Client error occurred"
    );
  }

  const errorResponse: ErrorResponse = {
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  };

  if (details) errorResponse.details = details;

  res.status(statusCode).json(errorResponse);
};

export const asyncErrorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
