"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
class UserRepository {
    userModel;
    constructor() {
        this.userModel = user_model_1.default;
    }
    async findByEmailOrUsername(email, username) {
        return await this.userModel.findOne({
            $or: [{ email }, { username: username ?? email }],
        });
    }
    async create(data) {
        return await new this.userModel({
            ...data,
        }).save();
    }
}
exports.UserRepository = UserRepository;
exports.default = new UserRepository();
