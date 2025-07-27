import axios from "axios";
import { ICacheService } from "../cache/ICacheService";
import {
  Character,
  CharacterListResponse,
  CharacterQuery,
} from "@rick-morty-app/libs";

export class RickMortyService {
  private readonly baseUrl = "https://rickandmortyapi.com/api";
  private readonly cacheService: ICacheService;

  constructor(cacheService: ICacheService) {
    this.cacheService = cacheService;
  }

  async getCharacters(query?: CharacterQuery): Promise<CharacterListResponse> {
    const page = query?.page || 1;
    const cacheKey = `characters:page:${page}`;

    // Try to get from cache first
    const cached = await this.cacheService.get<CharacterListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const params = new URLSearchParams();
      if (query?.name) params.append("name", query.name);
      if (query?.status) params.append("status", query.status);
      if (query?.species) params.append("species", query.species);
      if (query?.type) params.append("type", query.type);
      if (query?.gender) params.append("gender", query.gender);
      if (page > 1) params.append("page", page.toString());

      const url = `${this.baseUrl}/character${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await axios.get<CharacterListResponse>(url);

      // Cache the response for 1 hour
      await this.cacheService.set(cacheKey, response.data, 3600);

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch characters");
    }
  }

  async getCharacter(id: number): Promise<Character> {
    const cacheKey = `character:${id}`;

    // Try to get from cache first
    const cached = await this.cacheService.get<Character>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get<Character>(
        `${this.baseUrl}/character/${id}`
      );

      // Cache the response for 1 hour
      await this.cacheService.set(cacheKey, response.data, 3600);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch character ${id}`);
    }
  }

  async searchCharacters(query: string): Promise<CharacterListResponse> {
    const cacheKey = `search:${query}`;

    // Try to get from cache first
    const cached = await this.cacheService.get<CharacterListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get<CharacterListResponse>(
        `${this.baseUrl}/character/?name=${encodeURIComponent(query)}`
      );

      // Cache the response for 30 minutes
      await this.cacheService.set(cacheKey, response.data, 1800);

      return response.data;
    } catch (error) {
      throw new Error("Failed to search characters");
    }
  }
}
