"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../../core/contracts/baseController"));
const category_repository_1 = require("../../core/repositories/category.repository");
const category_admin_service_1 = __importDefault(require("../../services/admin/category.admin.service"));
class CategoryAdminController extends baseController_1.default {
    categoryAdminService;
    constructor(categoryAdminService) {
        super();
        this.categoryAdminService = categoryAdminService;
    }
    async findAll(req, res, next) {
        try {
            const categories = await this.categoryAdminService.findAll();
            return this.sendResponse(res, 200, {
                categories,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findOne({ params: { id } }, res, next) {
        try {
            const category = await this.categoryAdminService.findOne({ _id: id });
            return this.sendResponse(res, 200, {
                category,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async create({ body: { title }, session }, res, next) {
        try {
            const newCategory = await this.categoryAdminService.create(title, session.user.id);
            return this.sendResponse(res, 201, newCategory);
        }
        catch (error) {
            next(error);
        }
    }
    async update({ params: { id }, body: { title } }, res, next) {
        try {
            const updateCategory = await this.categoryAdminService.update(id, title);
            return this.sendResponse(res, 200, updateCategory);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await this.categoryAdminService.delete(req.params.id);
            return this.sendResponse(res, 200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new CategoryAdminController(new category_admin_service_1.default(new category_repository_1.CategoryRepository()));
