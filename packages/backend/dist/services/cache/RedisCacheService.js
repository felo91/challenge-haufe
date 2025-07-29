"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheService = void 0;
const redis_1 = require("redis");
class RedisCacheService {
    constructor() {
        this.isConnected = false;
        this.client = (0, redis_1.createClient)({
            url: process.env["REDIS_URL"] || "redis://localhost:6379",
        });
        this.client.on("error", (err) => {
            console.error("Redis Client Error:", err);
            this.isConnected = false;
        });
        this.client.on("connect", () => {
            console.log("Redis client connected");
            this.isConnected = true;
        });
        this.client.on("disconnect", () => {
            console.log("Redis client disconnected");
            this.isConnected = false;
        });
        this.client.connect().catch((error) => {
            console.error("Failed to connect to Redis:", error);
            this.isConnected = false;
        });
    }
    async get(key) {
        if (!this.isConnected) {
            console.warn("Redis not connected, returning null for key:", key);
            return null;
        }
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
        if (!this.isConnected) {
            console.warn("Redis not connected, skipping set for key:", key);
            return;
        }
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
        if (!this.isConnected) {
            console.warn("Redis not connected, skipping delete for key:", key);
            return;
        }
        try {
            await this.client.del(key);
        }
        catch (error) {
            console.error("Redis delete error:", error);
        }
    }
    async exists(key) {
        if (!this.isConnected) {
            console.warn("Redis not connected, returning false for exists check:", key);
            return false;
        }
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
        if (!this.isConnected) {
            console.warn("Redis not connected, skipping clear operation");
            return;
        }
        try {
            await this.client.flushAll();
        }
        catch (error) {
            console.error("Redis clear error:", error);
        }
    }
    async disconnect() {
        if (this.isConnected) {
            try {
                await this.client.quit();
                this.isConnected = false;
            }
            catch (error) {
                console.error("Redis disconnect error:", error);
            }
        }
    }
    isRedisConnected() {
        return this.isConnected;
    }
}
exports.RedisCacheService = RedisCacheService;
//# sourceMappingURL=RedisCacheService.js.map