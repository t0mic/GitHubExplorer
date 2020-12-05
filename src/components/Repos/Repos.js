import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { API_STATES } from "../../utils/consts";
import Repo from "./Repo/Repo";

const useStyles = makeStyles(() => ({
  h4: {
    textTransform: "uppercase",
    margin: "15px 0",
    fontWeight: "bold",
  },
}));

const Repos = ({ store }) => {
  const {
    repos,
    getUserRepos,
    selectedUser,
    firstRepoCursor,
    getRepoIssues,
    getUsers,
    users,
    fetchingRepoStatus,
    fetchingUsersStatus,
  } = store;
  const { username } = useParams();
  useEffect(() => {
    users && !users.length && getUsers(username);
    getUserRepos && getUserRepos(username);
  }, [username, getUserRepos, getUsers, users]);
  const classes = useStyles();
  const noUsersFound =
    users && !users.length && fetchingUsersStatus === API_STATES.LOADED;
  const noReposFound =
    repos &&
    repos.edges &&
    !repos.edges.length &&
    fetchingRepoStatus === API_STATES.LOADED;

  // prev button
  const currentPageFirstRepoCursor =
    repos && repos.edges && repos.edges[0] && repos.edges[0].cursor;
  const lastRepoCursor =
    repos &&
    repos.edges &&
    repos.edges[repos.edges.length - 1] &&
    repos.edges[repos.edges.length - 1].cursor;
  const startCursor = repos && repos.pageInfo && repos.pageInfo.startCursor;
  const disabledPrevPage = firstRepoCursor === startCursor;
  // next button
  const disabledNextPage =
    repos && repos.pageInfo && !repos.pageInfo.hasNextPage;
  const handleNext = () => {
    getUserRepos(selectedUser, lastRepoCursor);
  };
  const handlePrev = () => {
    getUserRepos(selectedUser, undefined, currentPageFirstRepoCursor);
  };

  if (fetchingRepoStatus === API_STATES.PENDING) {
    return <Loading />;
  }
  if (fetchingRepoStatus === API_STATES.ERROR) {
    return (
      <Error
        message={
          "Error occured while trying to fetch repositories. Please try later"
        }
      />
    );
  }

  if (noUsersFound) return null;

  return (
    <Grid container spacing={1}>
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="h4" classes={{ h4: classes.h4 }} align="left">
          {noReposFound ? "No repositories found" : "Repositories:"}
        </Typography>
      </Grid>
      {repos &&
        repos.edges &&
        repos.edges.map((repo) => {
          return (
            <Repo
              key={repo.node.id}
              repo={repo.node}
              getRepoIssues={getRepoIssues}
            />
          );
        })}
      {!noReposFound && (
        <Pagination
          disabledPrevPage={disabledPrevPage}
          disabledNextPage={disabledNextPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      )}
    </Grid>
  );
};

Repos.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(Repos);
