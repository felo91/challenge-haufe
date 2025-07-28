import axios from "axios";
import { ICacheService } from "../cache/ICacheService";
import { Character, CharacterListResponse } from "@rick-morty-app/libs";
import { CharacterQueryDto } from "../../dto/CharacterQueryDto";
import { CharacterFetchError, SingleCharacterFetchError } from "../../errors";

export class RickMortyService {
  private readonly externalApiUrl = "https://rickandmortyapi.com/api";
  private readonly cacheService: ICacheService;

  constructor(cacheService: ICacheService) {
    this.cacheService = cacheService;
  }

  async getCharacters(query: { page: number }): Promise<CharacterListResponse> {
    const page = query.page;
    const cacheKey = `characters:page:${page}`;

    // Try to get from cache first
    const cached = await this.cacheService.get<CharacterListResponse>(cacheKey);
    if (cached) return cached;

    try {
      const params = CharacterQueryDto.toUrlParams(query);
      const url = `${this.externalApiUrl}/character${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await axios.get<CharacterListResponse>(url);

      // Cache the response for 2 days
      await this.cacheService.set(cacheKey, response.data, 2 * 24 * 60 * 60);

      return response.data;
    } catch (error) {
      throw new CharacterFetchError();
    }
  }

  async getCharacter(id: number): Promise<Character> {
    const cacheKey = `character:${id}`;

    // Try to get from cache first
    const cached = await this.cacheService.get<Character>(cacheKey);
    if (cached) return cached;

    try {
      const response = await axios.get<Character>(`${this.externalApiUrl}/character/${id}`);

      // Cache the response for 2 days
      await this.cacheService.set(cacheKey, response.data, 2 * 24 * 60 * 60);

      return response.data;
    } catch (error) {
      throw new SingleCharacterFetchError(id);
    }
  }
}
