import 'dotenv/config'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { set } from 'mongoose'

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
