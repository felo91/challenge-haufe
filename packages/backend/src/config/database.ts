import { DataSource } from "typeorm";
import { User } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process?.env?.["DB_HOST"] ?? "localhost",
  port: parseInt(process?.env?.["DB_PORT"] ?? "5432", 10),
  username: process?.env?.["DB_USERNAME"] ?? "postgres",
  password: process?.env?.["DB_PASSWORD"] ?? "postgres",
  database: process?.env?.["DB_NAME"] ?? "rick_morty_app",
  synchronize: true, // Always synchronize in development
  logging: process?.env?.["NODE_ENV"] === "development",
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    console.log("Starting in development mode without database...");

    if (process.env["NODE_ENV"] === "production") {
      throw error;
    }
  }
};
