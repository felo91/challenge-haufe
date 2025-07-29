"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheFactory = void 0;
const RedisCacheService_1 = require("./RedisCacheService");
const InMemoryCacheService_1 = require("./InMemoryCacheService");
class CacheFactory {
    static createCacheService() {
        const isProduction = process.env["NODE_ENV"] === "production";
        const redisUrl = process.env["REDIS_URL"];
        if (isProduction && redisUrl) {
            try {
                return new RedisCacheService_1.RedisCacheService();
            }
            catch (error) {
                console.warn("Failed to initialize Redis cache, falling back to InMemory cache:", error);
                return new InMemoryCacheService_1.InMemoryCacheService();
            }
        }
        return new InMemoryCacheService_1.InMemoryCacheService();
    }
}
exports.CacheFactory = CacheFactory;
//# sourceMappingURL=CacheFactory.js.map