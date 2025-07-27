import { User } from "../../entities/User";
export declare class UserService {
    private userRepository;
    constructor();
    saveUser(user: User): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    addFavoriteCharacter(userId: string, characterId: number): Promise<void>;
    removeFavoriteCharacter(userId: string, characterId: number): Promise<void>;
    getFavoriteCharacters(userId: string): Promise<number[]>;
    isFavoriteCharacter(userId: string, characterId: number): Promise<boolean>;
}
//# sourceMappingURL=UserService.d.ts.map