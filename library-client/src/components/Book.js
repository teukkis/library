import React from 'react'

import Buttons from './Buttons'

//import material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const NewBook = ({requiredFields, bookInfo, handleNewBook, addBook, handleEditBook, handleDelete}) => {
    const classes = useStyles();

    const lastEditText = () => {
      if (bookInfo.lastEdited === '') {
        return <Typography variant="caption"></Typography>
      }
      else {
        return <Typography variant="caption">Last Edit: {bookInfo.lastEdited}</Typography>
      }
    }

    return (
        <div>
          <Typography display="block" variant="overline" color="secondary">{requiredFields.saveNew}</Typography>
          <Typography display="block" variant="overline" color="secondary">{requiredFields.save}</Typography>
          <Typography display="block" variant="overline" color="secondary">{requiredFields.delete}</Typography>

          <div>{lastEditText()}</div>
          <form className={classes.root} noValidate autoComplete="off">

            <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              placeholder="Title"
              variant="outlined"
              name="title"
              value={bookInfo.title}
              onChange={handleNewBook}
            />
            </Grid>

            <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              placeholder="Author"
              variant="outlined"
              name="author"
              value={bookInfo.author}
              onChange={handleNewBook}
            />
            </Grid>

            <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows="4"
              placeholder="Description"
              variant="outlined"
              name="description"
              value={bookInfo.description}
              onChange={handleNewBook}
            />
            </Grid>
        
            <Grid className={classes.buttons} item xs={12}>
              <Buttons addBook={addBook} handleEditBook={handleEditBook} handleDelete={handleDelete}/>
            </Grid>
            
          </form>
        </div>
        
    )
}

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    buttons: {
        padding: '10px',
    },
    
  }));

export default NewBook