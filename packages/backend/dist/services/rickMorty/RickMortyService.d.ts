import { ICacheService } from "../cache/ICacheService";
import { Character, CharacterListResponse } from "@rick-morty-app/libs";
export declare class RickMortyService {
    private readonly externalApiUrl;
    private readonly cacheService;
    constructor(cacheService: ICacheService);
    getCharacters(query?: {
        page?: number;
    }): Promise<CharacterListResponse>;
    getCharacter(id: number): Promise<Character>;
}
//# sourceMappingURL=RickMortyService.d.ts.map