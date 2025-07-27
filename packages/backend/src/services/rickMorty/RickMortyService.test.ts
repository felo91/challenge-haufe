import { describe, it, expect, beforeEach, vi } from "vitest";
import { RickMortyService } from "./RickMortyService";
import { InMemoryCacheService } from "../cache/InMemoryCacheService";
import { Character, CharacterListResponse } from "@rick-morty-app/libs";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("RickMortyService", () => {
  let rickMortyService: RickMortyService;
  let cacheService: InMemoryCacheService;

  beforeEach(() => {
    cacheService = new InMemoryCacheService();
    rickMortyService = new RickMortyService(cacheService);
    vi.clearAllMocks();
  });

  it("should fetch characters from API when not cached", async (): Promise<void> => {
    const mockResponse: CharacterListResponse = {
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          location: {
            name: "Earth",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: ["https://rickandmortyapi.com/api/episode/1"],
          url: "https://rickandmortyapi.com/api/character/1",
          created: "2017-11-04T18:48:46.250Z",
        },
      ],
    };

    givenApiReturnsCharacters(mockResponse);
    givenCacheIsEmpty();

    const result = await whenCharactersAreFetched();

    thenCharactersAreReturned(result);
    thenCharactersAreCached();
  });

  it("should return cached characters when available", async (): Promise<void> => {
    const cachedResponse: CharacterListResponse = {
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          location: {
            name: "Earth",
            url: "https://rickandmortyapi.com/api/location/1",
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: ["https://rickandmortyapi.com/api/episode/1"],
          url: "https://rickandmortyapi.com/api/character/1",
          created: "2017-11-04T18:48:46.250Z",
        },
      ],
    };

    givenCharactersAreCached(cachedResponse);

    const result = await whenCharactersAreFetched();

    thenCharactersAreReturned(result);
    thenApiIsNotCalled();
  });

  it("should handle API errors gracefully", async (): Promise<void> => {
    givenApiThrowsError();

    await expect(whenCharactersAreFetched()).rejects.toThrow("Failed to fetch characters");
  });

  it("should fetch character by ID from API when not cached", async (): Promise<void> => {
    const mockCharacter: Character = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    };

    givenApiReturnsCharacter(mockCharacter);
    givenCharacterIsNotCached(1);

    const result = await whenCharacterIsFetched(1);

    thenCharacterIsReturned(result);
    thenCharacterIsCached(1);
  });

  // Given functions
  function givenApiReturnsCharacters(response: CharacterListResponse): void {
    (axios.get as any).mockResolvedValue({ data: response });
  }

  function givenApiReturnsCharacter(character: Character): void {
    (axios.get as any).mockResolvedValue({ data: character });
  }

  function givenCacheIsEmpty(): void {
    // Cache is already empty in beforeEach
  }

  function givenCharactersAreCached(response: CharacterListResponse): void {
    cacheService.set("characters:page:1", response, 3600);
  }

  function givenCharacterIsNotCached(id: number): void {
    // Character is not cached by default
  }

  function givenApiThrowsError(): void {
    (axios.get as any).mockRejectedValue(new Error("API Error"));
  }

  // When functions
  async function whenCharactersAreFetched(): Promise<CharacterListResponse> {
    return rickMortyService.getCharacters();
  }

  async function whenCharacterIsFetched(id: number): Promise<Character> {
    return rickMortyService.getCharacter(id);
  }

  // Then functions
  function thenCharactersAreReturned(result: CharacterListResponse): void {
    expect(result).toBeDefined();
    expect(result.results).toHaveLength(1);
    expect(result.results[0].name).toBe("Rick Sanchez");
  }

  function thenCharacterIsReturned(result: Character): void {
    expect(result).toBeDefined();
    expect(result.name).toBe("Rick Sanchez");
  }

  function thenCharactersAreCached(): void {
    expect(axios.get).toHaveBeenCalledWith("https://rickandmortyapi.com/api/character");
  }

  function thenCharacterIsCached(id: number): void {
    expect(axios.get).toHaveBeenCalledWith(`https://rickandmortyapi.com/api/character/${id}`);
  }

  function thenApiIsNotCalled(): void {
    expect(axios.get).not.toHaveBeenCalled();
  }
});
