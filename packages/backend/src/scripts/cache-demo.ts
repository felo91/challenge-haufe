#!/usr/bin/env tsx

import { CacheFactory } from "../services/cache/CacheFactory";

async function demonstrateCache() {
  console.log("🔧 Cache Implementation Demo");
  console.log("=============================");

  // Create cache service using factory
  const cacheService = CacheFactory.createCacheService();

  console.log(`Cache type: ${cacheService.constructor.name}`);
  console.log(`Environment: ${process.env["NODE_ENV"] || "development"}`);
  console.log(`Redis URL: ${process.env["REDIS_URL"] || "not set"}`);

  // Test basic operations
  console.log("\n🧪 Testing cache operations...");

  // Set a test value
  await cacheService.set("demo:test", { message: "Hello from cache!", timestamp: Date.now() }, 60);
  console.log("✅ Set cache value");

  // Get the value
  const cachedValue = await cacheService.get("demo:test");
  console.log("📖 Retrieved from cache:", cachedValue);

  // Check if exists
  const exists = await cacheService.exists("demo:test");
  console.log("🔍 Key exists:", exists);

  // Delete the value
  await cacheService.delete("demo:test");
  console.log("🗑️ Deleted cache value");

  // Check if still exists
  const stillExists = await cacheService.exists("demo:test");
  console.log("🔍 Key still exists:", stillExists);

  // If it's Redis, show connection status
  if ("isRedisConnected" in cacheService) {
    const redisService = cacheService as any;
    console.log("🔗 Redis connected:", redisService.isRedisConnected());
  }

  console.log("\n✅ Cache demo completed!");
}

// Run the demo
demonstrateCache().catch(console.error);
