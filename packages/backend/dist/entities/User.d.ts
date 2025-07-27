import { UserRole } from "@rick-morty-app/libs";
export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    role: UserRole;
    favoriteCharacters: number[];
    createdAt: Date;
    updatedAt: Date;
    setPassword(plainPassword: string): void;
    validatePassword(plainPassword: string): boolean;
    addFavoriteCharacter(characterId: number): void;
    removeFavoriteCharacter(characterId: number): void;
    isFavoriteCharacter(characterId: number): boolean;
}
//# sourceMappingURL=User.d.ts.map