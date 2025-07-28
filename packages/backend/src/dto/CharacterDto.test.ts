import { describe, it, expect, beforeEach } from "vitest";
import { CharacterDto } from "./CharacterDto";
import { Character } from "@rick-morty-app/libs";
import { User } from "../entities/User";
import { UserRole } from "@rick-morty-app/libs";

describe("CharacterDto", () => {
  let mockCharacter: Character;
  let mockUser: User;

  beforeEach(() => {
    mockCharacter = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "Human",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    };

    mockUser = new User();
    mockUser.id = "user-123";
    mockUser.email = "test@example.com";
    mockUser.name = "Test User";
    mockUser.role = UserRole.FAN;
    mockUser.favoriteCharacters = [1, 3, 5];
  });

  it("should transform character to basic information", async (): Promise<void> => {
    givenACompleteCharacter();

    const result = whenCharacterIsTransformedToBasicInfo();

    thenBasicInfoContainsOnlyRequiredFields(result);
  });

  it("should transform character to full information", async (): Promise<void> => {
    givenACompleteCharacter();

    const result = whenCharacterIsTransformedToFullInfo();

    thenFullInfoContainsAllFields(result);
  });

  it("should transform character list to basic list response", async (): Promise<void> => {
    givenACompleteCharacter();
    const mockInfo = { count: 1, pages: 1, next: null, prev: null };

    const result = whenCharacterListIsTransformedToBasicList(mockInfo);

    thenBasicListResponseIsCorrect(result, mockInfo);
  });

  it("should exclude additional fields from basic information", async (): Promise<void> => {
    givenACompleteCharacter();

    const result = whenCharacterIsTransformedToBasicInfo();

    thenAdditionalFieldsAreExcluded(result);
  });

  it("should mark character as favorite when user has it in favorites", async (): Promise<void> => {
    givenACompleteCharacter();
    givenUserHasCharacterAsFavorite();

    const result = whenCharacterIsTransformedToBasicInfoWithUser();

    thenCharacterIsMarkedAsFavorite(result);
  });

  it("should mark character as not favorite when user doesn't have it in favorites", async (): Promise<void> => {
    givenACompleteCharacter();
    givenUserDoesNotHaveCharacterAsFavorite();

    const result = whenCharacterIsTransformedToBasicInfoWithUser();

    thenCharacterIsNotMarkedAsFavorite(result);
  });

  it("should mark character as not favorite when no user is provided", async (): Promise<void> => {
    givenACompleteCharacter();

    const result = whenCharacterIsTransformedToBasicInfoWithoutUser();

    thenCharacterIsNotMarkedAsFavorite(result);
  });

  // Given functions
  function givenACompleteCharacter(): void {
    // Character is already set up in beforeEach
  }

  function givenUserHasCharacterAsFavorite(): void {
    mockUser.favoriteCharacters = [1, 3, 5]; // Character ID 1 is in favorites
  }

  function givenUserDoesNotHaveCharacterAsFavorite(): void {
    mockUser.favoriteCharacters = [2, 3, 5]; // Character ID 1 is NOT in favorites
  }

  // When functions
  function whenCharacterIsTransformedToBasicInfo() {
    return CharacterDto.toBasicInformation(mockCharacter);
  }

  function whenCharacterIsTransformedToFullInfo() {
    return CharacterDto.toCharacterInformation(mockCharacter);
  }

  function whenCharacterListIsTransformedToBasicList(info: any) {
    return CharacterDto.toCharacterListWithFavorite([mockCharacter], info);
  }

  function whenCharacterIsTransformedToBasicInfoWithUser() {
    return CharacterDto.toBasicInformation(mockCharacter, mockUser);
  }

  function whenCharacterIsTransformedToBasicInfoWithoutUser() {
    return CharacterDto.toBasicInformation(mockCharacter);
  }

  // Then functions
  function thenBasicInfoContainsOnlyRequiredFields(result: any): void {
    expect(result).toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "Human",
      gender: "Male",
      isFavorite: false,
    });
  }

  function thenFullInfoContainsAllFields(result: any): void {
    expect(result).toEqual(mockCharacter);
  }

  function thenBasicListResponseIsCorrect(result: any, info: any): void {
    expect(result).toEqual({
      info,
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "Human",
          gender: "Male",
          isFavorite: false,
        },
      ],
    });
  }

  function thenAdditionalFieldsAreExcluded(result: any): void {
    expect(result).not.toHaveProperty("origin");
    expect(result).not.toHaveProperty("location");
    expect(result).not.toHaveProperty("image");
    expect(result).not.toHaveProperty("episode");
    expect(result).not.toHaveProperty("url");
    expect(result).not.toHaveProperty("created");
  }

  function thenCharacterIsMarkedAsFavorite(result: any): void {
    expect(result.isFavorite).toBe(true);
  }

  function thenCharacterIsNotMarkedAsFavorite(result: any): void {
    expect(result.isFavorite).toBe(false);
  }
});
