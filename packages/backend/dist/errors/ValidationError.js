"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSearchQueryError = exports.MissingRequiredFieldError = exports.InvalidCharacterIdError = exports.ValidationError = void 0;
const AppError_1 = require("./AppError");
class ValidationError extends AppError_1.AppError {
    constructor(message, field, value) {
        super(message, 400);
        if (field)
            this.field = field;
        if (value !== undefined)
            this.value = value;
    }
}
exports.ValidationError = ValidationError;
class InvalidCharacterIdError extends AppError_1.AppError {
    constructor(message = "Invalid character ID") {
        super(message, 400);
    }
}
exports.InvalidCharacterIdError = InvalidCharacterIdError;
class MissingRequiredFieldError extends AppError_1.AppError {
    constructor(field) {
        super(`Missing required field: ${field}`, 400);
    }
}
exports.MissingRequiredFieldError = MissingRequiredFieldError;
class InvalidSearchQueryError extends AppError_1.AppError {
    constructor(message = "Search query is required") {
        super(message, 400);
    }
}
exports.InvalidSearchQueryError = InvalidSearchQueryError;
//# sourceMappingURL=ValidationError.js.map