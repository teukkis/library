import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Buttons = ({addBook, handleEditBook, handleDelete}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={addBook} variant="contained">Save new</Button>
      <Button onClick={handleEditBook} variant="contained">Save</Button>
      <Button onClick={handleDelete} variant="contained">Delete</Button>
    </div>
  );
}

export default Buttons