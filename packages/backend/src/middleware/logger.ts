import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export interface LoggedRequest extends Request {
  startTime?: number;
}

export const loggerMiddleware = (req: LoggedRequest, res: Response, next: NextFunction): void => {
  // Add start time to request
  req.startTime = Date.now();

  // Log the incoming request
  logger.info(
    {
      type: "request",
      method: req.method,
      url: req.url,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
      userId: (req as any).user?.id || "anonymous",
    },
    "Incoming request"
  );

  // Override res.end to log the response
  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any): Response {
    const duration = Date.now() - (req.startTime || 0);

    logger.info(
      {
        type: "response",
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        contentLength: res.get("Content-Length") || 0,
        userId: (req as any).user?.id || "anonymous",
      },
      "Request completed"
    );

    // Call the original end method
    return originalEnd.call(this, chunk, encoding);
  };

  next();
};
