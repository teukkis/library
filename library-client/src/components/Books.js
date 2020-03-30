import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Books = ({books, handleBookClick}) => {

    const classes = useStyles();

    //pass back to App.js an id of a book to be edited
    const handleEditBook = (bookId) => {
      handleBookClick(bookId)
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="left">Author</TableCell>   
                    <TableCell align="right"></TableCell>                  
                </TableRow>
                </TableHead>
                <TableBody>
                {books.map(book => (
                    <TableRow hover key={book._id} className={classes.row}>
                      <TableCell  component="th" scope="row">{book.title}</TableCell>
                      <TableCell align="left"> {book.author} </TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => handleEditBook(book._id)} aria-label="delete">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


const useStyles = makeStyles({
    table: {
      maxWidth: 550,
    },
    row: {
      
    }
  });


export default Books