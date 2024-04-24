"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
var dbConfig_1 = require("./dbConfig");
Object.defineProperty(exports, "connectDB", { enumerable: true, get: function () { return __importDefault(dbConfig_1).default; } });
