import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export interface LoggedRequest extends Request {
  startTime?: number;
}

export const loggerMiddleware = (req: LoggedRequest, res: Response, next: NextFunction): void => {
  req.startTime = Date.now();

  logger.info(
    {
      type: "request",
      method: req.method,
      url: req.url,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
      userId: (req as any).user?.id || "anonymous",
      requestId: req.headers["x-request-id"] || `req-${Date.now()}`,
    },
    `📥 ${req.method} ${req.url}`
  );

  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any): Response {
    const duration = Date.now() - (req.startTime || 0);

    const statusEmoji = res.statusCode < 400 ? "✅" : res.statusCode < 500 ? "⚠️" : "❌";
    logger.info(
      {
        type: "response",
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        contentLength: res.get("Content-Length") || 0,
        userId: (req as any).user?.id || "anonymous",
        requestId: req.headers["x-request-id"] || `req-${Date.now()}`,
      },
      `${statusEmoji} ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`
    );

    return originalEnd.call(this, chunk, encoding);
  };

  next();
};
