"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const category_model_1 = __importDefault(require("../../models/category.model"));
class CategoryRepository {
    categoryModel;
    constructor() {
        this.categoryModel = category_model_1.default;
    }
    async findAll(filter) {
        return await this.categoryModel.find({ ...filter }).lean();
    }
    async findOne(filter) {
        return await this.categoryModel.findOne({ ...filter }).lean();
    }
    async create(title, user) {
        await new this.categoryModel({
            title,
            user,
        }).save();
    }
    async update(id, title) {
        await this.categoryModel.findByIdAndUpdate(id, { title }).lean();
    }
    async delete(id) {
        await this.categoryModel.findByIdAndDelete(id).lean();
    }
}
exports.CategoryRepository = CategoryRepository;
exports.default = new CategoryRepository();
