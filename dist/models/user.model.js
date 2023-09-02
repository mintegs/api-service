"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const session_repository_1 = __importDefault(require("../core/repositories/session.repository"));
const jwt_1 = require("../core/utilities/jwt");
const userSchema = new mongoose_1.Schema({
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    email: {
        lowercase: true,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    job: {
        type: String,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
    },
    status: {
        default: 'INACTIVE',
        type: String,
    },
    username: {
        lowercase: true,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    socials: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            // Update fields
            ret.birthday = ret.birthday
                ? ret.birthday.toISOString().slice(0, 10)
                : ret.birthday;
            ret.joined = ret?.createdAt?.toISOString().slice(0, 10);
            ret.updated = ret?.updatedAt?.toISOString().slice(0, 10);
            // Delete fields from json
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
});
// Index fields
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });
/** Create session if user login is successful and return jwt token
 * @param {string} ip
 * @param {object} device
 * @return {string} token
 */
userSchema.methods.generateSession = async function (ip, device) {
    // Generate jwt token
    const token = (0, jwt_1.signToken)({
        id: this.id,
        iss: 'mintegs',
    });
    // Create new session
    await session_repository_1.default.create({
        device,
        user: this.id,
        token,
        ip,
        expiryDate: new Date(new Date().setMilliseconds(31 * 24 * 60 * 60 * 1000)),
    });
    // Return jwt token
    return token;
};
// userSchema.plugin(paginate)
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
