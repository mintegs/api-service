"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const http_1 = require("http");
const mongoose_1 = require("mongoose");
const core_1 = __importDefault(require("./core"));
// Creating new instance of core
const core = new core_1.default();
const start = async () => {
    try {
        // Setup database and set configurations mongodb
        (0, mongoose_1.set)('strictQuery', false);
        await (0, mongoose_1.connect)(process.env.DATABASE_URL);
        console.log('Database connected');
        // Running server
        const port = process.env.PORT;
        await (0, http_1.createServer)(core.getApp()).listen(port, () => console.log(`Server is running on ${port}`));
    }
    catch (error) {
        throw error;
    }
};
exports.start = start;
