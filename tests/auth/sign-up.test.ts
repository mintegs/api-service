import { faker } from '@faker-js/faker'
import request from 'supertest'
import core from '../../src/core'

const app = new core().getApp()

// Seed data fake
const email = faker.internet.email()
const username = faker.internet.userName()

it('returns a 422 with missing email, username', async () => {
  return request(app).post('/auth/sign-up').send({}).expect(422)
})

it('returns a 422 with on invalid email', async () => {
  return request(app)
    .post('/auth/sign-up')
    .send({
      email: username,
      username,
    })
    .expect(422)
})

it('returns a 422 with on invalid username', async () => {
  return request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username: email,
    })
    .expect(422)
})

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username,
    })
    .expect(201)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username,
    })
    .expect(201)

  await request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username: faker.internet.userName(),
    })
    .expect(400)
    .then((res) => expect(res.body.message).toEqual('Email is already'))
})

it('disallows duplicate usernames', async () => {
  await request(app)
    .post('/auth/sign-up')
    .send({
      email,
      username,
    })
    .expect(201)

  await request(app)
    .post('/auth/sign-up')
    .send({
      email: faker.internet.email(),
      username,
    })
    .expect(400)
    .then((res) => expect(res.body.message).toEqual('Username is already'))
})
