import { describe, it, expect, beforeEach } from "vitest";
import { User } from "./User";
import { UserRole } from "@rick-morty-app/libs";

describe("User Entity", () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it("should create a user with valid properties", async (): Promise<void> => {
    givenAUserWithValidProperties();

    whenUserIsCreated();

    thenUserHasValidProperties();
  });

  it("should hash password when setting it", async (): Promise<void> => {
    const plainPassword = "testpassword123";
    givenAUserWithPlainPassword(plainPassword);

    whenPasswordIsSet(plainPassword);

    thenPasswordIsHashed();
  });

  it("should validate password correctly", async (): Promise<void> => {
    const plainPassword = "testpassword123";
    givenAUserWithHashedPassword(plainPassword);

    whenPasswordIsValidated(plainPassword);

    thenPasswordIsValid();
  });

  it("should reject invalid password", async (): Promise<void> => {
    const correctPassword = "testpassword123";
    const wrongPassword = "wrongpassword";
    givenAUserWithHashedPassword(correctPassword);

    whenPasswordIsValidated(wrongPassword);

    thenPasswordIsInvalid();
  });

  it("should add favorite character", async (): Promise<void> => {
    const characterId = 1;
    givenAUserWithNoFavorites();

    whenFavoriteCharacterIsAdded(characterId);

    thenCharacterIsInFavorites(characterId);
  });

  it("should remove favorite character", async (): Promise<void> => {
    const characterId = 1;
    givenAUserWithFavoriteCharacter(characterId);

    whenFavoriteCharacterIsRemoved(characterId);

    thenCharacterIsNotInFavorites(characterId);
  });

  // Given functions
  function givenAUserWithValidProperties(): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRole.FAN;
  }

  function givenAUserWithPlainPassword(password: string): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRole.FAN;
  }

  function givenAUserWithHashedPassword(plainPassword: string): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRole.FAN;
    user.setPassword(plainPassword);
  }

  function givenAUserWithNoFavorites(): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRole.FAN;
    user.favoriteCharacters = [];
  }

  function givenAUserWithFavoriteCharacter(characterId: number): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRole.FAN;
    user.favoriteCharacters = [characterId];
  }

  // When functions
  function whenUserIsCreated(): void {
    // User is already created in beforeEach
  }

  function whenPasswordIsSet(password: string): void {
    user.setPassword(password);
  }

  function whenPasswordIsValidated(password: string): void {
    user.validatePassword(password);
  }

  function whenFavoriteCharacterIsAdded(characterId: number): void {
    user.addFavoriteCharacter(characterId);
  }

  function whenFavoriteCharacterIsRemoved(characterId: number): void {
    user.removeFavoriteCharacter(characterId);
  }

  // Then functions
  function thenUserHasValidProperties(): void {
    expect(user.email).toBe("test@example.com");
    expect(user.name).toBe("Test User");
    expect(user.role).toBe(UserRole.FAN);
    expect(user.id).toBeUndefined(); // Not saved yet
  }

  function thenPasswordIsHashed(): void {
    expect(user.password).not.toBe("testpassword123");
    expect(user.password).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/); // bcrypt pattern
  }

  function thenPasswordIsValid(): void {
    expect(user.validatePassword("testpassword123")).toBe(true);
  }

  function thenPasswordIsInvalid(): void {
    expect(user.validatePassword("wrongpassword")).toBe(false);
  }

  function thenCharacterIsInFavorites(characterId: number): void {
    expect(user.favoriteCharacters).toContain(characterId);
  }

  function thenCharacterIsNotInFavorites(characterId: number): void {
    expect(user.favoriteCharacters).not.toContain(characterId);
  }
});
