import { AppError } from "./AppError";

export class ValidationError extends AppError {
  public readonly field?: string;
  public readonly value?: any;

  constructor(message: string, field?: string, value?: any) {
    super(message, 400);
    if (field) this.field = field;
    if (value !== undefined) this.value = value;
  }
}

export class InvalidCharacterIdError extends AppError {
  constructor(message = "Invalid character ID") {
    super(message, 400);
  }
}

export class MissingRequiredFieldError extends AppError {
  constructor(field: string) {
    super(`Missing required field: ${field}`, 400);
  }
}

export class InvalidSearchQueryError extends AppError {
  constructor(message = "Search query is required") {
    super(message, 400);
  }
}
