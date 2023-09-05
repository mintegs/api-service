"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessage_1 = require("../lib/errorMessage");
const session_repository_1 = __importDefault(require("../repositories/session.repository"));
const jwt_1 = require("../utilities/jwt");
exports.default = async (req, res, next) => {
    try {
        // Get jwt token from headers.authorization or cookies.mintegs_token
        const token = req.headers?.authorization ||
            req.cookies?.mintegs_token;
        // If exists token, handle it
        if (token) {
            // Verify token
            const { id } = (0, jwt_1.verifyToken)(token);
            // Find session in mongodb with jwt token and user.id and populate user collection
            const session = await session_repository_1.default.findWithPopulate(id, token);
            // If exists, handle it
            if (session) {
                // If user status is suspended
                if (session.user.status === 'SUSPENDED') {
                    throw errorMessage_1.ErrorMessage.setter('Account status', 'Your account is suspended see support for reviewing your account', 403);
                }
                // Set user to req.session and return next
                req.session = session;
                return next();
            }
        }
        throw errorMessage_1.ErrorMessage.setter('Unauthorized', 'Authentication failed', 401);
    }
    catch (error) {
        next(error);
    }
};
