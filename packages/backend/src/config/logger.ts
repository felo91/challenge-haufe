import pino from "pino";

const isDevelopment = process.env["NODE_ENV"] === "development";

// Create a development logger with enhanced pretty formatting
const devLogger = pino({
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
      messageFormat: "{msg}",
      customColors: "level:level",
      hideObject: false,
      singleLine: false,
      messageKey: "msg",
      errorLikeObjectKeys: ["err", "error"],
      customLogLevels: "res:10,req:10,err:10",
      customAttributeKeys: {
        req: "request",
        res: "response",
        reqId: "requestId",
        responseTime: "duration",
      },
    },
  },
  base: {
    env: "development",
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

// Use the prettier logger for development, standard logger for production
export const logger = isDevelopment
  ? devLogger
  : pino({
      level: "info",
      base: {
        env: process.env["NODE_ENV"] || "development",
      },
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
    });

export default logger;
