import { Character, CharacterBasicInformation, CharacterInformation, CharacterBasicListResponse } from "@rick-morty-app/libs";
import { User } from "../entities/User";
export declare class CharacterDto {
    static toBasicInformation(character: Character, user?: User): CharacterBasicInformation;
    static toCharacterInformation(character: Character): CharacterInformation;
    static toCharacterListWithFavorite(characters: Character[], info: any, user?: User): CharacterBasicListResponse;
}
//# sourceMappingURL=CharacterDto.d.ts.map