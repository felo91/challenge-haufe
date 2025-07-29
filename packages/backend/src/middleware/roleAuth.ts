import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
import { UserRoleEnum } from "@rick-morty-app/libs";
import { AuthenticationError, AuthorizationError } from "../errors";

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) throw new AuthenticationError();

    if (!allowedRoles.includes(req.user.role))
      throw new AuthorizationError("Insufficient permissions", allowedRoles, req.user.role);

    next();
  };
};

export const requireProductOwner = requireRole([UserRoleEnum.PRODUCT_OWNER]);
export const requireFan = requireRole([UserRoleEnum.FAN]);
export const requireAnyRole = requireRole([UserRoleEnum.FAN, UserRoleEnum.PRODUCT_OWNER]);
