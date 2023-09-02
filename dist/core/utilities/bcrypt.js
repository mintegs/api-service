"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
/**
 * @function hash
 * @param {string} text
 * @returns string
 */
const hash = async (text) => {
    const salt = (0, crypto_1.randomBytes)(8).toString('hex');
    const buf = (await scryptAsync(text, salt, 64));
    return `${buf.toString('hex')}.${salt}`;
};
exports.hash = hash;
