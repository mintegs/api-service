import { faker } from '@faker-js/faker'
import 'dotenv/config'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { set } from 'mongoose'
import request from 'supertest'
import core from '../src/core'
import { parseCookie } from '../src/core/utilities/cookie'

const app = new core().getApp()

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      authorization(
        email?: string,
        username?: string
      ): Promise<{ token: string; user: string }>
    }
  }
}

let mongod: MongoMemoryServer
beforeAll(async () => {
  process.env.JWT_KEY = 'jwtKey'
  process.env.EMAIL_PASSWORD = 'niujalerjhkdpncw'
  process.env.EMAIL_USER = 'mohamadresaaa@gmail.com'

  mongod = await MongoMemoryServer.create()
  const mongoUri = mongod.getUri()
  set('strictQuery', false)
  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongod.stop()
})

global.authorization = async (
  email = faker.internet.email().toLowerCase(),
  username = faker.internet.userName().toLowerCase()
) => {
  await request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username,
    })
    .expect(201)

  const user = await mongoose.connection
    .collection('users')
    .findOne({ email: email.toLowerCase(), username: username.toLowerCase() })

  const verifyCode = await mongoose.connection
    .collection('verification')
    .findOne({ user: user?._id })

  const response: request.Response = await request(app)
    .get(`/auth/verify-identity?code=${verifyCode?.code}`)
    .expect(302)

  const token = parseCookie(response.header['set-cookie'][0])

  return { token, user: user?._id }
}
