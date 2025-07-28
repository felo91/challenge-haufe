import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
export interface ErrorResponse {
    error: string;
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    details?: any;
}
export declare const errorHandler: (error: Error | AppError, req: Request, res: Response, _next: NextFunction) => void;
export declare const asyncErrorHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map