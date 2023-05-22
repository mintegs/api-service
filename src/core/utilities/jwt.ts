import jwt from 'jsonwebtoken'

export interface AccessToken {
  id: string
  iss: string
}

export interface AccessTokenPayload {
  id: string
  iss: string
}

export const signToken = (payload: AccessTokenPayload) =>
  jwt.sign(payload, process.env.JWT_KEY ?? 'jwt-key')

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_KEY ?? 'jwt-key', {
    issuer: 'mintegs',
  }) as AccessToken
}
