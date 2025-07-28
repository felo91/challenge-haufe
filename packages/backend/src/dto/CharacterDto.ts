import {
  Character,
  CharacterBasicInformation,
  CharacterInformation,
  CharacterBasicListResponse,
} from "@rick-morty-app/libs";
import { User } from "../entities/User";

export class CharacterDto {
  static toBasicInformation(character: Character, user?: User): CharacterBasicInformation {
    const isFavorite = user ? user.isFavoriteCharacter(character.id) : false;
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      isFavorite,
    };
  }

  static toCharacterInformation(character: Character): CharacterInformation {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin,
      location: character.location,
      image: character.image,
      episode: character.episode,
      url: character.url,
      created: character.created,
    };
  }

  static toCharacterListWithFavorite(characters: Character[], info: any, user?: User): CharacterBasicListResponse {
    return {
      info,
      results: characters.map((char) => this.toBasicInformation(char, user)),
    };
  }
}
