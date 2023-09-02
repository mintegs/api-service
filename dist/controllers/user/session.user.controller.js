"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../../core/contracts/baseController"));
const session_repository_1 = require("../../core/repositories/session.repository");
const session_user_service_1 = __importDefault(require("../../services/user/session.user.service"));
class SessionUserController extends baseController_1.default {
    sessionUserService;
    constructor(sessionUserService) {
        super();
        this.sessionUserService = sessionUserService;
    }
    async findAll({ session }, res, next) {
        try {
            const sessions = await this.sessionUserService.findAll(session.user.id);
            return this.sendResponse(res, 200, { sessions });
        }
        catch (error) {
            next(error);
        }
    }
    async delete({ params: { id }, session }, res, next) {
        try {
            if (id !== session.id)
                await this.sessionUserService.delete(id, session.user.id);
            return this.sendResponse(res, 200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new SessionUserController(new session_user_service_1.default(new session_repository_1.SessionRepository()));
