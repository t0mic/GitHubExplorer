import axios from "axios";
import { githubAuthentification } from "../.env.example";

const accessToken = githubAuthentification.token;

export const baseUrl = "https://api.github.com/graphql";
export const headers = {
  Accept: "*/*",
  Authorization: `bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export default function callApi(guery) {
  return axios({
    method: "post",
    url: baseUrl,
    headers,
    data: guery,
  });
}

export const GET_USERS_QUERY = (username) => {
  return {
    query: `
        query { 
            search(query: "${username}", type: USER, first: 6) { 
                edges {
                    node {
                        ... on User {
                            login
                            avatarUrl
                        }
                    }
                }
            }
        }
    `,
  };
};
export const GET_USER_REPOS = (username, lastCursor = 0, firstCursor = 0) => {
  const customPaginationQuery = lastCursor
    ? `after:"${lastCursor}"`
    : firstCursor
    ? `before:"${firstCursor}"`
    : "";
  const direction = lastCursor
    ? "first: 6"
    : firstCursor
    ? "last: 6"
    : "first: 6";

  return {
    query: `
        query { 
            repositoryOwner(login: "${username}") {
                repositories(ownerAffiliations:OWNER, orderBy: {field: STARGAZERS, direction: DESC} , ${direction}, ${customPaginationQuery}){
                    totalCount
                    edges {
                        node {
                            id
                            name
                            stargazers {
                                totalCount
                            }
                            watchers {
                                totalCount
                            }
                        }
                        cursor
                    }
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                    }
                }
              }
        }
    `,
  };
};
export const GET_REPO_ISSUES = (
  username,
  repoName,
  lastCursor = 0,
  firstCursor = 0
) => {
  const customPaginationQuery = lastCursor
    ? `after:"${lastCursor}"`
    : firstCursor
    ? `before:"${firstCursor}"`
    : "";
  const direction = lastCursor
    ? "first: 6"
    : firstCursor
    ? "last: 6"
    : "first: 6";

  return {
    query: `
        query { 
            repository (owner: "${username}", name: "${repoName}") {
                id
                name
                stargazers {
                    totalCount
                }
                watchers {
                    totalCount
                }
                issues (${direction}, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, ${customPaginationQuery}) {
                  totalCount
                  edges {
                    cursor
                    node {
                      id
                      title
                      createdAt
                      author {
                        login
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                    endCursor
                    startCursor
                  }
                }
            }
        }
    `,
  };
};
export const CREATE_ISSUE = (id, title, description) => {
  return {
    query: `
        mutation { 
            createIssue(input: {repositoryId: "${id}", title: "${title}", body: "${description}"}) {
                issue{
                  title
                }
            }
        }
    `,
  };
};
