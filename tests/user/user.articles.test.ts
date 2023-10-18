import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import request from 'supertest'
import core from '../../src/core'

const app = new core().getApp()

it('GET /user/articles', async () => {
  const { token, user } = await global.authorization()
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
    .get('/user/articles')
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

it('POST /user/articles', async () => {
  const { token, user } = await global.authorization()
  const title = faker.word.words({ count: 3 })
  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words({ count: 1 }).toLocaleLowerCase(),
      user,
    })

  await request(app)
    .post('/user/articles')
    .set('authorization', token)
    .send({
      title,
      content: faker.lorem.paragraphs(5),
      category: category.insertedId,
      image: faker.image.url(),
    })
    .expect(201)

  await request(app)
    .post('/user/articles')
    .set('authorization', token)
    .send({
      title,
      content: faker.lorem.paragraphs(5),
      category: category.insertedId,
      image: faker.image.url(),
    })
    .expect(422)

  await request(app)
    .post('/user/articles')
    .set('authorization', token)
    .send({
      title: faker.word.words({ count: 3 }),
      content: faker.lorem.paragraphs(5),
      category: category.insertedId,
      image: faker.image.url(),
      status: 'active',
    })
    .expect(422)

  await request(app)
    .post('/user/articles')
    .set('authorization', token)
    .send({
      title: faker.word.words({ count: 3 }),
      content: faker.lorem.paragraphs(5),
      category: category.insertedId,
      image: faker.image.url(),
      status: 'ACTIVE',
    })
    .expect(201)

  expect(
    await mongoose.connection.collection('articles').countDocuments({ user })
  ).toEqual(2)
})

it('PUT /user/articles/:title', async () => {
  const { token, user } = await global.authorization()
  const articleTitle = faker.word.words({ count: 3 }).toLocaleLowerCase()
  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words({ count: 1 }).toLocaleLowerCase(),
      user,
    })

  await mongoose.connection.collection('articles').insertOne({
    title: articleTitle,
    content: faker.lorem.paragraphs(5),
    user,
    category: category.insertedId,
    image: faker.image.url(),
  })

  await request(app)
    .put(`/user/articles/${articleTitle}`)
    .set('authorization', token)
    .send({
      title: faker.word.words({ count: 3 }).toLocaleLowerCase(),
      content: faker.lorem.paragraphs(5),
      image: faker.image.url(),
      category: category.insertedId,
    })
    .expect(200)
})

it('DELETE /user/articles/:title', async () => {
  const { token, user } = await global.authorization()
  const articleTitle = faker.word.words({ count: 3 }).toLocaleLowerCase()
  const category = await mongoose.connection
    .collection('categories')
    .insertOne({
      title: faker.word.words({ count: 1 }).toLocaleLowerCase(),
      user,
    })

  await mongoose.connection.collection('articles').insertOne({
    title: articleTitle,
    content: faker.lorem.paragraphs(5),
    user,
    category: category.insertedId,
    image: faker.image.url(),
  })

  await request(app)
    .delete(`/user/articles/${articleTitle}`)
    .set('authorization', token)
    .expect(200)
})
