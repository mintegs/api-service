"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404 = exports.errorHandler = void 0;
const errorMessage_1 = require("../lib/errorMessage");
const i18n_1 = __importDefault(require("../lib/i18n"));
const errorHandler = (error, _req, res, _next) => {
    if (process.env.NODE_ENV !== 'production') {
        res.status(error.status ? error.status : 500).json({
            message: i18n_1.default.__(error.message),
            stack: error.stack,
        });
    }
    else {
        errorMessage_1.PublicErrorMessage.setter(error);
        res
            .status(error.status ? error.status : 500)
            .json(errorMessage_1.PublicErrorMessage.getInstance().withOutStatus);
    }
};
exports.errorHandler = errorHandler;
const error404 = (req, res, next) => {
    try {
        if (process.env.NODE_ENV !== 'production')
            throw errorMessage_1.PublicErrorMessage.setter(errorMessage_1.ErrorMessage.notFound());
        return res.redirect(301, `https://${process.env.DOMAIN}/404`);
    }
    catch (error) {
        next(error);
    }
};
exports.error404 = error404;
