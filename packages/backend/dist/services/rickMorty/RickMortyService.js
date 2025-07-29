"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RickMortyService = void 0;
const axios_1 = __importDefault(require("axios"));
const CharacterQueryDto_1 = require("../../dto/CharacterQueryDto");
const errors_1 = require("../../errors");
class RickMortyService {
    constructor(cacheService) {
        this.externalApiUrl = "https://rickandmortyapi.com/api";
        this.cacheService = cacheService;
    }
    async getCharacters(query) {
        const page = query.page;
        const cacheKey = `characters:page:${page}`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached)
            return cached;
        try {
            const params = CharacterQueryDto_1.CharacterQueryDto.toUrlParams(query);
            const url = `${this.externalApiUrl}/character${params.toString() ? `?${params.toString()}` : ""}`;
            const response = await axios_1.default.get(url);
            await this.cacheService.set(cacheKey, response.data, 2 * 24 * 60 * 60);
            return response.data;
        }
        catch (error) {
            throw new errors_1.CharacterFetchError();
        }
    }
    async getCharacter(id) {
        const cacheKey = `character:${id}`;
        const cached = await this.cacheService.get(cacheKey);
        if (cached)
            return cached;
        try {
            const response = await axios_1.default.get(`${this.externalApiUrl}/character/${id}`);
            await this.cacheService.set(cacheKey, response.data, 2 * 24 * 60 * 60);
            return response.data;
        }
        catch (error) {
            throw new errors_1.SingleCharacterFetchError(id);
        }
    }
}
exports.RickMortyService = RickMortyService;
//# sourceMappingURL=RickMortyService.js.map