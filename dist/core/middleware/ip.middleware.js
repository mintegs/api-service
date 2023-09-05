"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    // Get ip address
    const ip = req.headers['x-forwarded-for'];
    if (ip && process.env.NODE_ENV === 'production') {
        ip.split(',')[0].replace(',', '');
    }
    // Set ip address in req.ipAddress
    req.ipAddress = ip ?? '127.0.0.1';
    next();
};
