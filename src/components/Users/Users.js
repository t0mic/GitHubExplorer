import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import User from "./User/User";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { API_STATES } from "../../utils/consts";

const useStyles = makeStyles((theme) => ({
  h4: {
    textTransform: "uppercase",
    margin: "15px 0",
    fontWeight: "bold",
  },
}));

const Users = ({ store }) => {
  const { users, getUserRepos, selectedUser, fetchingUsersStatus } = store;
  const classes = useStyles();
  const noUsersFound =
    users && !users.length && fetchingUsersStatus === API_STATES.LOADED;
  const isInitial = fetchingUsersStatus === API_STATES.INITIAL;

  if (fetchingUsersStatus === API_STATES.PENDING) {
    return <Loading />;
  }
  if (fetchingUsersStatus === API_STATES.ERROR) {
    return (
      <Error
        message={"Error occured while trying to fetch users. Please try later"}
      />
    );
  }

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography variant="h4" classes={{ h4: classes.h4 }} align="left">
            {noUsersFound
              ? "No users found"
              : isInitial
              ? "Search for github users"
              : "Users:"}
          </Typography>
        </Grid>
        {users &&
          users.map((user) => {
            return (
              <User
                key={user.username}
                user={user}
                getUserRepos={getUserRepos}
                selectedUser={selectedUser}
              />
            );
          })}
      </Grid>
    </Fragment>
  );
};

Users.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(Users);
