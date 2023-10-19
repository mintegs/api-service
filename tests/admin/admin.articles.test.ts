import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import request from 'supertest'
import core from '../../src/core'

const app = new core().getApp()

it('GET /admin/articles', async () => {
  const { token, user } = await global.authorization('ADMIN')
  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words({ count: 1 }).toLocaleLowerCase(),
      user,
    })

  await mongoose.connection.collection('articles').insertMany([
    {
      title: faker.word.words({ count: 3 }).toLocaleLowerCase(),
      content: faker.lorem.paragraphs(5),
      user,
      category: category.insertedId,
      image: faker.image.url(),
    },
    {
      title: faker.word.words({ count: 3 }).toLocaleLowerCase(),
      content: faker.lorem.paragraphs(5),
      user,
      category: category.insertedId,
      image: faker.image.url(),
    },
  ])

  const response = await request(app)
    .get('/admin/articles')
    .set('authorization', token)
    .expect(200)

  expect(response.body && Array.isArray([response.body.articles])).toBe(true)
  expect(response.body.articles[0].title).toBeDefined()
  expect(response.body.articles[0].user).toBeDefined()
  expect(response.body.articles[0].category).toBeDefined()
  expect(response.body.articles[0].createdAt).toBeDefined()
  expect(response.body.articles[0].updatedAt).toBeDefined()
  expect(response.body.articles[0].status).toBeDefined()

  expect(response.body.articles.length).toEqual(2)
})

it('GET /admin/articles/:id', async () => {
  const { token, user } = await global.authorization('ADMIN')
  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words({ count: 1 }).toLocaleLowerCase(),
      user,
    })

  const article = await mongoose.connection.collection('articles').insertOne({
    title: faker.word.words({ count: 3 }).toLocaleLowerCase(),
    content: faker.lorem.paragraphs(5),
    user,
    category: category.insertedId,
    image: faker.image.url(),
  })

  const response = await request(app)
    .get(`/admin/articles/${article.insertedId}`)
    .set('authorization', token)
    .expect(200)
  expect(response.body.article.title).toBeDefined()
  expect(response.body.article.user).toBeDefined()
  expect(response.body.article.category).toBeDefined()
  expect(response.body.article.content).toBeDefined()
  expect(response.body.article.image).toBeDefined()
})
