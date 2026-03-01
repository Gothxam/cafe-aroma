"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("MONGO_URI starts with:", process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 10) : "undefined");
console.log("MONGO_URI length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
