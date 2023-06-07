import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import request from 'supertest'
import core from '../../src/core'

const app = new core().getApp()

it('GET /user/sessions', async () => {
  const { token } = await global.authorization()

  const response = await request(app)
    .get('/user/sessions')
    .set('authorization', token)
    .expect(200)
  expect(response.body && Array.isArray([response.body.sessions])).toBe(true)
  expect(response.body.sessions.length).toEqual(1)
})

it('DELETE /user/sessions/:id', async () => {
  const { token, user } = await global.authorization()

  const newSession = await mongoose.connection
    .collection('sessions')
    .insertOne({
      token: token + faker.internet.userName(),
      user,
      device: {
        name: 'unknown',
        version: '0.0.1',
      },
      ip: '198.168.0.0',
      expiryDate: new Date(
        new Date().setMilliseconds(31 * 24 * 60 * 60 * 1000)
      ),
    })

  await request(app)
    .delete(`/user/sessions/${newSession.insertedId}`)
    .set('authorization', token)
    .expect(200)

  expect(
    await mongoose.connection.collection('sessions').countDocuments({ user })
  ).toEqual(1)
})
