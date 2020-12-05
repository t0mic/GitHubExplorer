import { makeAutoObservable } from "mobx";
import callApi, {
  GET_USERS_QUERY,
  GET_USER_REPOS,
  GET_REPO_ISSUES,
  CREATE_ISSUE,
} from "../graphql/index";
import { API_STATES } from "../utils/consts";

class Store {
  users = [];
  fetchingUsersStatus = API_STATES.INITIAL;
  repos = [];
  fetchingRepoStatus = API_STATES.INITIAL;
  issues = [];
  fetchingIssueStatus = API_STATES.INITIAL;
  noRepoFound = false;
  selectedUser = "";
  selectedRepo = "";
  selectedRepoInfo = {
    id: "",
    name: "",
    stars: 0,
    watchers: 0,
  };
  firstRepoCursor = "";
  firstIssesCursor = "";
  showUsers = true;

  constructor() {
    makeAutoObservable(this);
  }

  setShowUsers = (val) => {
    this.showUsers = val;
  };

  getUsers = async (username, isDirectAccess) => {
    if (this.fetchingUsersStatus === API_STATES.PENDING) return;
    this.resetData();
    if (isDirectAccess) {
      this.selectedUser = username;
    }
    this.fetchingUsersStatus = API_STATES.PENDING;
    try {
      const data = GET_USERS_QUERY(username);
      const queryResults = await callApi(data);

      this.fetchingUsersStatus = API_STATES.LOADED;
      const result =
        queryResults && queryResults.data && queryResults.data.data;

      this.users =
        result &&
        result.search.edges.map((user) => {
          return {
            username: user.node.login,
            avatarUrl: user.node.avatarUrl,
          };
        });
    } catch (error) {
      this.fetchingUsersStatus = API_STATES.ERROR;
      console.error(error);
    }
  };

  resetData = () => {
    this.users = [];
    this.fetchingUsersStatus = API_STATES.INITIAL;
    this.repos = [];
    this.fetchingRepoStatus = API_STATES.INITIAL;
    this.issues = [];
    this.fetchingIssueStatus = API_STATES.INITIAL;
    this.noRepoFound = false;
    this.selectedUser = "";
    this.selectedRepo = "";
    this.selectedRepoInfo = {
      id: "",
      name: "",
      stars: 0,
      watchers: 0,
    };
    this.firstRepoCursor = "";
    this.firstIssesCursor = "";
    this.showUsers = true;
  };

  getUserRepos = async (username, lastCursor, firstCursor) => {
    if (this.selectedUser !== username) {
      this.firstRepoCursor = "";
    }
    this.selectedUser = username;
    this.repos = [];
    this.fetchingRepoStatus = API_STATES.PENDING;

    try {
      const data = GET_USER_REPOS(username, lastCursor, firstCursor);
      const queryResults = await callApi(data);

      this.fetchingRepoStatus = API_STATES.LOADED;
      const result =
        queryResults && queryResults.data && queryResults.data.data;

      this.repos =
        result && result.repositoryOwner && result.repositoryOwner.repositories;
      if (!this.firstRepoCursor && this.repos && this.repos.totalCount) {
        this.firstRepoCursor = this.repos.edges[0].cursor;
      }
    } catch (error) {
      this.fetchingRepoStatus = API_STATES.ERROR;
      console.error(error);
    }
  };

  getRepoIssues = async (repoName, lastCursor = 0, firstCursor = 0) => {
    if (this.selectedRepo !== repoName) {
      this.firstIssesCursor = "";
    }
    this.selectedRepo = repoName;
    this.issues = [];
    this.fetchingIssueStatus = API_STATES.PENDING;

    try {
      const data = GET_REPO_ISSUES(
        this.selectedUser,
        repoName,
        lastCursor,
        firstCursor
      );
      const queryResults = await callApi(data);

      this.fetchingIssueStatus = API_STATES.LOADED;

      if (queryResults && queryResults.data && queryResults.data.errors) {
        this.noRepoFound = true;
      } else {
        this.noRepoFound = false;
      }
      const result =
        queryResults && queryResults.data && queryResults.data.data;

      this.issues = result && result.repository && result.repository.issues;
      const hasIssues = result && result.repository;

      if (hasIssues) {
        this.selectedRepoInfo = {
          id: result.repository.id,
          name: result.repository.name,
          stars: result.repository.stargazers.totalCount,
          watchers: result.repository.watchers.totalCount,
        };
      }
      if (!this.firstIssesCursor && this.issues && this.issues.totalCount) {
        this.firstIssesCursor = this.issues.edges[0].cursor;
      }
    } catch (error) {
      this.fetchingIssueStatus = API_STATES.ERROR;
      console.error(error);
    }
  };

  createIssue = async (title, description) => {
    try {
      const data = CREATE_ISSUE(this.selectedRepoInfo.id, title, description);
      await callApi(data);
    } catch (error) {
      console.error(error);
    }
  };
}

export default Store;
