import {
  SHOW_PROJECT_ISSUES,
  ERROR_TO_GET_PROJECT_ISSUES,
  SHOW_PROJECTS,
  ERROR_TO_GET_PROJECTS,
  REQUIRE_AUTHENTICATION,
  AUTHENTICATE,
  LOG_TIME_ENTRY_OK,
  LOG_TIME_ENTRY_DONE
} from '../actions'
import {ISSUES_INFINITE_SCROLL_THRESHOLD} from '../constants'

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
  threshold: ISSUES_INFINITE_SCROLL_THRESHOLD
};

export const projectIssues = (state = PROJECT_ISSUES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECT_ISSUES:
      let issuesInfo = action.payload;

      if (state.issues.length > 0 && state.issues[0].project.id === issuesInfo.issues[0].project.id) {
        issuesInfo.issues = state.issues.concat(issuesInfo.issues)
      }

      return {
        ...issuesInfo,
        threshold: action.payload.threshold,
        totalCount: action.payload.total_count
      };
    case ERROR_TO_GET_PROJECT_ISSUES:
      return {
        ...state,
        error: action.error,
      };
    case LOG_TIME_ENTRY_OK:
      return {
        ...state,
        loggedIssueId: action.payload.loggedIssueId
      };
    case LOG_TIME_ENTRY_DONE:
      return {
        ...state,
        loggedIssueId: ''
      };
    default:
      return state;
  }
};

const PROJECT_INITIAL_STATE = {
  projects: [],
  totalCount: 0
};

export const projects = (state = PROJECT_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECTS:
      return {
        projects: action.payload.projects,
        totalCount: action.payload.total_count
      };
    case ERROR_TO_GET_PROJECTS:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};