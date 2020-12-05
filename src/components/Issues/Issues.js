import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Repo from '../Repos/Repo/Repo';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import NewIssueModal from '../Modals/NewIssueModal/NewIssueModal';
import Pagination from '../Pagination/Pagination';
import { API_STATES } from '../../utils/consts'

const useStyles = makeStyles((theme) => ({
  h4: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    flexBasis: '70%'
  },
  h3: {
    margin: '15px 0',
    fontWeight: 'bold',
    flexBasis: '70%'
  },
  titleWrap: {
    display: 'flex'
  },
  descWrap: {
    display: 'flex',
    margin: '15px 0'
  },
  rating: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px'
  },
  createIssue: {
    marginLeft: 'auto'
  }
}));

const Issues = ({ store }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { setShowUsers, issues, getUserRepos, getUsers, selectedUser, getRepoIssues, selectedRepo,selectedRepoInfo, fetchingIssueStatus, createIssue,firstIssesCursor, noRepoFound } = store;
  const { username, reponame } = useParams();
  useEffect(() => {
    setShowUsers(false);
    if (username) {
      if (!selectedUser) {
        getUsers(username, true).then(() => {
          if (!selectedRepo && reponame) {
            getRepoIssues(reponame);
          }
        })
      } else {
        if (reponame) {
          getRepoIssues(reponame);
        }
      }
    }
    return () => {
      setShowUsers(true);
    }
  }, [username, getUserRepos, reponame, getUsers, selectedUser, getRepoIssues, selectedRepo, setShowUsers]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // prev button   
  const currentPageFirstRepoCursor = issues && issues.edges && issues.edges[0] && issues.edges[0].cursor;
  const lastRepoCursor = issues && issues.edges && issues.edges[issues.edges.length - 1] && issues.edges[issues.edges.length - 1].cursor;
  const startCursor = issues && issues.pageInfo && issues.pageInfo.startCursor;
  const disabledPrevPage = firstIssesCursor === startCursor;
  // next button
  const disabledNextPage = issues && issues.pageInfo && !issues.pageInfo.hasNextPage;
  
  const handleNext = () => {
    getRepoIssues(reponame, lastRepoCursor);
  }
  const handlePrev = () => {
    getRepoIssues(reponame, undefined, currentPageFirstRepoCursor);
  }
  const noIssuesFound = (issues && issues.edges && !issues.edges.length) && fetchingIssueStatus === API_STATES.LOADED;
  const submitNewIssue = (title, description) => {
    createIssue(title, description).then(() => {
      handleClose();
      getRepoIssues(reponame);
    })
  }
  if (fetchingIssueStatus === API_STATES.PENDING) {
    return <Loading />
  }
  if (fetchingIssueStatus === API_STATES.ERROR) {
    return <Error message={"Error occured while trying to fetch repoissuesissues issues. Please try later"} />
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={12} sm={12} xs={12}>
        <div className={classes.titleWrap}>
          <Typography variant="h3" classes={{h3: classes.h3}} align="left">{ selectedRepoInfo.name}</Typography>
          <div className={classes.rating}>{selectedRepoInfo.stars} stars / {selectedRepoInfo.watchers} watching</div>
        </div>
        <div className={classes.descWrap}>
          <Typography variant="h4" classes={{h4: classes.h4}} align="left">{noRepoFound ? `${reponame} repository not found` : noIssuesFound ? "No open issues found" : "Open Issues:"}</Typography>
          {!noRepoFound && (
            <Button
              variant="contained"
              color="primary"
              className={classes.createIssue}
              onClick={handleClickOpen}>
              New Issue
            </Button>
          )}
        </div>
      </Grid>
      { issues && issues.edges && issues.edges.map(issue => {
        return (<Repo key={issue.node.id} repo={issue.node} isIssue />)
      })}
      { !noIssuesFound && (
        <Pagination
          disabledPrevPage={disabledPrevPage}
          disabledNextPage={disabledNextPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      )}
      <NewIssueModal open={open} close={handleClose} submitNewIssue={submitNewIssue} />
    </Grid>
  );
}

Issues.propTypes = {
  store: PropTypes.object.isRequired
};

export default observer(Issues);