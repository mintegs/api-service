"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseService_1 = __importDefault(require("../../core/contracts/baseService"));
class ArticleAdminService extends baseService_1.default {
    articleRepository;
    constructor(articleRepository) {
        super();
        this.articleRepository = articleRepository;
    }
    async findAll(filter) {
        try {
            return await this.articleRepository.findAll(filter);
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(filter) {
        try {
            return await this.articleRepository.findOne(filter);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ArticleAdminService;
