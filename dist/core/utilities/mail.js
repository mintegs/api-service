"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTemplate = exports.transporterInstance = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporterInstance = () => {
    return nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER || '',
            pass: process.env.EMAIL_PASSWORD || '', // Password (for gmail, your app password)
        },
    });
};
exports.transporterInstance = transporterInstance;
const mailGenerator = new mailgen_1.default({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mintegs',
        link: `https://${process.env.DOMAIN}`,
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    },
});
const authTemplate = ({ intro, action: { instructions = '', buttonText }, data: { username, code }, }) => {
    const response = {
        body: {
            name: username,
            intro,
            action: {
                instructions,
                button: {
                    color: '#22BC66',
                    text: buttonText,
                    link: `https://auth.${process.env.DOMAIN}/verify-identity?code=${code}`,
                },
            },
            // outro:
            //   "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
    return mailGenerator.generate(response);
};
exports.authTemplate = authTemplate;
