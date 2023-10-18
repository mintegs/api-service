"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRepository = void 0;
const article_model_1 = __importDefault(require("../../models/article.model"));
class ArticleRepository {
    articleModel;
    constructor() {
        this.articleModel = article_model_1.default;
    }
    async findAll(filter) {
        return await this.articleModel
            .find({ ...filter })
            .populate({
            path: 'user',
            select: 'username -_id',
        })
            .populate({
            path: 'category',
            select: 'title -_id',
        })
            .select('title status createdAt updatedAt -_id')
            .sort('-createdAt')
            .lean();
    }
    async findOne(filter) {
        return await this.articleModel
            .findOne({ ...filter })
            .populate([
            { path: 'user', select: 'username -_id' },
            { path: 'category', select: 'title -_id' },
        ])
            .lean();
    }
    async create(data) {
        await new this.articleModel({
            ...data,
        }).save();
    }
    async update(query, data) {
        await this.articleModel.findOneAndUpdate({ ...query }, { ...data }).lean();
    }
    async delete(title, user) {
        await this.articleModel
            .findOneAndDelete({
            title,
            user,
        })
            .lean();
    }
}
exports.ArticleRepository = ArticleRepository;
exports.default = new ArticleRepository();
