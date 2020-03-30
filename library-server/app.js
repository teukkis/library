const config = require('./configure/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const booksRouter = require('./routers/bookRouter')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./errorHandlers/errorHandler')


mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch (error => {
        console.log('Error while connecting to MongoDB')
    })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/books', booksRouter)

app.use(errorHandler.errorHandler)
app.use(errorHandler.unknownEndpoint)

app.all("*",errorHandler.incorrectAddress)

module.exports = app