import { Request, Response, NextFunction } from "express";
import { RickMortyService } from "../services/rickMorty/RickMortyService";
import { InMemoryCacheService } from "../services/cache/InMemoryCacheService";
import { UserService } from "../services/user/UserService";
import { AuthenticatedRequest } from "../middleware/auth";
import { CharacterQuery, FavoriteCharacterRequest } from "@rick-morty-app/libs";

export class CharacterController {
  private rickMortyService: RickMortyService;
  private userService: UserService;

  constructor() {
    const cacheService = new InMemoryCacheService();
    this.rickMortyService = new RickMortyService(cacheService);
    this.userService = new UserService();
  }

  async getCharacters(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const query: CharacterQuery = req.query as any;
      const characters = await this.rickMortyService.getCharacters(query);
      res.status(200).json(characters);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async getCharacter(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params["id"] || "");
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid character ID" });
        return;
      }

      const character = await this.rickMortyService.getCharacter(id);
      res.status(200).json(character);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async searchCharacters(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        res.status(400).json({ error: "Search query is required" });
        return;
      }

      const characters = await this.rickMortyService.searchCharacters(q);
      res.status(200).json(characters);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async addFavoriteCharacter(
    req: AuthenticatedRequest,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { characterId }: FavoriteCharacterRequest = req.body;
      const user = req.user;

      if (!user) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      await this.userService.addFavoriteCharacter(user.id, characterId);

      res.status(200).json({ message: "Character added to favorites" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async removeFavoriteCharacter(
    req: AuthenticatedRequest,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { characterId }: FavoriteCharacterRequest = req.body;
      const user = req.user;

      if (!user) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      await this.userService.removeFavoriteCharacter(user.id, characterId);

      res.status(200).json({ message: "Character removed from favorites" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
