import { ICacheService } from "./ICacheService";
export declare class RedisCacheService implements ICacheService {
    private client;
    private isConnected;
    constructor();
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    clear(): Promise<void>;
    disconnect(): Promise<void>;
    isRedisConnected(): boolean;
}
//# sourceMappingURL=RedisCacheService.d.ts.map