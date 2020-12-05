import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '150px',
      backgroundColor: theme.palette.error.light,
      marginTop: '20px',
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.primary.contrastText
  }
}));

const Error = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h2>{ message }</h2>
    </div>
  );
}
Error.propTypes = {
  message: PropTypes.string.isRequired
};
export default Error;