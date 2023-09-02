"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    // Set default
    req.device = {
        name: 'unknown',
    };
    if (userAgent) {
        if (/like Mac OS X/.test(userAgent)) {
            req.device = {
                name: 'iOS',
                version: /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/
                    .exec(userAgent)?.[2]
                    .replace(/_/g, '.'),
            };
        }
        else if (/Android/.test(userAgent)) {
            req.device = {
                name: 'Android',
                version: /Android ([0-9\.]+)[\);]/.exec(userAgent)?.[1],
            };
        }
        else if (/(Intel|PPC) Mac OS X/.test(userAgent)) {
            req.device = {
                name: 'macOS',
                version: /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/
                    .exec(userAgent)?.[2]
                    .replace(/_/g, '.'),
            };
        }
        else if (/Windows NT/.test(userAgent)) {
            req.device = {
                name: 'Windows',
                version: /Windows NT ([0-9\._]+)[\);]/.exec(userAgent)?.[1],
            };
        }
        else if (/Linux/i.test(userAgent) && /X11/i.test(userAgent)) {
            req.device = {
                name: 'Linux',
            };
        }
    }
    next();
};
