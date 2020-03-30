const mongoose = require('mongoose')
const Book = require('../../schemas/bookSchema')


const booksForTests = [
    {
      title: 'Harry Potter',
      author: 'Teemu',
      description: 'All mighty wizard',
    },
    {
      title: 'Sormustern loordi',
      author: 'Legolas ja Gimli',
      description: 'Too long story',
    },
  ]
  
  
  beforeEach(async () => {
    await Book.deleteMany({})
  
    let bookObject = new Book(booksForTests[0])
    await bookObject.save()
  
    bookObject = new Book(booksForTests[1])
    await bookObject.save()
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  module.exports = {
      beforeEach,
      afterAll,
      booksForTests
  }