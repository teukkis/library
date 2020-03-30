
const supertest = require('supertest')
const app = require('../../app')
const Book = require('../../schemas/bookSchema')
const api = supertest(app)

const testHelper = require('./functionalityTestHelper')


test('books are returned as json', async () => {
  await api
    .get('/api/books')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('currently, there are two books in total', async () => {
  const response = await api.get('/api/books')

  expect(response.body).toHaveLength(2)
  expect(response.body).toHaveLength(testHelper.booksForTests.length)
})


test('The title of the first book is Harry Potter', async () => {
  const response = await api.get('/api/books')

  expect(response.body[0].title).toBe('Harry Potter')
})


test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/books')

  const contents = response.body.map(r => r.author)

  expect(contents).toContain('Legolas ja Gimli')
})


test('Add a new invalid book by demonstrating the save new button', async () => {

  await api
  .post('/api/books')
  .send(testHelper.invalidBook)   //tittle missing
  .expect(400)

  const response = await api.get('/api/books')

  expect(response.body).toHaveLength(testHelper.booksForTests.length)
})
