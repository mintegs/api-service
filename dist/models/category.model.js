"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const errorMessage_1 = require("../core/lib/errorMessage");
const categorySchema = new mongoose_1.Schema({
    title: {
        required: true,
        type: String,
        unique: true,
    },
    user: {
        ref: 'User',
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, { autoIndex: true, timestamps: true });
categorySchema.post('save', function (error, doc, next) {
    if (error.code === 11000)
        throw errorMessage_1.ErrorMessage.setter('Invalid Data', 'Title is already', 422);
    else
        next();
});
categorySchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'category',
    count: true,
});
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.default = Category;
