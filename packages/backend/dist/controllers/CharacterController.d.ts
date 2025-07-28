import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
export declare class CharacterController {
    private rickMortyService;
    private userService;
    constructor();
    getCharacters(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void>;
    getAdditionalInfoById(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void>;
    addFavoriteCharacter(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void>;
    removeFavoriteCharacter(req: AuthenticatedRequest, res: Response, _next: NextFunction): Promise<void>;
}
//# sourceMappingURL=CharacterController.d.ts.map