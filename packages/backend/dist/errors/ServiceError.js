"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteCharacterError = exports.CacheError = exports.ExternalApiError = exports.CharacterNotFoundError = exports.UserNotFoundError = exports.DatabaseConnectionError = exports.DatabaseError = void 0;
const AppError_1 = require("./AppError");
class DatabaseError extends AppError_1.AppError {
    constructor(message = "Database operation failed") {
        super(message, 500, false);
    }
}
exports.DatabaseError = DatabaseError;
class DatabaseConnectionError extends AppError_1.AppError {
    constructor(message = "Database connection failed") {
        super(message, 503, false);
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
class UserNotFoundError extends AppError_1.AppError {
    constructor(message = "User not found") {
        super(message, 404);
    }
}
exports.UserNotFoundError = UserNotFoundError;
class CharacterNotFoundError extends AppError_1.AppError {
    constructor(message = "Character not found") {
        super(message, 404);
    }
}
exports.CharacterNotFoundError = CharacterNotFoundError;
class ExternalApiError extends AppError_1.AppError {
    constructor(message = "External API request failed") {
        super(message, 502, false);
    }
}
exports.ExternalApiError = ExternalApiError;
class CacheError extends AppError_1.AppError {
    constructor(message = "Cache operation failed") {
        super(message, 500, false);
    }
}
exports.CacheError = CacheError;
class FavoriteCharacterError extends AppError_1.AppError {
    constructor(message = "Failed to manage favorite character") {
        super(message, 400);
    }
}
exports.FavoriteCharacterError = FavoriteCharacterError;
//# sourceMappingURL=ServiceError.js.map