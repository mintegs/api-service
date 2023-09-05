"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = __importDefault(require("../core/contracts/baseController"));
const user_repository_1 = require("../core/repositories/user.repository");
const verification_repository_1 = require("../core/repositories/verification.repository");
const cookie_1 = require("../core/utilities/cookie");
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController extends baseController_1.default {
    authService;
    constructor(authService) {
        super();
        this.authService = authService;
    }
    setCookie(res, token, maxAge = 31 * 24 * 60 * 60 * 1000) {
        res.cookie('mintegs_token', token, {
            ...cookie_1.cookieOption,
            maxAge,
        });
    }
    async signUp(req, res, next) {
        try {
            await this.authService.signUp(req.body);
            return this.sendResponse(res, 201);
        }
        catch (error) {
            next(error);
        }
    }
    async signIn(req, res, next) {
        try {
            await this.authService.signIn(req.body.email);
            return this.sendResponse(res, 200);
        }
        catch (error) {
            next(error);
        }
    }
    async google({ query: { code }, ipAddress, device }, res, next) {
        try {
            const jwtToken = await this.authService.google({
                code: code,
                ipAddress: ipAddress,
                device: device,
            });
            this.setCookie(res, jwtToken);
            return res.redirect(302, `https://${process.env.DOMAIN}`);
        }
        catch (error) {
            next(error);
        }
    }
    async github({ query: { code }, ipAddress, device }, res, next) {
        try {
            const jwtToken = await this.authService.github({
                code: code,
                ipAddress: ipAddress,
                device: device,
            });
            this.setCookie(res, jwtToken);
            return res.redirect(302, `https://${process.env.DOMAIN}`);
        }
        catch (error) {
            next(error);
        }
    }
    async verifyIdentity({ params: { code }, device, ipAddress }, res, next) {
        try {
            const token = await this.authService.verifyIdentity({
                code,
                ipAddress: ipAddress,
                device: device,
            });
            this.setCookie(res, token);
            return res.redirect(`https://${process.env.DOMAIN}`);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new AuthController(new auth_service_1.default(new user_repository_1.UserRepository(), new verification_repository_1.VerificationRepository()));
