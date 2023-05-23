import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * @function hash
 * @param {string} text
 * @returns string
 */
export const hash = async (text: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex')
  const buf = (await scryptAsync(text, salt, 64)) as Buffer

  return `${buf.toString('hex')}.${salt}`
}
