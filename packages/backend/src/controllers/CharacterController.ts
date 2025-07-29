import { Response, NextFunction } from "express";
import { RickMortyService } from "../services/rickMorty/RickMortyService";
import { CacheFactory } from "../services/cache/CacheFactory";
import { UserService } from "../services/user/UserService";
import { AuthenticatedRequest } from "../middleware/auth";
import { FavoriteCharacterRequest } from "@rick-morty-app/libs";
import { CharacterDto } from "../dto/CharacterDto";
import { InvalidCharacterIdError, AuthenticationError } from "../errors";

export class CharacterController {
  private rickMortyService: RickMortyService;
  private userService: UserService;

  constructor() {
    const cacheService = CacheFactory.createCacheService();
    this.rickMortyService = new RickMortyService(cacheService);
    this.userService = new UserService();
  }

  async getCharacters(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void> {
    const page = parseInt(req.query["page"] as string) || 1;
    const characters = await this.rickMortyService.getCharacters({ page });

    const basicCharacters = CharacterDto.toCharacterListWithFavorite(characters.results, characters.info, req.user);

    res.status(200).json(basicCharacters);
  }

  async getAdditionalInfoById(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void> {
    const id = parseInt(req.params["id"] || "");
    if (isNaN(id)) throw new InvalidCharacterIdError();

    const character = await this.rickMortyService.getCharacter(id);

    const characterInfo = CharacterDto.toCharacterInformation(character);
    res.status(200).json(characterInfo);
  }

  async addFavoriteCharacter(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void> {
    const { characterId }: FavoriteCharacterRequest = req.body;
    const user = req.user;
    if (!user) throw new AuthenticationError();

    await this.userService.addFavoriteCharacter(user.id, characterId);

    res.status(200).json({ message: "Character added to favorites" });
  }

  async removeFavoriteCharacter(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void> {
    const { characterId }: FavoriteCharacterRequest = req.body;
    const user = req.user;
    if (!user) throw new AuthenticationError();

    await this.userService.removeFavoriteCharacter(user.id, characterId);

    res.status(200).json({ message: "Character removed from favorites" });
  }
}
