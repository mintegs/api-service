import request from 'supertest'
import core from '../src/core'

const app = new core().getApp()

it('returns a 404 when not found route in development mode', async () => {
  const response = await request(app).get('/fake-route').expect(404)
  expect(response.body).toBeDefined()
  expect(response.body).toEqual({
    message: 'The specified Resource does not exist',
  })
})

it('returns a 404 when not found route in production mode', async () => {
  process.env.NODE_ENV = 'production'

  return await request(app).get('/fake-route').expect(301)
})
