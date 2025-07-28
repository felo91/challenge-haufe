import { AppError } from "./AppError";
export declare class ValidationError extends AppError {
    readonly field?: string;
    readonly value?: any;
    constructor(message: string, field?: string, value?: any);
}
export declare class InvalidCharacterIdError extends AppError {
    constructor(message?: string);
}
export declare class MissingRequiredFieldError extends AppError {
    constructor(field: string);
}
export declare class InvalidSearchQueryError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=ValidationError.d.ts.map