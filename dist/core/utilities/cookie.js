"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = exports.cookieOption = void 0;
exports.cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    domain: `.${process.env.DOMAIN ?? 'localhost'}`,
    // day  hour  min  sec  ms
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
};
const parseCookie = (cookie) => {
    const unparsedCookie = cookie.split(';')[0];
    return unparsedCookie.split('=')[1];
};
exports.parseCookie = parseCookie;
