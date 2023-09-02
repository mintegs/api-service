"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessage_1 = require("../lib/errorMessage");
/** Validation data
 * @param schema
 * @package zod
 * @param {anyZodObject} schema
 */
exports.default = (schema) => async (req, res, next) => {
    try {
        // Check data with schema
        const { body, query, params } = await schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        // Set data
        req.body = body;
        req.query = query;
        req.params = params;
        return next();
    }
    catch (error) {
        // Get message
        const message = error.issues[0].path[1] +
            ' ' +
            error.issues[0].message.replace('String', '');
        // Return error
        next(errorMessage_1.ErrorMessage.setter('Invalid Data', message.replace(/\s\s+/g, ' '), 422));
    }
};
