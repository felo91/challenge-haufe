"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorHandler = exports.errorHandler = void 0;
const errors_1 = require("../errors");
const logger_1 = require("../config/logger");
const errorHandler = (error, req, res, _next) => {
    let statusCode = 500;
    let message = "Internal server error";
    let details = undefined;
    if (error instanceof errors_1.AppError) {
        statusCode = error.statusCode;
        message = error.message;
        if ("field" in error && error.field) {
            details = { field: error.field, value: error.value };
        }
    }
    if (statusCode >= 500) {
        logger_1.logger.error({
            error: error.message,
            stack: error.stack,
            url: req.url,
            method: req.method,
            ip: req.ip,
            userAgent: req.get("User-Agent"),
            userId: req.user?.id || "anonymous",
        }, "🚨 Server error occurred");
    }
    else {
        logger_1.logger.warn({
            error: error.message,
            url: req.url,
            method: req.method,
            ip: req.ip,
            userId: req.user?.id || "anonymous",
        }, "⚠️ Client error occurred");
    }
    const errorResponse = {
        error: message,
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
    };
    if (details) {
        errorResponse.details = details;
    }
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
const asyncErrorHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncErrorHandler = asyncErrorHandler;
//# sourceMappingURL=errorHandler.js.map