import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";
import { initializeDatabase } from "./config/database";
import { logger } from "./config/logger";
import routes from "./routes";
import { loggerMiddleware } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
config();

const app = express();
const PORT = process.env["PORT"] || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

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

const specs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve as any);
app.get("/api-docs", swaggerUi.setup(specs) as any);

app.use("/api", routes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.use("*", (_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      logger.info(`🚀 Server started successfully on port ${PORT}`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
      logger.info(`🎯 Environment: ${process.env["NODE_ENV"] || "development"}`);
    });
  } catch (error) {
    logger.error({ error }, "💥 Failed to start server");
    process.exit(1);
  }
}

startServer();
