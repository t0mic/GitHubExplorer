import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.9),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.9),
    },
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  customBtn: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function SearchBar({ store }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const handleChange = () => {
    store.getUsers(username);
  };
  return (
    <div className={classes.root}>
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
          inputProps={{ "aria-label": "search users", maxLength: 39 }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="outlined"
          color="primary"
          classes={{ root: classes.customBtn }}
          onClick={handleChange}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  store: PropTypes.object.isRequired
};
