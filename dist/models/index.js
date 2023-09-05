"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("./category.model"));
const session_model_1 = __importDefault(require("./session.model"));
const user_model_1 = __importDefault(require("./user.model"));
const verification_model_1 = __importDefault(require("./verification.model"));
exports.default = {
    Session: session_model_1.default,
    User: user_model_1.default,
    Verification: verification_model_1.default,
    Category: category_model_1.default,
};
