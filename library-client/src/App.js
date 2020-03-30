import React, {useState, useEffect} from 'react';

//import components
import Book from './components/Book'
import Books from './components/Books'
import NavBar from './components/NavBar'

//import services
import bookService from './services/BookService'

//import material-ui
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const App = () => {

  const emptyBook = {title: '', author:'', description:'', lastEdited:''}
  const emptyWarnings = {saveNew: '', save:'', delete:''}

  //set all the books to books' state
  const [books, setBooks] = useState([])

  //set current values of textfields
  const [bookInfo, setBookInfo] = useState({ ...emptyBook })

  //set a book that is being edit
  const [clickedBook, setClickedBook] = useState({ ...emptyBook })

  //gather history of events
  const [history, setHistory] = useState([])

  //messages for invalid use of buttons
  const [requiredFields, setRequiredFields] = useState({...emptyWarnings}) 
  

  //function will be passed to Book component
  //set state of bookinfo to match values on textfields 
  const handleNewBook = (event) => {
      setBookInfo({ ...bookInfo, [event.target.name]: [event.target.value] })
  }


  //function will be passed to Books component
  //set state of bookInfo to match values of book to be edited
  const handleBookClick = (bookId) => {

    try {
      bookService
      .getBook(bookId)
      .then(response => {
          setClickedBook(response)
          setBookInfo(response)
          setRequiredFields({...emptyWarnings})
      })
    } catch (error) {
      window.alert(error)
    }
  }


  //function will be passed to Book component
  //create a new book object based on values of textfields, and save it to the database
  const addBook = (event) => {
    event.preventDefault()

    const newBookObject = {
        title: bookInfo.title.toString(),
        author: bookInfo.author.toString(),
        description: bookInfo.description.toString()
    }

    try {
        bookService
        .createBook(newBookObject)
        .then(response => {

          if (response.errors === undefined) {
            setBookInfo(emptyBook)
            setHistory(newBookObject)
            setClickedBook({...emptyBook})
            setRequiredFields({...emptyWarnings})
          } 
          else {
            setRequiredFields({...emptyWarnings, saveNew: 'Fill out all the fields'})
          }
        })
    } catch (error) {
        window.alert(error)
    }
  }


  //function will be passed to Book component
  //edit a book object based on values of textfields, and save the edited book to the database
  const handleEditBook = (event) => {
    event.preventDefault()

    if (clickedBook.title !== '') { //if a book is clicked for editing

      const newBookObject = {
        title: bookInfo.title.toString(),
        author: bookInfo.author.toString(),
        description: bookInfo.description.toString()
      }

      try {
        bookService
        .editBook(clickedBook._id, newBookObject)
        .then(response => {
          setBookInfo(emptyBook)
          setHistory(newBookObject)
          setClickedBook({...emptyBook})
        })
            
      } catch (error) {
          window.alert(error)
      }
    } 
    else {
      setRequiredFields({...emptyWarnings, save: 'You need choose a book before edit'})
    }
  }


  //function will be passed to Book component
  //delete the book which is displayed on textfields
  //book resourceId has to match with the book to be deleted 
  const handleDelete = () => {
        
    if (clickedBook.title !== '') { //if a book is clicked for editing
      try {
        bookService
        .deleteBook(clickedBook._id)
        .then(response => {
          setBookInfo(emptyBook)
          setHistory(emptyBook)
          setClickedBook({...emptyBook})
        })
            
      } catch (error) {
          window.alert(error)
      }
    } 
    else {
      setRequiredFields({...emptyWarnings, delete: 'You need choose a book before delete'})
    }
  }

  //fetch books from the database and set into books' state
  useEffect(() => {
    bookService.getAllBooks()
    .then(response => {
      setBooks(response)
    })
  }, [history])

  return (
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={6}>
            <Book 
              requiredFields={requiredFields} 
              bookInfo={bookInfo} 
              handleNewBook={handleNewBook} 
              addBook={addBook} 
              handleEditBook={handleEditBook} 
              handleDelete={handleDelete}
              />
            </Grid>
          <Grid item xs={6}>
            <Books books={books} handleBookClick={handleBookClick}/>
          </Grid>
          
        </Grid>
      </Container>
    
  );
}

export default App;
