"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const isDevelopment = process.env["NODE_ENV"] === "development";
const devLogger = (0, pino_1.default)({
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
exports.logger = isDevelopment
    ? devLogger
    : (0, pino_1.default)({
        level: "info",
        base: {
            env: process.env["NODE_ENV"] || "development",
        },
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
    });
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map