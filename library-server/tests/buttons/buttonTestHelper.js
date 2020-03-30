const mongoose = require('mongoose')
const Book = require('../../schemas/bookSchema')


const validBook = 
    {
      title: 'Harry Potter',
      author: 'Teemu',
      description: 'All mighty wizard',
    }

const validBook2 = 
    {
        title: 'Harry Potter',
        author: 'Teemu',
        description: 'A boy with the scar',
    }

const invalidBook = 
    {
      title: '',
      author: 'Teemu',
      description: 'All mighty wizard',
    }


beforeEach(async () => {
    await Book.deleteMany({})
})

afterAll(() => {
    mongoose.connection.close()
})

const addBookAndReturnId = async () => {
    let bookObject = new Book(validBook)
    await bookObject.save()

    const savedBook = await Book.find({})

    return savedBook[0]._id
}

module.exports = {
    beforeEach,
    afterAll,
    validBook,
    invalidBook,
    addBookAndReturnId,
    validBook2
}