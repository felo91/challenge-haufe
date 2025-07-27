"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterController = void 0;
const RickMortyService_1 = require("../services/rickMorty/RickMortyService");
const InMemoryCacheService_1 = require("../services/cache/InMemoryCacheService");
const UserService_1 = require("../services/user/UserService");
class CharacterController {
    constructor() {
        const cacheService = new InMemoryCacheService_1.InMemoryCacheService();
        this.rickMortyService = new RickMortyService_1.RickMortyService(cacheService);
        this.userService = new UserService_1.UserService();
    }
    async getCharacters(req, res, _next) {
        try {
            const query = req.query;
            const characters = await this.rickMortyService.getCharacters(query);
            res.status(200).json(characters);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async getCharacter(req, res, _next) {
        try {
            const id = parseInt(req.params["id"] || "");
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid character ID" });
                return;
            }
            const character = await this.rickMortyService.getCharacter(id);
            res.status(200).json(character);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async searchCharacters(req, res, _next) {
        try {
            const { q } = req.query;
            if (!q || typeof q !== "string") {
                res.status(400).json({ error: "Search query is required" });
                return;
            }
            const characters = await this.rickMortyService.searchCharacters(q);
            res.status(200).json(characters);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async addFavoriteCharacter(req, res, _next) {
        try {
            const { characterId } = req.body;
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: "User not authenticated" });
                return;
            }
            await this.userService.addFavoriteCharacter(user.id, characterId);
            res.status(200).json({ message: "Character added to favorites" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    async removeFavoriteCharacter(req, res, _next) {
        try {
            const { characterId } = req.body;
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: "User not authenticated" });
                return;
            }
            await this.userService.removeFavoriteCharacter(user.id, characterId);
            res.status(200).json({ message: "Character removed from favorites" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}
exports.CharacterController = CharacterController;
//# sourceMappingURL=CharacterController.js.map