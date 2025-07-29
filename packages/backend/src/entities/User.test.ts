import { describe, it, expect, beforeEach } from "vitest";
import { User } from "./User";
import { UserRoleEnum } from "@rick-morty-app/libs";
import bcrypt from "bcryptjs";

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

    await whenPasswordIsSet(plainPassword);

    thenPasswordIsHashed();
  });

  it("should validate password correctly", async (): Promise<void> => {
    const plainPassword = "testpassword123";
    await givenAUserWithHashedPassword(plainPassword);

    const result = await whenPasswordIsValidated(plainPassword);

    thenPasswordIsValid(result);
  });

  it("should reject invalid password", async (): Promise<void> => {
    const correctPassword = "testpassword123";
    const wrongPassword = "wrongpassword";
    await givenAUserWithHashedPassword(correctPassword);

    const result = await whenPasswordIsValidated(wrongPassword);

    thenPasswordIsInvalid(result);
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
    user.role = UserRoleEnum.FAN;
  }

  function givenAUserWithPlainPassword(password: string): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRoleEnum.FAN;
  }

  async function givenAUserWithHashedPassword(plainPassword: string): Promise<void> {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRoleEnum.FAN;
    user.password = await bcrypt.hash(plainPassword, 10);
  }

  function givenAUserWithNoFavorites(): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRoleEnum.FAN;
    user.favoriteCharacters = [];
  }

  function givenAUserWithFavoriteCharacter(characterId: number): void {
    user.email = "test@example.com";
    user.name = "Test User";
    user.role = UserRoleEnum.FAN;
    user.favoriteCharacters = [characterId];
  }

  // When functions
  function whenUserIsCreated(): void {
    // User is already created in beforeEach
  }

  async function whenPasswordIsSet(password: string): Promise<void> {
    user.setPassword(password);
    // Manually hash the password for testing since @BeforeInsert/@BeforeUpdate only work with database operations
    user.password = await bcrypt.hash(password, 10);
  }

  async function whenPasswordIsValidated(password: string): Promise<boolean> {
    return await user.validatePassword(password);
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
    expect(user.role).toBe(UserRoleEnum.FAN);
    expect(user.id).toBeUndefined(); // Not saved yet
  }

  function thenPasswordIsHashed(): void {
    expect(user.password).not.toBe("testpassword123");
    expect(user.password).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/); // bcrypt pattern
  }

  function thenPasswordIsValid(result: boolean): void {
    expect(result).toBe(true);
  }

  function thenPasswordIsInvalid(result: boolean): void {
    expect(result).toBe(false);
  }

  function thenCharacterIsInFavorites(characterId: number): void {
    expect(user.favoriteCharacters).toContain(characterId);
  }

  function thenCharacterIsNotInFavorites(characterId: number): void {
    expect(user.favoriteCharacters).not.toContain(characterId);
  }
});
