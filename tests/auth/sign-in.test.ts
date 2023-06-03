import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import request from 'supertest'
import core from '../../src/core'
import { parseCookie } from '../../src/core/utilities/cookie'

const app = new core().getApp()

// Seed data fake
const email = faker.internet.email()
const username = faker.internet.userName()

it('returns a 422 with missing email or username', async () => {
  return request(app).post('/auth/sign-in').send({}).expect(422)
})

it('returns a 200 when not founded user', async () => {
  request(app)
    .post('/auth/sign-in')
    .send({
      email,
    })
    .expect(200)

  request(app)
    .post('/auth/sign-in')
    .send({
      email: username,
    })
    .expect(200)
})

it('returns a 200 when user is inactive and send verification code', async () => {
  await request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username,
    })
    .expect(201)

  await request(app)
    .post('/auth/sign-in')
    .send({
      email,
    })
    .expect(200)
  //   console.log('res', email)

  await request(app)
    .post('/auth/sign-in')
    .send({
      email: username,
    })
    .expect(200)
})

it('returns a 200 on successful login', async () => {
  await request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username,
    })
    .expect(201)

  await request(app)
    .post('/auth/sign-in')
    .send({
      email: username,
    })
    .expect(200)

  const verifyCode = await mongoose.connection
    .collection('verifications')
    .findOne(
      {},
      {
        sort: { expiryDate: 1 },
      }
    )

  const response: request.Response = await request(app).get(
    `/auth/verify-identity/${verifyCode?.code}`
  )

  expect(response.status).toBe(302)
  expect(parseCookie(response.header['set-cookie'][0])).toBeDefined()
})
