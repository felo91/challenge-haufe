import { ICacheService } from "./ICacheService";
import { RedisCacheService } from "./RedisCacheService";
import { InMemoryCacheService } from "./InMemoryCacheService";

export class CacheFactory {
  static createCacheService(): ICacheService {
    const isProduction = process.env["NODE_ENV"] === "production";
    const redisUrl = process.env["REDIS_URL"];

    // Use Redis in production if REDIS_URL is available, otherwise fallback to InMemory
    if (isProduction && redisUrl) {
      try {
        return new RedisCacheService();
      } catch (error) {
        console.warn("Failed to initialize Redis cache, falling back to InMemory cache:", error);
        return new InMemoryCacheService();
      }
    }

    // Use InMemory cache for development and testing
    return new InMemoryCacheService();
  }
}
