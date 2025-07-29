"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteCharacterRequestSchema = exports.CharacterQuerySchema = exports.CharacterBasicListResponseSchema = exports.CharacterListResponseSchema = exports.CharacterInformationSchema = exports.CharacterBasicInformationSchema = exports.CharacterSchema = void 0;
const zod_1 = require("zod");
exports.CharacterSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    status: zod_1.z.string(),
    species: zod_1.z.string(),
    type: zod_1.z.string(),
    gender: zod_1.z.string(),
    origin: zod_1.z.object({
        name: zod_1.z.string(),
        url: zod_1.z.string(),
    }),
    location: zod_1.z.object({
        name: zod_1.z.string(),
        url: zod_1.z.string(),
    }),
    image: zod_1.z.string().url(),
    episode: zod_1.z.array(zod_1.z.string()),
    url: zod_1.z.string().url(),
    created: zod_1.z.string(),
});
exports.CharacterBasicInformationSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    status: zod_1.z.string(),
    species: zod_1.z.string(),
    type: zod_1.z.string(),
    gender: zod_1.z.string(),
    isFavorite: zod_1.z.boolean(),
});
exports.CharacterInformationSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    status: zod_1.z.string(),
    species: zod_1.z.string(),
    type: zod_1.z.string(),
    gender: zod_1.z.string(),
    origin: zod_1.z.object({
        name: zod_1.z.string(),
        url: zod_1.z.string(),
    }),
    location: zod_1.z.object({
        name: zod_1.z.string(),
        url: zod_1.z.string(),
    }),
    image: zod_1.z.string().url(),
    episode: zod_1.z.array(zod_1.z.string()),
    url: zod_1.z.string().url(),
    created: zod_1.z.string(),
});
exports.CharacterListResponseSchema = zod_1.z.object({
    info: zod_1.z.object({
        count: zod_1.z.number(),
        pages: zod_1.z.number(),
        next: zod_1.z.string().nullable(),
        prev: zod_1.z.string().nullable(),
    }),
    results: zod_1.z.array(exports.CharacterSchema),
});
exports.CharacterBasicListResponseSchema = zod_1.z.object({
    info: zod_1.z.object({
        count: zod_1.z.number(),
        pages: zod_1.z.number(),
        next: zod_1.z.string().nullable(),
        prev: zod_1.z.string().nullable(),
    }),
    results: zod_1.z.array(exports.CharacterBasicInformationSchema),
});
exports.CharacterQuerySchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1)),
    name: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    species: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    gender: zod_1.z.string().optional(),
});
exports.FavoriteCharacterRequestSchema = zod_1.z.object({
    characterId: zod_1.z.number(),
});
//# sourceMappingURL=character.js.map