"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleDtoSchema = exports.categoryDtoSchema = exports.verifyIdentitySchema = exports.signInGithubSchema = exports.signInGoogleSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
const validation_1 = require("../contracts/validation");
exports.signUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().toLowerCase().trim(),
        username: zod_1.z
            .string()
            .trim()
            .min(3)
            .max(25)
            .toLowerCase()
            .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,}$/, 'invalid'),
    }),
});
exports.signInSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().toLowerCase().trim(),
    }),
});
exports.signInGoogleSchema = zod_1.z.object({
    query: zod_1.z.object({
        scope: zod_1.z.string(),
        authuser: zod_1.z.string().optional(),
        prompt: zod_1.z.string().optional(),
        code: zod_1.z.string(),
    }),
});
exports.signInGithubSchema = zod_1.z.object({
    query: zod_1.z.object({
        path: zod_1.z.string(),
        code: zod_1.z.string(),
    }),
});
exports.verifyIdentitySchema = zod_1.z.object({
    params: zod_1.z.object({
        code: zod_1.z.string(),
    }),
});
exports.categoryDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().max(25).toLowerCase(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().optional(),
    }),
});
exports.articleDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().max(30).toLowerCase(),
        content: zod_1.z.string(),
        image: zod_1.z.string(),
        category: zod_1.z.string(),
        status: zod_1.z
            .custom((value) => (0, validation_1.existingArticleStatus)(value), {
            message: 'Invalid status',
        })
            .optional(),
    }),
    params: zod_1.z.object({
        title: zod_1.z.string().toLowerCase().optional(),
    }),
});
