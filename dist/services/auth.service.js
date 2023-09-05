"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseService_1 = __importDefault(require("../core/contracts/baseService"));
const errorMessage_1 = require("../core/lib/errorMessage");
const mail_1 = require("../core/utilities/mail");
const oauthAdapter_1 = require("../core/utilities/oauthAdapter");
class AuthService extends baseService_1.default {
    userRepository;
    verificationRepository;
    constructor(userRepository, verificationRepository) {
        super();
        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
    }
    async signUp({ email, username, }) {
        try {
            // Find user
            const existingUser = await this.userRepository.findByEmailOrUsername(email, username);
            // If existing user, handle it
            if (existingUser) {
                throw errorMessage_1.ErrorMessage.setter('Exists Data', `${existingUser.username === username ? 'Username' : 'Email'} is already`, 400);
            }
            // Create new user
            const newUser = await this.userRepository.create({
                email,
                username,
            });
            // Create a verification code for account activation
            const newVerification = await this.verificationRepository.create({
                user: newUser.id,
                expiryDate: new Date(new Date().setHours(new Date().getHours() + 2)),
            });
            if (process.env.NODE_ENV === 'production') {
                // Send verification code to email of user
                this.mailService.sendMail({
                    to: newUser.email,
                    from: '"Mintegs" <support@mintegs.com>',
                    subject: 'Confirm account',
                    html: (0, mail_1.authTemplate)({
                        intro: 'Welcome to Mintegs! We are very excited to have you as a member.',
                        action: {
                            instructions: 'Please confirm your account below',
                            buttonText: 'Confirm your account',
                        },
                        data: {
                            username: newUser.username,
                            code: newVerification.code,
                        },
                    }),
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async signIn(email) {
        try {
            // Find user
            const user = await this.userRepository.findByEmailOrUsername(email);
            // If find user, handle it
            if (user) {
                // If the user's status was suspended, handle it
                if (user.status === 'SUSPENDED') {
                    throw errorMessage_1.ErrorMessage.setter('Account status', 'Your account is suspended see support for reviewing your account', 403);
                }
                // Create a verification code for generate jwt
                const newVerification = await this.verificationRepository.create({
                    user: user.id,
                    // 10 minute
                    expiryDate: new Date(new Date().setMinutes(new Date().getMinutes() + 10)),
                });
                if (process.env.NODE_ENV === 'production') {
                    // Send verification code to email of user
                    this.mailService.sendMail({
                        to: user.email,
                        from: '"Mintegs" <support@mintegs.com>',
                        subject: 'Sign in account',
                        html: (0, mail_1.authTemplate)({
                            intro: 'This email is valid until 10 minutes from now.',
                            action: {
                                buttonText: 'Sign in your account',
                            },
                            data: {
                                username: user.username,
                                code: newVerification.code,
                            },
                        }),
                    });
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async google({ code, ipAddress, device, }) {
        try {
            // Get access_token and id_token
            const { access_token, id_token } = await (0, oauthAdapter_1.getGoogleTokens)(code);
            // Get user information from google
            const { email } = await (0, oauthAdapter_1.getGoogleUser)({
                access_token,
                id_token,
            });
            // Find user
            const user = await this.userRepository.findByEmailOrUsername(email);
            // If existing user, handle it
            if (user) {
                // If the user's status was suspended, handle it
                if (user.status === 'SUSPENDED') {
                    throw errorMessage_1.ErrorMessage.setter('Account status', 'Your account is suspended see support for reviewing your account', 403);
                }
                // If the user's status was inactive, change status to active
                if (user.status === 'INACTIVE') {
                    await user.set({ status: 'ACTIVE' }).save();
                }
                // Generate jwt token and create new session
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return await user.generateSession(ipAddress, device);
            }
            else {
                // Otherwise create new user
                const newUser = await this.userRepository.create({
                    email,
                    username: 'user' +
                        Math.floor(123456789 + Math.random() * 987654321).toString(),
                    status: 'ACTIVE',
                });
                // Generate jwt token and create new session
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return await newUser.generateSession(ipAddress, device);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async github({ code, ipAddress, device, }) {
        try {
            // Get access token from github
            const accessToken = await (0, oauthAdapter_1.getGithubToken)(code);
            // Send access token and get data of user
            const { email } = await (0, oauthAdapter_1.getGithubUser)(accessToken);
            if (email) {
                // Find user
                const user = await this.userRepository.findByEmailOrUsername(email);
                // If user existing, handle it
                if (user) {
                    // If the user's status was suspended, handle it
                    if (user.status === 'SUSPENDED') {
                        throw errorMessage_1.ErrorMessage.setter('Account status', 'Your account is suspended see support for reviewing your account', 403);
                    }
                    // If the user's status was inactive, change status to active
                    if (user.status === 'INACTIVE') {
                        await user.set({ status: 'ACTIVE' }).save();
                    }
                    // Generate jwt token and create new session
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return await user.generateSession(ipAddress, device);
                }
                else {
                    // Otherwise create new user
                    const newUser = await this.userRepository.create({
                        email,
                        username: 'user' +
                            Math.floor(123456789 + Math.random() * 987654321).toString(),
                        status: 'ACTIVE',
                    });
                    // Generate jwt token and create new session
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return await newUser.generateSession(ipAddress, device);
                }
            }
            throw errorMessage_1.ErrorMessage.badRequest();
        }
        catch (error) {
            throw error;
        }
    }
    async verifyIdentity({ code, ipAddress, device, }) {
        try {
            // Find verification
            const verification = await this.verificationRepository.findOne(code);
            // If find verification, handle it
            if (verification) {
                // If the user's status wasn't suspended, handle it
                if (verification.user.status !== 'SUSPENDED') {
                    // If the user's status was inactive, change status to active
                    if (verification.user.status === 'INACTIVE') {
                        // Change status to active
                        await verification.user.set({ status: 'ACTIVE' }).save();
                    }
                    // Expire verification
                    await verification.updateOne({ used: true });
                    // Generate jwt token and create new session and return it
                    return await verification.user.generateSession(ipAddress, device);
                }
            }
            // Otherwise, error 400
            throw errorMessage_1.ErrorMessage.badRequest();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = AuthService;
