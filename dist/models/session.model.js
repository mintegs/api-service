"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    device: {
        required: true,
        type: Object,
    },
    expiryDate: {
        required: true,
        type: Date,
    },
    ip: {
        required: true,
        type: String,
    },
    token: {
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
const Session = (0, mongoose_1.model)('Session', sessionSchema);
exports.default = Session;
