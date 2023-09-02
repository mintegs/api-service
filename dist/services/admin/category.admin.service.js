"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseService_1 = __importDefault(require("../../core/contracts/baseService"));
class CategoryAdminService extends baseService_1.default {
    categoryRepository;
    constructor(categoryRepository) {
        super();
        this.categoryRepository = categoryRepository;
    }
    async findAll(filter) {
        try {
            return await this.categoryRepository.findAll(filter);
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(filter) {
        try {
            return await this.categoryRepository.findOne(filter);
        }
        catch (error) {
            throw error;
        }
    }
    async create(title, user) {
        try {
            await this.categoryRepository.create(title, user);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, title) {
        try {
            await this.categoryRepository.update(id, title);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            await this.categoryRepository.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CategoryAdminService;
