"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepository = void 0;
const session_model_1 = __importDefault(require("../../models/session.model"));
class SessionRepository {
    sessionModel;
    constructor() {
        this.sessionModel = session_model_1.default;
    }
    async create(data) {
        await new this.sessionModel({
            ...data,
        }).save();
    }
    async findWithPopulate(user, token) {
        return await this.sessionModel
            .findOne({
            expiryDate: { $gt: new Date() },
            token,
            user,
        })
            .populate({
            path: 'user',
            select: '-status',
        });
    }
    async findAll(user) {
        return await this.sessionModel
            .find({
            user,
        })
            .lean();
    }
    async delete(id, user) {
        await this.sessionModel
            .findOneAndDelete({
            _id: id,
            user,
        })
            .lean();
    }
}
exports.SessionRepository = SessionRepository;
exports.default = new SessionRepository();
