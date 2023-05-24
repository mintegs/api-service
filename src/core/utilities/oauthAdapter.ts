import axios from 'axios'
import { GoogleOauthToken, GoogleUser } from '../contracts/oauth'

/**
 * @function getGoogleTokens
 * @description this function is used to get token_id and access_token using the code sent from google
 * @param {string} code
 * @returns {object} access_token, expires_in, scope, token_type, id_token,
 */
export const getGoogleTokens = async (
  code: string
): Promise<GoogleOauthToken> => {
  try {
    const url = 'https://www.googleapis.com/oauth2/v4/token'
    const { data } = await axios.post(
      url,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_SECRET || '',
        redirect_uri: `https://auth.${process.env.DOMAIN}/sign-in-google`,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    return data
  } catch (error) {
    throw error
  }
}

/**
 * @function getGoogleUser
 * @description this function is to send access_token and token_id to google server to get email and user information
 * @param {string} access_token
 * @param {string} id_token
 * @returns {object} id, email, verified_email, name, given_name, family_name, picture, locale
 */
export const getGoogleUser = async ({
  access_token,
  id_token,
}: {
  access_token: string
  id_token: string
}): Promise<GoogleUser> => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}
