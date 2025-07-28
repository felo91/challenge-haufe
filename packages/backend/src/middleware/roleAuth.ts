import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
import { UserRole } from "@rick-morty-app/libs";
import { AuthenticationError, AuthorizationError } from "../errors";

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) throw new AuthenticationError();

    if (!allowedRoles.includes(req.user.role))
      throw new AuthorizationError("Insufficient permissions", allowedRoles, req.user.role);

    next();
  };
};

export const requireProductOwner = requireRole([UserRole.PRODUCT_OWNER]);
export const requireFan = requireRole([UserRole.FAN]);
export const requireAnyRole = requireRole([UserRole.FAN, UserRole.PRODUCT_OWNER]);
