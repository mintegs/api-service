"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicErrorMessage = exports.ErrorMessage = void 0;
const i18n_1 = __importDefault(require("./i18n"));
let instance = null;
class ErrorMessage extends Error {
    status;
    properties;
    static instance;
    static getInstance() {
        if (!ErrorMessage.instance) {
            ErrorMessage.instance = new ErrorMessage();
        }
        return ErrorMessage.instance;
    }
    static setter(name, message, status, properties) {
        instance = this.getInstance();
        instance.name = name;
        instance.message = message;
        instance.status = status;
        instance.properties = properties;
        return instance;
    }
    static notFound(properties) {
        return this.setter('Resource not found', 'The specified Resource does not exist', 404, properties);
    }
    static badRequest(properties) {
        return this.setter('Bad request', 'Your request is invalid and the server is unable to respond', 400, properties);
    }
    static serverError(properties) {
        return this.setter('Internal Server Error', 'Request could not be carried out', 500, properties);
    }
}
exports.ErrorMessage = ErrorMessage;
class PublicErrorMessage {
    name;
    message;
    status;
    properties;
    static instance;
    static getInstance() {
        if (!PublicErrorMessage.instance) {
            PublicErrorMessage.instance = new PublicErrorMessage();
        }
        return PublicErrorMessage.instance;
    }
    static setter(error) {
        instance = this.getInstance();
        instance.name = error.name;
        instance.message = error.message;
        instance.status = error.status;
        instance.properties = error.properties;
        return instance;
    }
    get withOutStatus() {
        return {
            message: i18n_1.default.__(this.message),
            properties: this.properties,
        };
    }
}
exports.PublicErrorMessage = PublicErrorMessage;
