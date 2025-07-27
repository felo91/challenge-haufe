import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { AppDataSource } from "../../config/database";

export class UserService {
  private userRepository: Repository<User> | null;

  constructor() {
    try {
      this.userRepository = AppDataSource.getRepository(User);
    } catch (error) {
      console.log("Database not available, using mock repository");
      this.userRepository = null;
    }
  }

  async saveUser(user: User): Promise<User> {
    if (!this.userRepository) {
      throw new Error("Database not available");
    }
    return await this.userRepository.save(user);
  }

  async findUserById(id: string): Promise<User | null> {
    if (!this.userRepository) {
      return null;
    }
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (!this.userRepository) {
      return null;
    }
    return await this.userRepository.findOne({ where: { email } });
  }

  async addFavoriteCharacter(
    userId: string,
    characterId: number
  ): Promise<void> {
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

  async removeFavoriteCharacter(
    userId: string,
    characterId: number
  ): Promise<void> {
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

  async getFavoriteCharacters(userId: string): Promise<number[]> {
    if (!this.userRepository) {
      return [];
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    return user.favoriteCharacters;
  }

  async isFavoriteCharacter(
    userId: string,
    characterId: number
  ): Promise<boolean> {
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
