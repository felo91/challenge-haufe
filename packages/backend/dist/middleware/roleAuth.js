"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAnyRole = exports.requireFan = exports.requireProductOwner = exports.requireRole = void 0;
const libs_1 = require("@rick-morty-app/libs");
const errors_1 = require("../errors");
const requireRole = (allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user)
            throw new errors_1.AuthenticationError();
        if (!allowedRoles.includes(req.user.role))
            throw new errors_1.AuthorizationError("Insufficient permissions", allowedRoles, req.user.role);
        next();
    };
};
exports.requireRole = requireRole;
exports.requireProductOwner = (0, exports.requireRole)([libs_1.UserRoleEnum.PRODUCT_OWNER]);
exports.requireFan = (0, exports.requireRole)([libs_1.UserRoleEnum.FAN]);
exports.requireAnyRole = (0, exports.requireRole)([libs_1.UserRoleEnum.FAN, libs_1.UserRoleEnum.PRODUCT_OWNER]);
//# sourceMappingURL=roleAuth.js.map