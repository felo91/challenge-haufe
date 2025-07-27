"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = require("dotenv");
const database_1 = require("./config/database");
const logger_1 = require("./config/logger");
const routes_1 = __importDefault(require("./routes"));
const logger_2 = require("./middleware/logger");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env["PORT"] || 3001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_2.loggerMiddleware);
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rick & Morty API",
            version: "1.0.0",
            description: "A sophisticated backend for Rick & Morty character management",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve);
app.get("/api-docs", swagger_ui_express_1.default.setup(specs));
app.use("/api", routes_1.default);
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use((err, _req, res, _next) => {
    logger_1.logger.error({ error: err.message, stack: err.stack }, "Unhandled error");
    res.status(500).json({ error: "Something went wrong!" });
});
app.use("*", (_req, res) => {
    res.status(404).json({ error: "Route not found" });
});
async function startServer() {
    try {
        await (0, database_1.initializeDatabase)();
        app.listen(PORT, () => {
            logger_1.logger.info(`🚀 Server running on port ${PORT}`);
            logger_1.logger.info(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
        });
    }
    catch (error) {
        logger_1.logger.error({ error }, "Failed to start server");
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map