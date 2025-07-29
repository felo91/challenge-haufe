"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCharacterIdError = exports.FavoriteCharacterError = exports.CacheError = exports.SingleCharacterFetchError = exports.CharacterFetchError = exports.ExternalApiError = exports.CharacterNotFoundError = exports.UserNotFoundError = exports.DatabaseNotAvailableError = exports.DatabaseConnectionError = exports.DatabaseError = void 0;
const AppError_1 = require("./AppError");
class DatabaseError extends AppError_1.AppError {
    constructor(message = "Database operation failed") {
        super(message, 500);
    }
}
exports.DatabaseError = DatabaseError;
class DatabaseConnectionError extends AppError_1.AppError {
    constructor(message = "Database connection failed") {
        super(message, 503);
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
class DatabaseNotAvailableError extends AppError_1.AppError {
    constructor(message = "Database not available") {
        super(message, 503);
    }
}
exports.DatabaseNotAvailableError = DatabaseNotAvailableError;
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
        super(message, 502);
    }
}
exports.ExternalApiError = ExternalApiError;
class CharacterFetchError extends AppError_1.AppError {
    constructor(message = "Failed to fetch characters") {
        super(message, 502);
    }
}
exports.CharacterFetchError = CharacterFetchError;
class SingleCharacterFetchError extends AppError_1.AppError {
    constructor(characterId) {
        super(`Failed to fetch character ${characterId}`, 502);
    }
}
exports.SingleCharacterFetchError = SingleCharacterFetchError;
class CacheError extends AppError_1.AppError {
    constructor(message = "Cache operation failed") {
        super(message, 500);
    }
}
exports.CacheError = CacheError;
class FavoriteCharacterError extends AppError_1.AppError {
    constructor(message = "Failed to manage favorite character") {
        super(message, 500);
    }
}
exports.FavoriteCharacterError = FavoriteCharacterError;
class InvalidCharacterIdError extends AppError_1.AppError {
    constructor(message = "Invalid character ID") {
        super(message, 400);
    }
}
exports.InvalidCharacterIdError = InvalidCharacterIdError;
//# sourceMappingURL=ServiceError.js.map