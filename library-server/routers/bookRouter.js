const bookRouter = require('express').Router()
const Book = require('../schemas/bookSchema')
const date = require('date-and-time');

//fetch one book
bookRouter.get('/:id', async (req, res, next) => {
    
    const id = req.params.id
   
    try {
        const book = await Book.findOne({_id: id})
        res.json(book.toJSON())

    } catch (error) {
        next(error)
    }
})


//fetch all the books
bookRouter.get('/', async (req, res, next) => {
    try {
        const books = await Book.find({})
        res.json(books.map(book => book.toJSON()))

    } catch (error) {
        next(error)
    }
})


//delete a book
bookRouter.delete('/:id', async (req, res, next) => {

    const id = req.params.id
    
    await Book.findOneAndDelete({_id: id})
        .then( (docs) => {
            res.status(200).send(docs)

        }).catch((err)=>{
            next(err);
        })
})

//edit a book
bookRouter.put('/:id', async (req, res, next) => {

    const id = req.params.id
    const body = req.body
    const now = new Date()
    const formattedDate = date.format(now, 'HH:mm,   DD.MM.YYYY')

    await Book.findOneAndUpdate(
        {_id: id}, 
        { $set: 
            {
                body: body.title,
                author: body.author,
                description: body.description,
                lastEdited: formattedDate
            }
        }, 
        {returnNewDocument : true }) 

        .then( (docs) => {
            res.status(200).send(docs)

        }).catch((err)=>{
            next(err);
        })
    
})

//create a book
bookRouter.post('/', async (req, res, next) => {
    
    const body = req.body
    const now = new Date()
    const formattedDate = date.format(now, 'HH:mm,   DD.MM.YYYY')

    try {

        //create a new book object for the database
        const newBook = new Book({
            title: body.title,
            author: body.author,
            description: body.description,
            lastEdited: formattedDate
        })

        //save the new book and respond with... later
        const savedBook =  await newBook.save()
        
        res.json(savedBook)

    } catch (error) {
        next(error)
    }
})

module.exports = bookRouter


