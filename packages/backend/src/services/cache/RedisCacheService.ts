import { createClient, RedisClientType } from "redis";
import { ICacheService } from "./ICacheService";

export class RedisCacheService implements ICacheService {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
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

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      console.warn("Redis not connected, returning null for key:", key);
      return null;
    }

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (!this.isConnected) {
      console.warn("Redis not connected, skipping set for key:", key);
      return;
    }

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
    if (!this.isConnected) {
      console.warn("Redis not connected, skipping delete for key:", key);
      return;
    }

    try {
      await this.client.del(key);
    } catch (error) {
      console.error("Redis delete error:", error);
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) {
      console.warn("Redis not connected, returning false for exists check:", key);
      return false;
    }

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Redis exists error:", error);
      return false;
    }
  }

  async clear(): Promise<void> {
    if (!this.isConnected) {
      console.warn("Redis not connected, skipping clear operation");
      return;
    }

    try {
      await this.client.flushAll();
    } catch (error) {
      console.error("Redis clear error:", error);
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      try {
        await this.client.quit();
        this.isConnected = false;
      } catch (error) {
        console.error("Redis disconnect error:", error);
      }
    }
  }

  isRedisConnected(): boolean {
    return this.isConnected;
  }
}
