"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map