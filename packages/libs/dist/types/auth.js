"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseSchema = exports.RegisterRequestSchema = exports.LoginRequestSchema = exports.UserSchema = exports.UserRoleEnum = exports.UserRoleSchema = void 0;
const zod_1 = require("zod");
exports.UserRoleSchema = zod_1.z.enum(["fan", "product_owner"]);
exports.UserRoleEnum = {
    FAN: "fan",
    PRODUCT_OWNER: "product_owner",
};
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    role: exports.UserRoleSchema,
});
exports.LoginRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.RegisterRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
    role: exports.UserRoleSchema,
});
exports.AuthResponseSchema = zod_1.z.object({
    token: zod_1.z.string(),
    user: exports.UserSchema,
});
//# sourceMappingURL=auth.js.map