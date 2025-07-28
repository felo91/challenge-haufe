import { AppError } from "./AppError";
export declare class DatabaseError extends AppError {
    constructor(message?: string);
}
export declare class DatabaseConnectionError extends AppError {
    constructor(message?: string);
}
export declare class UserNotFoundError extends AppError {
    constructor(message?: string);
}
export declare class CharacterNotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ExternalApiError extends AppError {
    constructor(message?: string);
}
export declare class CacheError extends AppError {
    constructor(message?: string);
}
export declare class FavoriteCharacterError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=ServiceError.d.ts.map