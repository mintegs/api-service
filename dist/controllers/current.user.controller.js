"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../core/contracts/baseController"));
class CurrentUserController extends baseController_1.default {
    constructor() {
        super();
    }
    information(req, res, next) {
        try {
            this.sendResponse(res, 200, req.session.user.toJSON());
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new CurrentUserController();
