"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../../core/contracts/baseController"));
const article_repository_1 = require("../../core/repositories/article.repository");
const article_admin_service_1 = __importDefault(require("../../services/admin/article.admin.service"));
class ArticleAdminController extends baseController_1.default {
    articleAdminService;
    constructor(articleAdminService) {
        super();
        this.articleAdminService = articleAdminService;
    }
    async findAll(req, res, next) {
        try {
            const articles = await this.articleAdminService.findAll();
            return this.sendResponse(res, 200, {
                articles,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findOne({ params: { id } }, res, next) {
        try {
            const article = await this.articleAdminService.findOne({ _id: id });
            return this.sendResponse(res, 200, {
                article,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new ArticleAdminController(new article_admin_service_1.default(new article_repository_1.ArticleRepository()));
