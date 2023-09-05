"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const device_middleware_1 = __importDefault(require("./core/middleware/device.middleware"));
const errorHandler_middleware_1 = require("./core/middleware/errorHandler.middleware");
const ip_middleware_1 = __importDefault(require("./core/middleware/ip.middleware"));
const router_1 = __importDefault(require("./router"));
class Core {
    /** @define app */
    app;
    // Initialize express
    constructor() {
        this.app = (0, express_1.default)();
        /** Setup and using packages
         * @private
         * @package cors, compression, helmet, body-parser, morgan
         */
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                callback(null, true);
            },
            credentials: true,
        }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(device_middleware_1.default);
        this.app.use(ip_middleware_1.default);
        if (process.env.NODE_ENV === 'production')
            this.app.use((0, morgan_1.default)('combined'));
        // router
        this.app.use('/', router_1.default);
        // Errors management
        this.app.use('*', errorHandler_middleware_1.error404);
        this.app.use(errorHandler_middleware_1.errorHandler);
    }
    getApp() {
        return this.app;
    }
}
exports.default = Core;
