const supertest = require('supertest')
const app = require('../../app')
const Book = require('../../schemas/bookSchema')
const api = supertest(app)

const testHelper = require('./buttonTestHelper')


test('Add a new valid book by demonstrating the save new button', async () => {
  
  await api
    .post('/api/books')
    .send(testHelper.validBook)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/books')

  const description = response.body.map(res => res.description)

  expect(description).toContain('All mighty wizard')
})


test('Edit a book by demonstrating the save button', async () => {

  const idOfBookToBeEdited = await testHelper.addBookAndReturnId()
  
  await api
  .put(`/api/books/${idOfBookToBeEdited}`)
  .send(testHelper.validBook2)
  .expect(200)

  const response = await api.get('/api/books')

  const description = response.body.map(res => res.description)

  expect(description).toContain('A boy with the scar')

})

test('delete a book for good', async () => {

  const idOfBookToBeEdited = await testHelper.addBookAndReturnId()

  await api
  .delete(`/api/books/${idOfBookToBeEdited}`)
  .expect(200)

  const response = await api.get('/api/books')

  expect(response.body.length).toBe(0)

})