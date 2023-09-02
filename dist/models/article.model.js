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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const errorMessage_1 = require("../core/lib/errorMessage");
const articleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'INACTIVE',
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    autoIndex: true,
    timestamps: true,
});
articleSchema.post('save', function (error, doc, next) {
    if (error.code === 11000)
        throw errorMessage_1.ErrorMessage.setter('Invalid Data', 'Title is already', 422);
    else
        next();
});
const Article = mongoose_1.default.model('Article', articleSchema);
exports.default = Article;
