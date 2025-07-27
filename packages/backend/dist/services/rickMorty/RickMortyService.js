"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RickMortyService = void 0;
const axios_1 = __importDefault(require("axios"));
class RickMortyService {
    constructor(cacheService) {
        this.baseUrl = "https://rickandmortyapi.com/api";
        this.cacheService = cacheService;
    }
    async getCharacters(query) {
        const page = query?.page || 1;
        const cacheKey = `characters:page:${page}`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached) {
            return cached;
        }
        try {
            const params = new URLSearchParams();
            if (query?.name)
                params.append("name", query.name);
            if (query?.status)
                params.append("status", query.status);
            if (query?.species)
                params.append("species", query.species);
            if (query?.type)
                params.append("type", query.type);
            if (query?.gender)
                params.append("gender", query.gender);
            if (page > 1)
                params.append("page", page.toString());
            const url = `${this.baseUrl}/character${params.toString() ? `?${params.toString()}` : ""}`;
            const response = await axios_1.default.get(url);
            await this.cacheService.set(cacheKey, response.data, 3600);
            return response.data;
        }
        catch (error) {
            throw new Error("Failed to fetch characters");
        }
    }
    async getCharacter(id) {
        const cacheKey = `character:${id}`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached) {
            return cached;
        }
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/character/${id}`);
            await this.cacheService.set(cacheKey, response.data, 3600);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch character ${id}`);
        }
    }
    async searchCharacters(query) {
        const cacheKey = `search:${query}`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached) {
            return cached;
        }
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/character/?name=${encodeURIComponent(query)}`);
            await this.cacheService.set(cacheKey, response.data, 1800);
            return response.data;
        }
        catch (error) {
            throw new Error("Failed to search characters");
        }
    }
}
exports.RickMortyService = RickMortyService;
//# sourceMappingURL=RickMortyService.js.map