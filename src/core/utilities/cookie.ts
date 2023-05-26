import { CookieOptions } from 'express'

export const cookieOption: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  domain: `.${process.env.DOMAIN ?? 'localhost'}`,
  // day  hour  min  sec  ms
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: '/',
}

export const parseCookie = (cookie: string) => {
  const unparsedCookie = cookie.split(';')[0]

  return unparsedCookie.split('=')[1]
}
