import "reflect-metadata";
import { config } from "dotenv";

// Load environment variables for tests
config({ path: ".env.test" });

// Ensure reflect-metadata is loaded before any entity imports
import "reflect-metadata";
