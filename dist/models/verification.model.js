"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const verificationSchema = new mongoose_1.Schema({
    code: {
        required: true,
        type: String,
        unique: true,
    },
    expiryDate: {
        required: true,
        type: Date,
    },
    used: {
        default: false,
        type: Boolean,
    },
    user: {
        ref: 'User',
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
    },
});
// Index fields
verificationSchema.index({ code: 1 });
verificationSchema.index({ expiryDate: -1 });
const Verification = (0, mongoose_1.model)('Verification', verificationSchema);
exports.default = Verification;
