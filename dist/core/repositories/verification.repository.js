"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationRepository = void 0;
const verification_model_1 = __importDefault(require("../../models/verification.model"));
const bcrypt_1 = require("../utilities/bcrypt");
class VerificationRepository {
    verificationModel;
    constructor() {
        this.verificationModel = verification_model_1.default;
    }
    async generateCode() {
        return await (0, bcrypt_1.hash)(Math.floor(123456789 + Math.random() * 987654321).toString());
    }
    async create(data) {
        const code = await this.generateCode();
        return await await new this.verificationModel({
            ...data,
            code,
        }).save();
    }
    async findOne(code) {
        return await this.verificationModel
            .findOne({
            code,
            expiryDate: { $gt: new Date() },
            used: false,
        })
            .populate('user');
    }
}
exports.VerificationRepository = VerificationRepository;
exports.default = new VerificationRepository();
