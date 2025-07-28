"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterDto = void 0;
class CharacterDto {
    static toBasicInformation(character, user) {
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
    static toCharacterInformation(character) {
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
    static toCharacterListWithFavorite(characters, info, user) {
        return {
            info,
            results: characters.map((char) => this.toBasicInformation(char, user)),
        };
    }
}
exports.CharacterDto = CharacterDto;
//# sourceMappingURL=CharacterDto.js.map