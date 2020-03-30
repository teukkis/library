import axios from 'axios'

const baseUrl = 'http://localhost:2123/api/books'

const getAllBooks = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getBook = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const deleteBook = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const createBook = async (bookObject) => {
    const response = await axios.post(baseUrl, bookObject)
    return response.data
}

const editBook = async (id, bookObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, bookObject)
    return response.data
}

export default {
    getAllBooks,
    getBook,
    deleteBook,
    createBook,
    editBook
}