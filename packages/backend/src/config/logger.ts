import pino from "pino";

const isDevelopment = process.env["NODE_ENV"] === "development";

const loggerConfig: any = {
  level: isDevelopment ? "debug" : "info",
  base: {
    env: process.env["NODE_ENV"] || "development",
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

if (isDevelopment) {
  loggerConfig.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

export const logger = pino(loggerConfig);

export default logger;
