"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleUser = exports.getGoogleTokens = exports.getGithubUser = exports.getGithubToken = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * @function getGithubToken
 * @description this function is used to get access_token using the code sent from github
 * @param {string} code
 * @returns {string} access_token
 */
const getGithubToken = async (code) => {
    try {
        const clientId = process.env.GITHUB_CLIENT_ID || '';
        const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
        const { data } = await axios_1.default.post(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`);
        const objectData = new URLSearchParams(data);
        return objectData.get('access_token');
    }
    catch (error) {
        throw error;
    }
};
exports.getGithubToken = getGithubToken;
/**
 * @function getGithubUser
 * @description this function is to send access_token to github server to get email and user information
 * @param {string} access_token
 * @returns {object} GitHubUser
 */
const getGithubUser = async (accessToken) => {
    try {
        const { data } = await axios_1.default.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    }
    catch (error) {
        throw error;
    }
};
exports.getGithubUser = getGithubUser;
/**
 * @function getGoogleTokens
 * @description this function is used to get token_id and access_token using the code sent from google
 * @param {string} code
 * @returns {object} access_token, expires_in, scope, token_type, id_token,
 */
const getGoogleTokens = async (code) => {
    try {
        const url = 'https://www.googleapis.com/oauth2/v4/token';
        const { data } = await axios_1.default.post(url, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            client_secret: process.env.GOOGLE_SECRET || '',
            redirect_uri: `https://api.${process.env.DOMAIN}/auth/google`,
            grant_type: 'authorization_code',
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return data;
    }
    catch (error) {
        throw error;
    }
};
exports.getGoogleTokens = getGoogleTokens;
/**
 * @function getGoogleUser
 * @description this function is to send access_token and token_id to google server to get email and user information
 * @param {string} access_token
 * @param {string} id_token
 * @returns {object} id, email, verified_email, name, given_name, family_name, picture, locale
 */
const getGoogleUser = async ({ access_token, id_token, }) => {
    try {
        const { data } = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`,
            },
        });
        return data;
    }
    catch (error) {
        throw error;
    }
};
exports.getGoogleUser = getGoogleUser;
