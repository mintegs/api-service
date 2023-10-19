"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../../core/contracts/baseController"));
const article_repository_1 = require("../../core/repositories/article.repository");
const article_user_service_1 = __importDefault(require("../../services/user/article.user.service"));
class ArticleUserController extends baseController_1.default {
    articleUserService;
    constructor(articleUserService) {
        super();
        this.articleUserService = articleUserService;
    }
    async findAll({ session: { user } }, res, next) {
        try {
            const articles = await this.articleUserService.findAll({
                user: user.id,
            });
            return this.sendResponse(res, 200, { articles });
        }
        catch (error) {
            next(error);
        }
    }
    async create({ body, session: { user } }, res, next) {
        try {
            const newArticle = await this.articleUserService.create(body, user.id);
            return this.sendResponse(res, 201, newArticle);
        }
        catch (error) {
            next(error);
        }
    }
    async update({ body, params: { title }, session: { user } }, res, next) {
        try {
            await this.articleUserService.update({ title, user: user.id }, body);
            return this.sendResponse(res, 200);
        }
        catch (error) {
            next(error);
        }
    }
    async delete({ params: { title }, session: { user } }, res, next) {
        try {
            await this.articleUserService.delete(title, user.id);
            return this.sendResponse(res, 200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ArticleUserController(new article_user_service_1.default(new article_repository_1.ArticleRepository()));
