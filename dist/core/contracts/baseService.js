"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_bind_1 = __importDefault(require("auto-bind"));
const mail_1 = require("../utilities/mail");
class BaseService {
    mailService;
    constructor() {
        this.mailService = (0, mail_1.transporterInstance)();
        (0, auto_bind_1.default)(this);
    }
}
exports.default = BaseService;
