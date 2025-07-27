import { ICacheService } from "../cache/ICacheService";
import { Character, CharacterListResponse, CharacterQuery } from "@rick-morty-app/libs";
export declare class RickMortyService {
    private readonly baseUrl;
    private readonly cacheService;
    constructor(cacheService: ICacheService);
    getCharacters(query?: CharacterQuery): Promise<CharacterListResponse>;
    getCharacter(id: number): Promise<Character>;
    searchCharacters(query: string): Promise<CharacterListResponse>;
}
//# sourceMappingURL=RickMortyService.d.ts.map