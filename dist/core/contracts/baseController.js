"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_bind_1 = __importDefault(require("auto-bind"));
const models_1 = __importDefault(require("../../models"));
class BaseController {
    models;
    constructor() {
        (0, auto_bind_1.default)(this);
        this.models = { ...models_1.default };
    }
    /**
     * @method sendResponse
     * @param {response} res
     * @param {number} status default 200
     * @param {object} data
     * @returns response server
     */
    sendResponse(res, status = 200, data) {
        return res.status(status).json(data);
    }
}
exports.default = BaseController;
