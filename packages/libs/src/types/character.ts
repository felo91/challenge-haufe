import { z } from "zod";

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string().url(),
  episode: z.array(z.string()),
  url: z.string().url(),
  created: z.string(),
});
export type Character = z.infer<typeof CharacterSchema>;

export const CharacterBasicInformationSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  isFavorite: z.boolean(),
});
export type CharacterBasicInformation = z.infer<typeof CharacterBasicInformationSchema>;

export const CharacterInformationSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string().url(),
  episode: z.array(z.string()),
  url: z.string().url(),
  created: z.string(),
});
export type CharacterInformation = z.infer<typeof CharacterInformationSchema>;

export const CharacterListResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(CharacterSchema),
});
export type CharacterListResponse = z.infer<typeof CharacterListResponseSchema>;

export const CharacterBasicListResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(CharacterBasicInformationSchema),
});
export type CharacterBasicListResponse = z.infer<typeof CharacterBasicListResponseSchema>;

export const CharacterQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  name: z.string().optional(),
  status: z.string().optional(),
  species: z.string().optional(),
  type: z.string().optional(),
  gender: z.string().optional(),
});
export type CharacterQuery = z.infer<typeof CharacterQuerySchema>;

export const FavoriteCharacterRequestSchema = z.object({
  characterId: z.number(),
});
export type FavoriteCharacterRequest = z.infer<typeof FavoriteCharacterRequestSchema>;
