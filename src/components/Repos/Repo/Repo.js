import React from "react";
import PropTypes from 'prop-types';
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { calculateDateDifference } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "50px",
    display: "flex",
    padding: "7px 15px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      cursor: "pointer",
    },
  },
  issueRoot: {
    minHeight: "50px",
    display: "flex",
    padding: "7px 15px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  content: {
    flexBasis: "60%",
  },
  info: {
    flexBasis: "40%",
    fontSize: "14px",
    fontStyle: "italic",
    textAlign: "right",
  },
}));

const RepoDetail = ({ isIssue, repo }) => {
  const classes = useStyles();
  if (isIssue) {
    const { author, createdAt } = repo;
    const daysAgo = calculateDateDifference(createdAt);
    return (
      <p className={classes.info}>
        {daysAgo ? `${daysAgo} days ago` : "today"} by {author.login}
      </p>
    );
  } else {
    const {
      stargazers: { totalCount: totalStars },
      watchers: { totalCount: totalWatchers },
    } = repo;
    return (
      <p className={classes.info}>
        {totalStars} stars / {totalWatchers} watching
      </p>
    );
  }
};

const Repo = ({ repo, isIssue }) => {
  const classes = useStyles();
  const history = useHistory();
  const pathname = history.location.pathname;
  const handleClick = () => {
    if (isIssue) return;
    history.push(`${pathname}/${repo.name}`);
  };
  return (
    <Grid item md={12} sm={12} xs={12}>
      <Paper
        classes={{ root: isIssue ? classes.issueRoot : classes.root }}
        onClick={handleClick}
      >
        <p className={classes.content}>{isIssue ? repo.title : repo.name}</p>
        <RepoDetail isIssue={isIssue} repo={repo} />
      </Paper>
    </Grid>
  );
};

Repo.propTypes = {
  repo: PropTypes.object.isRequired,
  isIssue: PropTypes.bool,
};

export default observer(Repo);
