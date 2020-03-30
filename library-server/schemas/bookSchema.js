const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lastEdited: {
        type: String
    },
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book

