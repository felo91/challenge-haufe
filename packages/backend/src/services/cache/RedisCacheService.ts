import { createClient, RedisClientType } from "redis";
import { ICacheService } from "./ICacheService";

export class RedisCacheService implements ICacheService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env["REDIS_URL"] || "redis://localhost:6379",
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    this.client.connect().catch(console.error);
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.client.setEx(key, ttl, serializedValue);
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (error) {
      console.error("Redis set error:", error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error("Redis delete error:", error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Redis exists error:", error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.client.flushAll();
    } catch (error) {
      console.error("Redis clear error:", error);
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}
