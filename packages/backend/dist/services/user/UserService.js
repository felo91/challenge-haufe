"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../../entities/User");
const database_1 = require("../../config/database");
class UserService {
    constructor() {
        try {
            this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
        }
        catch (error) {
            console.log("Database not available, using mock repository");
            this.userRepository = null;
        }
    }
    async saveUser(user) {
        if (!this.userRepository) {
            throw new Error("Database not available");
        }
        return await this.userRepository.save(user);
    }
    async findUserById(id) {
        if (!this.userRepository) {
            return null;
        }
        return await this.userRepository.findOne({ where: { id } });
    }
    async findUserByEmail(email) {
        if (!this.userRepository) {
            return null;
        }
        return await this.userRepository.findOne({ where: { email } });
    }
    async addFavoriteCharacter(userId, characterId) {
        if (!this.userRepository) {
            throw new Error("Database not available");
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        user.addFavoriteCharacter(characterId);
        await this.userRepository.save(user);
    }
    async removeFavoriteCharacter(userId, characterId) {
        if (!this.userRepository) {
            throw new Error("Database not available");
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        user.removeFavoriteCharacter(characterId);
        await this.userRepository.save(user);
    }
    async getFavoriteCharacters(userId) {
        if (!this.userRepository) {
            return [];
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        return user.favoriteCharacters;
    }
    async isFavoriteCharacter(userId, characterId) {
        if (!this.userRepository) {
            return false;
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return false;
        }
        return user.isFavoriteCharacter(characterId);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map