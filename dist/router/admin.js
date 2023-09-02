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
const adminRouter = express.Router();
// validation schema
const validation_schema_1 = require("../core/lib/validation.schema");
// middleware
const validator_1 = __importDefault(require("../core/middleware/validator"));
// controller
const article_admin_controller_1 = __importDefault(require("../controllers/admin/article.admin.controller"));
const category_admin_controller_1 = __importDefault(require("../controllers/admin/category.admin.controller"));
// routes
adminRouter.get('/categories', category_admin_controller_1.default.findAll);
adminRouter.get('/categories/:id', category_admin_controller_1.default.findOne);
adminRouter.post('/categories', (0, validator_1.default)(validation_schema_1.categoryDtoSchema), category_admin_controller_1.default.create);
adminRouter.put('/categories/:id', (0, validator_1.default)(validation_schema_1.categoryDtoSchema), category_admin_controller_1.default.update);
adminRouter.delete('/categories/:id', category_admin_controller_1.default.delete);
adminRouter.get('/articles', article_admin_controller_1.default.findAll);
adminRouter.get('/articles/:id', article_admin_controller_1.default.findOne);
exports.default = adminRouter;
