import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import request from 'supertest'
import core from '../../src/core'

const app = new core().getApp()

it('GET /admin/categories', async () => {
  const { token, user } = await global.authorization('ADMIN')

  await mongoose.connection.collection('categories').insertMany([
    {
      title: faker.word.words(),
      user,
    },
    {
      title: faker.word.words(),
      user,
    },
  ])

  const response = await request(app)
    .get('/admin/categories')
    .set('authorization', token)
    .expect(200)
  expect(response.body && Array.isArray([response.body.categories])).toBe(true)
})

it('GET /admin/categories/:id', async () => {
  const { token, user } = await global.authorization('ADMIN')

  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words(),
      user,
    })

  const response = await request(app)
    .get(`/admin/categories/${category.insertedId}`)
    .set('authorization', token)
    .expect(200)

  expect(response.body && typeof response.body === 'object').toBe(true)
  expect(response.body.category.title).toBeDefined()
  expect(response.body.category._id).toBeDefined()
  expect(response.body.category.user).toBeDefined()
})

it('POST /admin/categories', async () => {
  const { token } = await global.authorization('ADMIN')

  await request(app)
    .post('/admin/categories')
    .set('authorization', token)
    .send({
      title: faker.word.words({ count: 1 }),
    })
    .expect(201)

  expect(
    await mongoose.connection.collection('categories').countDocuments()
  ).toEqual(1)
})

it('PUT /admin/categories/:id', async () => {
  const { token, user } = await global.authorization('ADMIN')
  const title = faker.word.words().toLocaleLowerCase()

  await request(app)
    .post('/admin/categories')
    .set('authorization', token)
    .send({
      title,
    })
    .expect(201)

  const category = await mongoose.connection.collection('categories').findOne({
    title,
    user,
  })

  const newTitle = faker.word.words().toLocaleLowerCase()

  await request(app)
    .put(`/admin/categories/${category?._id}`)
    .set('authorization', token)
    .send({
      title: newTitle,
    })
    .expect(200)
})

it('DELETE /admin/categories/:id', async () => {
  const { token, user } = await global.authorization('ADMIN')

  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words().toLocaleLowerCase(),
      user,
    })

  await request(app)
    .delete(`/admin/categories/${category?.insertedId}`)
    .set('authorization', token)
    .expect(200)
  expect(
    await mongoose.connection.collection('categories').countDocuments()
  ).toEqual(0)
})
