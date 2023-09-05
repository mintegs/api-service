"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessage_1 = require("../lib/errorMessage");
exports.default = (role) => {
    return ({ session }, res, next) => {
        if (session.user.role === role) {
            return next();
        }
        // Otherwise return error
        next(errorMessage_1.ErrorMessage.setter('Access denied', 'Authentication failed', 403));
    };
};
