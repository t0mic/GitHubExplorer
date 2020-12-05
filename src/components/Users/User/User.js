import React from "react";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import styles from "../Users.module.css";

const useStyles = makeStyles((theme) => ({
  h6: {
    textTransform: "lowercase",
    marginTop: "15px",
    fontWeight: "bold",
  },
}));

const User = ({ user, selectedUser }) => {
  const history = useHistory();
  const classes = useStyles();
  const { username, avatarUrl } = user;
  const itemClasses = `${styles.userItem} ${
    selectedUser === username ? styles.activeUser : ""
  }`;
  return (
    <Grid item xs={6} md={2} sm={2} onClick={() => history.push(`${username}`)}>
      <div
        className={itemClasses}
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      />
      <Typography variant="h6" classes={{ h6: classes.h6 }} align="center">
        {username}
      </Typography>
    </Grid>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  selectedUser: PropTypes.string,
};

export default observer(User);
