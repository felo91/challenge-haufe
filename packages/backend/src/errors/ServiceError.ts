import { AppError } from "./AppError";

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, 500);
  }
}

export class DatabaseConnectionError extends AppError {
  constructor(message = "Database connection failed") {
    super(message, 503);
  }
}

export class DatabaseNotAvailableError extends AppError {
  constructor(message = "Database not available") {
    super(message, 503);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message = "User not found") {
    super(message, 404);
  }
}

export class CharacterNotFoundError extends AppError {
  constructor(message = "Character not found") {
    super(message, 404);
  }
}

export class ExternalApiError extends AppError {
  constructor(message = "External API request failed") {
    super(message, 502);
  }
}

export class CharacterFetchError extends AppError {
  constructor(message = "Failed to fetch characters") {
    super(message, 502);
  }
}

export class SingleCharacterFetchError extends AppError {
  constructor(characterId: number) {
    super(`Failed to fetch character ${characterId}`, 502);
  }
}

export class CacheError extends AppError {
  constructor(message = "Cache operation failed") {
    super(message, 500);
  }
}

export class FavoriteCharacterError extends AppError {
  constructor(message = "Failed to manage favorite character") {
    super(message, 500);
  }
}

export class InvalidCharacterIdError extends AppError {
  constructor(message = "Invalid character ID") {
    super(message, 400);
  }
}
