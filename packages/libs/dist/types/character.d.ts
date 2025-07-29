import { z } from "zod";
export declare const CharacterSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    status: z.ZodString;
    species: z.ZodString;
    type: z.ZodString;
    gender: z.ZodString;
    origin: z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
    }, {
        name: string;
        url: string;
    }>;
    location: z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
    }, {
        name: string;
        url: string;
    }>;
    image: z.ZodString;
    episode: z.ZodArray<z.ZodString, "many">;
    url: z.ZodString;
    created: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    status: string;
    id: number;
    name: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    url: string;
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    created: string;
}, {
    type: string;
    status: string;
    id: number;
    name: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    url: string;
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    created: string;
}>;
export type Character = z.infer<typeof CharacterSchema>;
export declare const CharacterBasicInformationSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    status: z.ZodString;
    species: z.ZodString;
    type: z.ZodString;
    gender: z.ZodString;
    isFavorite: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: string;
    status: string;
    id: number;
    name: string;
    species: string;
    gender: string;
    isFavorite: boolean;
}, {
    type: string;
    status: string;
    id: number;
    name: string;
    species: string;
    gender: string;
    isFavorite: boolean;
}>;
export type CharacterBasicInformation = z.infer<typeof CharacterBasicInformationSchema>;
export declare const CharacterInformationSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    status: z.ZodString;
    species: z.ZodString;
    type: z.ZodString;
    gender: z.ZodString;
    origin: z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
    }, {
        name: string;
        url: string;
    }>;
    location: z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
    }, {
        name: string;
        url: string;
    }>;
    image: z.ZodString;
    episode: z.ZodArray<z.ZodString, "many">;
    url: z.ZodString;
    created: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    status: string;
    id: number;
    name: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    url: string;
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    created: string;
}, {
    type: string;
    status: string;
    id: number;
    name: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    url: string;
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    created: string;
}>;
export type CharacterInformation = z.infer<typeof CharacterInformationSchema>;
export declare const CharacterListResponseSchema: z.ZodObject<{
    info: z.ZodObject<{
        count: z.ZodNumber;
        pages: z.ZodNumber;
        next: z.ZodNullable<z.ZodString>;
        prev: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }, {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }>;
    results: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        status: z.ZodString;
        species: z.ZodString;
        type: z.ZodString;
        gender: z.ZodString;
        origin: z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
        }, {
            name: string;
            url: string;
        }>;
        location: z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
        }, {
            name: string;
            url: string;
        }>;
        image: z.ZodString;
        episode: z.ZodArray<z.ZodString, "many">;
        url: z.ZodString;
        created: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        url: string;
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        created: string;
    }, {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        url: string;
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        created: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        url: string;
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        created: string;
    }[];
}, {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        origin: {
            name: string;
            url: string;
        };
        url: string;
        location: {
            name: string;
            url: string;
        };
        image: string;
        episode: string[];
        created: string;
    }[];
}>;
export type CharacterListResponse = z.infer<typeof CharacterListResponseSchema>;
export declare const CharacterBasicListResponseSchema: z.ZodObject<{
    info: z.ZodObject<{
        count: z.ZodNumber;
        pages: z.ZodNumber;
        next: z.ZodNullable<z.ZodString>;
        prev: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }, {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    }>;
    results: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        status: z.ZodString;
        species: z.ZodString;
        type: z.ZodString;
        gender: z.ZodString;
        isFavorite: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        isFavorite: boolean;
    }, {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        isFavorite: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        isFavorite: boolean;
    }[];
}, {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: {
        type: string;
        status: string;
        id: number;
        name: string;
        species: string;
        gender: string;
        isFavorite: boolean;
    }[];
}>;
export type CharacterBasicListResponse = z.infer<typeof CharacterBasicListResponseSchema>;
export declare const CharacterQuerySchema: z.ZodObject<{
    page: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    species: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    type?: string | undefined;
    status?: string | undefined;
    name?: string | undefined;
    species?: string | undefined;
    gender?: string | undefined;
}, {
    type?: string | undefined;
    status?: string | undefined;
    name?: string | undefined;
    species?: string | undefined;
    gender?: string | undefined;
    page?: string | undefined;
}>;
export type CharacterQuery = z.infer<typeof CharacterQuerySchema>;
export declare const FavoriteCharacterRequestSchema: z.ZodObject<{
    characterId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    characterId: number;
}, {
    characterId: number;
}>;
export type FavoriteCharacterRequest = z.infer<typeof FavoriteCharacterRequestSchema>;
//# sourceMappingURL=character.d.ts.map