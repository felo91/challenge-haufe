import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
import { UserRole } from "@rick-morty-app/libs";
export declare const requireRole: (allowedRoles: UserRole[]) => (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
export declare const requireProductOwner: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
export declare const requireFan: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
export declare const requireAnyRole: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=roleAuth.d.ts.map