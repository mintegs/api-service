import request from 'supertest'
import core from '../../src/core'

const app = new core().getApp()

it('returns a 200 and user undefined when authorization empty or null', async () => {
  await request(app).get('/user').expect(200)
  await request(app).get('/user').set('authorization', '').expect(200)
  await request(app).get('/user').set('Cookie', '').expect(200)
})

it('returns a 200 on successful current client with token on authorization header', async () => {
  const { token } = await global.authorization()

  const response = await request(app)
    .get('/user')
    .set('authorization', token)
    .expect(200)
  expect(response.body && typeof response.body === 'object').toBe(true)
  expect(response.body.email).toBeDefined()
  expect(response.body.username).toBeDefined()
  expect(response.body.joined).toBeDefined()
  expect(response.body.updated).toBeDefined()
})

it('returns a 200 on successful current client with token on cookie', async () => {
  const { token } = await global.authorization()
  const response = await request(app)
    .get('/user')
    .set('Cookie', [`mintegs_token=${token}`])
    .expect(200)

  expect(response.body && typeof response.body === 'object').toBe(true)
  expect(response.body.username).toBeDefined()
  expect(response.body.joined).toBeDefined()
  expect(response.body.updated).toBeDefined()
})
