import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1)
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`
    },
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  buttonRoot: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    color: fade(theme.palette.primary.contrastText, 0.5),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  }
}));

const Header = ({ store }) => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const handleChange = () => {
      history.push('/');
      store.getUsers(username);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            GitHub Explorer
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Users…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search users', 'maxLength': 39 }}
              onChange={e => setUsername(e.target.value)}
            />
            <Button variant="outlined" color="primary" onClick={handleChange} classes={{root: classes.buttonRoot}}>
                Search
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(Header)