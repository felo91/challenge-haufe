"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_1 = require("../config/logger");
const loggerMiddleware = (req, res, next) => {
    req.startTime = Date.now();
    logger_1.logger.info({
        type: "request",
        method: req.method,
        url: req.url,
        userAgent: req.get("User-Agent"),
        ip: req.ip || req.connection.remoteAddress,
        userId: req.user?.id || "anonymous",
        requestId: req.headers["x-request-id"] || `req-${Date.now()}`,
    }, `📥 ${req.method} ${req.url}`);
    const originalEnd = res.end;
    res.end = function (chunk, encoding) {
        const duration = Date.now() - (req.startTime || 0);
        const statusEmoji = res.statusCode < 400 ? "✅" : res.statusCode < 500 ? "⚠️" : "❌";
        logger_1.logger.info({
            type: "response",
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            contentLength: res.get("Content-Length") || 0,
            userId: req.user?.id || "anonymous",
            requestId: req.headers["x-request-id"] || `req-${Date.now()}`,
        }, `${statusEmoji} ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
        return originalEnd.call(this, chunk, encoding);
    };
    next();
};
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.js.map