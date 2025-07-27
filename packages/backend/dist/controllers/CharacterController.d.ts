import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
export declare class CharacterController {
    private rickMortyService;
    private userService;
    constructor();
    getCharacters(req: Request, res: Response, _next: NextFunction): Promise<void>;
    getCharacter(req: Request, res: Response, _next: NextFunction): Promise<void>;
    searchCharacters(req: Request, res: Response, _next: NextFunction): Promise<void>;
    addFavoriteCharacter(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void>;
    removeFavoriteCharacter(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void>;
}
//# sourceMappingURL=CharacterController.d.ts.map