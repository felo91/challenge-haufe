import { Request, Response, NextFunction } from "express";
export declare class AuthController {
    private authService;
    constructor();
    register(req: Request, res: Response, _next: NextFunction): Promise<void>;
    login(req: Request, res: Response, _next: NextFunction): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map