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

// Load environment variables
config();

const app = express();
const PORT = process.env["PORT"] || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use(loggerMiddleware);

// Swagger configuration
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

// Swagger UI
app.use("/api-docs", swaggerUi.serve as any);
app.get("/api-docs", swaggerUi.setup(specs) as any);

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ error: err.message, stack: err.stack }, "Unhandled error");
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error({ error }, "Failed to start server");
    process.exit(1);
  }
}

startServer();
