import React from 'react'

//import material-ui
import { makeStyles } from '@material-ui/core/styles';

const NavBar = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
      height: '60px'
    },
  }));

export default NavBar