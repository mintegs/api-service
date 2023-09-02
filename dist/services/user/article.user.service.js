"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseService_1 = __importDefault(require("../../core/contracts/baseService"));
class ArticleUserService extends baseService_1.default {
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
    async create(data, user) {
        try {
            await this.articleRepository.create({
                ...data,
                user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async update(query, data) {
        try {
            await this.articleRepository.update(query, data);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(title, user) {
        try {
            await this.articleRepository.delete(title, user);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ArticleUserService;
