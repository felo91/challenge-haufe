"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process?.env?.["DB_HOST"] ?? "localhost",
    port: parseInt(process?.env?.["DB_PORT"] ?? "5432", 10),
    username: process?.env?.["DB_USERNAME"] ?? "postgres",
    password: process?.env?.["DB_PASSWORD"] ?? "postgres",
    database: process?.env?.["DB_NAME"] ?? "rick_morty_app",
    synchronize: process?.env?.["NODE_ENV"] === "development",
    logging: process?.env?.["NODE_ENV"] === "development",
    entities: [entities_1.User],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
});
const initializeDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Database connection established");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        console.log("Starting in development mode without database...");
        if (process.env["NODE_ENV"] === "production") {
            throw error;
        }
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=database.js.map