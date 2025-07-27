import { describe, it, expect, beforeEach, vi } from "vitest";
import { UserService } from "./UserService";
import { User } from "../../entities/User";
import { UserRole } from "@rick-morty-app/libs";

// Mock the database repository
const mockUserRepository = {
  save: vi.fn(),
  findOne: vi.fn(),
};

vi.mock("../../config/database", () => ({
  AppDataSource: {
    getRepository: () => mockUserRepository,
  },
}));

describe("UserService", () => {
  let userService: UserService;
  let testUser: User;

  beforeEach(() => {
    userService = new UserService();
    testUser = new User();
    testUser.id = "test-id";
    testUser.email = "test@example.com";
    testUser.name = "Test User";
    testUser.role = UserRole.FAN;
    testUser.favoriteCharacters = [1, 2, 3];

    vi.clearAllMocks();
  });

  it("should save user successfully", async (): Promise<void> => {
    givenUserWillBeSaved(testUser);

    const result = await whenUserIsSaved(testUser);

    thenUserIsSaved(result);
  });

  it("should find user by ID", async (): Promise<void> => {
    const userId = "test-id";
    givenUserExists(userId);

    const result = await whenUserIsFoundById(userId);

    thenUserIsFound(result);
  });

  it("should find user by email", async (): Promise<void> => {
    const email = "test@example.com";
    givenUserExistsByEmail(email);

    const result = await whenUserIsFoundByEmail(email);

    thenUserIsFound(result);
  });

  it("should add favorite character", async (): Promise<void> => {
    const userId = "test-id";
    const characterId = 4;
    givenUserExists(userId);
    givenUserWillBeSaved(testUser);

    await whenFavoriteCharacterIsAdded(userId, characterId);

    thenCharacterIsAddedToFavorites(characterId);
  });

  it("should remove favorite character", async (): Promise<void> => {
    const userId = "test-id";
    const characterId = 2;
    givenUserExists(userId);
    givenUserWillBeSaved(testUser);

    await whenFavoriteCharacterIsRemoved(userId, characterId);

    thenCharacterIsRemovedFromFavorites(characterId);
  });

  it("should get favorite characters", async (): Promise<void> => {
    const userId = "test-id";
    givenUserExists(userId);

    const result = await whenFavoriteCharactersAreRetrieved(userId);

    thenFavoriteCharactersAreReturned(result);
  });

  it("should check if character is favorite", async (): Promise<void> => {
    const userId = "test-id";
    const characterId = 2;
    givenUserExists(userId);

    const result = await whenFavoriteCharacterIsChecked(userId, characterId);

    thenCharacterIsFavorite(result);
  });

  it("should return false for non-favorite character", async (): Promise<void> => {
    const userId = "test-id";
    const characterId = 999;
    givenUserExists(userId);

    const result = await whenFavoriteCharacterIsChecked(userId, characterId);

    thenCharacterIsNotFavorite(result);
  });

  // Given functions
  function givenUserWillBeSaved(user: User): void {
    mockUserRepository.save.mockResolvedValue(user);
  }

  function givenUserExists(userId: string): void {
    mockUserRepository.findOne.mockResolvedValue(testUser);
  }

  function givenUserExistsByEmail(email: string): void {
    mockUserRepository.findOne.mockResolvedValue(testUser);
  }

  // When functions
  async function whenUserIsSaved(user: User): Promise<User> {
    return userService.saveUser(user);
  }

  async function whenUserIsFoundById(userId: string): Promise<User | null> {
    return userService.findUserById(userId);
  }

  async function whenUserIsFoundByEmail(email: string): Promise<User | null> {
    return userService.findUserByEmail(email);
  }

  async function whenFavoriteCharacterIsAdded(
    userId: string,
    characterId: number
  ): Promise<void> {
    return userService.addFavoriteCharacter(userId, characterId);
  }

  async function whenFavoriteCharacterIsRemoved(
    userId: string,
    characterId: number
  ): Promise<void> {
    return userService.removeFavoriteCharacter(userId, characterId);
  }

  async function whenFavoriteCharactersAreRetrieved(
    userId: string
  ): Promise<number[]> {
    return userService.getFavoriteCharacters(userId);
  }

  async function whenFavoriteCharacterIsChecked(
    userId: string,
    characterId: number
  ): Promise<boolean> {
    return userService.isFavoriteCharacter(userId, characterId);
  }

  // Then functions
  function thenUserIsSaved(result: User): void {
    expect(result).toBe(testUser);
    expect(mockUserRepository.save).toHaveBeenCalledWith(testUser);
  }

  function thenUserIsFound(result: User | null): void {
    expect(result).toBe(testUser);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
  }

  function thenCharacterIsAddedToFavorites(characterId: number): void {
    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        favoriteCharacters: expect.arrayContaining([characterId]),
      })
    );
  }

  function thenCharacterIsRemovedFromFavorites(characterId: number): void {
    expect(mockUserRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        favoriteCharacters: expect.not.arrayContaining([characterId]),
      })
    );
  }

  function thenFavoriteCharactersAreReturned(result: number[]): void {
    expect(result).toEqual([1, 2, 3]);
  }

  function thenCharacterIsFavorite(result: boolean): void {
    expect(result).toBe(true);
  }

  function thenCharacterIsNotFavorite(result: boolean): void {
    expect(result).toBe(false);
  }
});
