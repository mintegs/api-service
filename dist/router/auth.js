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
const authRouter = express.Router();
// validation schema
const validation_schema_1 = require("../core/lib/validation.schema");
// middleware
const validator_1 = __importDefault(require("../core/middleware/validator"));
// controller
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
authRouter.post('/sign-up', (0, validator_1.default)(validation_schema_1.signUpSchema), auth_controller_1.default.signUp);
authRouter.post('/sign-in', (0, validator_1.default)(validation_schema_1.signInSchema), auth_controller_1.default.signIn);
authRouter.get('/google', (0, validator_1.default)(validation_schema_1.signInGoogleSchema), auth_controller_1.default.google);
authRouter.get('/github', (0, validator_1.default)(validation_schema_1.signInGithubSchema), auth_controller_1.default.github);
authRouter.get('/verify-identity/:code', auth_controller_1.default.verifyIdentity);
exports.default = authRouter;
