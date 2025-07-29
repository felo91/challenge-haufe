import { z } from "zod";
export declare const UserRoleSchema: z.ZodEnum<["fan", "product_owner"]>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export declare const UserRoleEnum: {
    readonly FAN: "fan";
    readonly PRODUCT_OWNER: "product_owner";
};
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["fan", "product_owner"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    role: "fan" | "product_owner";
}, {
    id: string;
    email: string;
    name: string;
    role: "fan" | "product_owner";
}>;
export type User = z.infer<typeof UserSchema>;
export declare const LoginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export declare const RegisterRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["fan", "product_owner"]>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    role: "fan" | "product_owner";
    password: string;
}, {
    email: string;
    name: string;
    role: "fan" | "product_owner";
    password: string;
}>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export declare const AuthResponseSchema: z.ZodObject<{
    token: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodString;
        role: z.ZodEnum<["fan", "product_owner"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        name: string;
        role: "fan" | "product_owner";
    }, {
        id: string;
        email: string;
        name: string;
        role: "fan" | "product_owner";
    }>;
}, "strip", z.ZodTypeAny, {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: "fan" | "product_owner";
    };
}, {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: "fan" | "product_owner";
    };
}>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
//# sourceMappingURL=auth.d.ts.map