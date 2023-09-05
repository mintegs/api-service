"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const userRouter = express.Router();
// validation schema
const validation_schema_1 = require("../core/lib/validation.schema");
// middleware
const validator_1 = __importDefault(require("../core/middleware/validator"));
// controller
const current_user_controller_1 = __importDefault(require("../controllers/current.user.controller"));
const article_user_controller_1 = __importDefault(require("../controllers/user/article.user.controller"));
const session_user_controller_1 = __importDefault(require("../controllers/user/session.user.controller"));
userRouter.get('/', current_user_controller_1.default.information);
userRouter.get('/sessions', session_user_controller_1.default.findAll);
userRouter.delete('/sessions/:id', session_user_controller_1.default.delete);
userRouter.get('/articles', article_user_controller_1.default.findAll);
userRouter.post('/articles', (0, validator_1.default)(validation_schema_1.articleDtoSchema), article_user_controller_1.default.create);
userRouter.put('/articles/:title', (0, validator_1.default)(validation_schema_1.articleDtoSchema), article_user_controller_1.default.update);
userRouter.delete('/articles/:title', article_user_controller_1.default.delete);
exports.default = userRouter;
