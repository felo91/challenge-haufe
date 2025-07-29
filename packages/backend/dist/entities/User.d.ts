export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    favoriteCharacters: number[];
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    setPassword(password: string): void;
    validatePassword(password: string): Promise<boolean>;
    addFavoriteCharacter(characterId: number): void;
    removeFavoriteCharacter(characterId: number): void;
    isFavoriteCharacter(characterId: number): boolean;
}
//# sourceMappingURL=User.d.ts.map