"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const redis_1 = require("redis");
class RedisCacheService {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: process.env["REDIS_URL"] || "redis://localhost:6379",
        });
        this.client.on("error", (err) => {
            console.error("Redis Client Error:", err);
        });
        this.client.connect().catch(console.error);
    }
    async get(key) {
        try {
            const value = await this.client.get(key);
            return value ? JSON.parse(value) : null;
        }
        catch (error) {
            console.error("Redis get error:", error);
            return null;
        }
    }
    async set(key, value, ttl) {
        try {
            const serializedValue = JSON.stringify(value);
            if (ttl) {
                await this.client.setEx(key, ttl, serializedValue);
            }
            else {
                await this.client.set(key, serializedValue);
            }
        }
        catch (error) {
            console.error("Redis set error:", error);
        }
    }
    async delete(key) {
        try {
            await this.client.del(key);
        }
        catch (error) {
            console.error("Redis delete error:", error);
        }
    }
    async exists(key) {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        }
        catch (error) {
            console.error("Redis exists error:", error);
            return false;
        }
    }
    async clear() {
        try {
            await this.client.flushAll();
        }
        catch (error) {
            console.error("Redis clear error:", error);
        }
    }
    async disconnect() {
        await this.client.quit();
    }
}
exports.RedisCacheService = RedisCacheService;
//# sourceMappingURL=RedisCacheService.js.map