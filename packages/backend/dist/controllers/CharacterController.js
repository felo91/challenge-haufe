"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const RickMortyService_1 = require("../services/rickMorty/RickMortyService");
const InMemoryCacheService_1 = require("../services/cache/InMemoryCacheService");
const UserService_1 = require("../services/user/UserService");
const CharacterDto_1 = require("../dto/CharacterDto");
const errors_1 = require("../errors");
class CharacterController {
    constructor() {
        const cacheService = new InMemoryCacheService_1.InMemoryCacheService();
        this.rickMortyService = new RickMortyService_1.RickMortyService(cacheService);
        this.userService = new UserService_1.UserService();
    }
    async getCharacters(req, res, _next) {
        const page = parseInt(req.query["page"]) || 1;
        const characters = await this.rickMortyService.getCharacters({ page });
        const basicCharacters = CharacterDto_1.CharacterDto.toCharacterListWithFavorite(characters.results, characters.info, req.user);
        res.status(200).json(basicCharacters);
    }
    async getAdditionalInfoById(req, res, _next) {
        const id = parseInt(req.params["id"] || "");
        if (isNaN(id))
            throw new errors_1.InvalidCharacterIdError();
        const character = await this.rickMortyService.getCharacter(id);
        const characterInfo = CharacterDto_1.CharacterDto.toCharacterInformation(character);
        res.status(200).json(characterInfo);
    }
    async addFavoriteCharacter(req, res, _next) {
        const { characterId } = req.body;
        const user = req.user;
        if (!user)
            throw new errors_1.AuthenticationError();
        await this.userService.addFavoriteCharacter(user.id, characterId);
        res.status(200).json({ message: "Character added to favorites" });
    }
    async removeFavoriteCharacter(req, res, _next) {
        const { characterId } = req.body;
        const user = req.user;
        if (!user)
            throw new errors_1.AuthenticationError();
        await this.userService.removeFavoriteCharacter(user.id, characterId);
        res.status(200).json({ message: "Character removed from favorites" });
    }
}
exports.CharacterController = CharacterController;
//# sourceMappingURL=CharacterController.js.map