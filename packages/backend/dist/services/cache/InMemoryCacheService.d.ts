import { ICacheService } from "./ICacheService";
export declare class InMemoryCacheService implements ICacheService {
    private cache;
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    clear(): Promise<void>;
}
//# sourceMappingURL=InMemoryCacheService.d.ts.map