import {
  SHOW_PROJECT_ISSUES,
  UPDATE_PROJECT_ISSUES,
  SEARCH_PROJECT_ISSUES,
  SEARCH_PROJECT,
  ERROR_TO_GET_PROJECT_ISSUES,
  SHOW_PROJECTS,
  ERROR_TO_GET_PROJECTS,
  REQUIRE_AUTHENTICATION,
  AUTHENTICATE,
  LOG_TIME_ENTRY_OK,
  LOG_TIME_ENTRY_DONE,
  SAVE_LOGGED_USER,
  ERROR_TO_GET_LOGGED_USER,
  SHOW_USER_LOG_TIME_ENTRIES
} from '../actions';
import { ISSUES_INFINITE_SCROLL_THRESHOLD } from '../constants';
import _ from 'lodash';

export const authentication = (state = {}, action) => {
  switch (action.type) {
    case REQUIRE_AUTHENTICATION:
      return {
        ...state,
        apiKey: null
      };
    case AUTHENTICATE:
      return {
        ...state,
        apiKey: action.apiKey
      };
    default:
      return state;
  }
};

const PROJECT_ISSUES_INITIAL_STATE = {
  issues: [],
  offset: 0,
  totalCount: 0,
  threshold: ISSUES_INFINITE_SCROLL_THRESHOLD,
  filteredIssues: [],
  resetIssuesList: true,
  projectName: '',
  projectId: null
};

export const projectIssues = (state = PROJECT_ISSUES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECT_ISSUES:
      let issuesInfo = action.payload;
      return {
        ...issuesInfo,
        threshold: action.payload.threshold,
        totalCount: action.payload.total_count,
        projectName:
          issuesInfo.issues.length > 0
            ? issuesInfo.issues[0].project.name
            : PROJECT_ISSUES_INITIAL_STATE.projectName,
        filteredIssues: [],
        resetIssuesList: true,
        projectId: action.payload.projectId
      };
    case UPDATE_PROJECT_ISSUES:
      let updatedIssuesInfo = action.payload;
      updatedIssuesInfo.issues = state.issues.concat(updatedIssuesInfo.issues);

      return {
        ...updatedIssuesInfo,
        threshold: action.payload.threshold,
        totalCount: action.payload.total_count,
        projectName:
          updatedIssuesInfo.issues.length > 0
            ? updatedIssuesInfo.issues[0].project.name
            : PROJECT_ISSUES_INITIAL_STATE.projectName,
        filteredIssues: [],
        resetIssuesList: true,
        projectId: action.payload.projectId
      };
    case ERROR_TO_GET_PROJECT_ISSUES:
      return {
        ...state,
        error: action.error
      };
    case LOG_TIME_ENTRY_OK:
      return {
        ...state,
        loggedIssueId: action.payload.loggedIssueId,
        loggedTimeEntryId: action.payload.loggedTimeEntryId
      };
    case LOG_TIME_ENTRY_DONE:
      return {
        ...state,
        loggedIssueId: '',
        loggedTimeEntryId: ''
      };
    case SEARCH_PROJECT_ISSUES:
      const text = action.payload.text;

      if (text === '') {
        return {
          ...state,
          filteredIssues: [],
          resetIssuesList: true
        };
      }

      let filteredIssues = _.filter(state.issues, issue => {
        if (_.includes(issue.id, _.toLower(text))) {
          return issue;
        }
        if (_.includes(_.toLower(issue.subject), _.toLower(text))) {
          return issue;
        }
      });

      return {
        ...state,
        filteredIssues: filteredIssues,
        resetIssuesList: false
      };

    default:
      return state;
  }
};

const PROJECT_INITIAL_STATE = {
  projects: [],
  filteredProjects: [],
  totalCount: 0
};

export const projects = (state = PROJECT_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECTS:
      const CLOSED_PROJECT_STATUS_ID = 5;
      const projects = action.payload.projects.filter(project => {
        return project.status !== CLOSED_PROJECT_STATUS_ID;
      });
      return {
        ...state,
        projects: _.sortBy(projects, 'identifier'),
        totalCount: action.payload.total_count
      };
    case ERROR_TO_GET_PROJECTS:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_PROJECT:
      const text = action.payload.text;

      let filteredProjects = _.filter(state.projects, project => {
        if (_.includes(_.toLower(project.name), _.toLower(text))) {
          return project;
        }
      });

      return {
        ...state,
        filteredProjects: filteredProjects
      };
    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...action.payload.user
      };
    case ERROR_TO_GET_LOGGED_USER:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export const userLogTimeEntries = (state = [], action) => {
  switch (action.type) {
    case SHOW_USER_LOG_TIME_ENTRIES:
      return action.payload.logTimeEntries;
    case ERROR_TO_GET_LOGGED_USER:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
