"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCacheService = void 0;
class InMemoryCacheService {
    constructor() {
        this.cache = new Map();
    }
    async get(key) {
        const item = this.cache.get(key);
        if (!item) {
            return null;
        }
        if (item.expiresAt && Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return null;
        }
        return item.value;
    }
    async set(key, value, ttl) {
        const expiresAt = ttl ? Date.now() + ttl * 1000 : undefined;
        this.cache.set(key, { value, expiresAt: expiresAt || undefined });
    }
    async delete(key) {
        this.cache.delete(key);
    }
    async exists(key) {
        const item = this.cache.get(key);
        if (!item) {
            return false;
        }
        if (item.expiresAt && Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
    async clear() {
        this.cache.clear();
    }
}
exports.InMemoryCacheService = InMemoryCacheService;
//# sourceMappingURL=InMemoryCacheService.js.map