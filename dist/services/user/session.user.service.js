"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseService_1 = __importDefault(require("../../core/contracts/baseService"));
class SessionUserService extends baseService_1.default {
    sessionRepository;
    constructor(sessionRepository) {
        super();
        this.sessionRepository = sessionRepository;
    }
    async findAll(userId) {
        try {
            return await this.sessionRepository.findAll(userId);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id, userId) {
        try {
            await this.sessionRepository.delete(id, userId);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = SessionUserService;
