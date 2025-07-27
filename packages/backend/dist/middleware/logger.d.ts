import { Request, Response, NextFunction } from "express";
export interface LoggedRequest extends Request {
    startTime?: number;
}
export declare const loggerMiddleware: (req: LoggedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=logger.d.ts.map