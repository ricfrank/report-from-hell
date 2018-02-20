import {
  ERROR_TO_GET_PROJECT_ISSUES,
  LOG_TIME_ENTRY_DONE,
  LOG_TIME_ENTRY_OK,
  SEARCH_PROJECT_ISSUES,
  SHOW_PROJECT_ISSUES,
  UPDATE_PROJECT_ISSUES
} from 'src/actions/projectIssues.action'
import { ISSUES_INFINITE_SCROLL_THRESHOLD } from 'src/constants'
import _ from 'lodash'

const PROJECT_ISSUES_INITIAL_STATE = {
  issues: [],
  offset: 0,
  totalCount: 0,
  threshold: ISSUES_INFINITE_SCROLL_THRESHOLD,
  filteredIssues: [],
  resetIssuesList: true,
  projectName: '',
  projectId: null
}

const getProjectName = issuesInfo => {
  return issuesInfo.issues.length > 0
    ? issuesInfo.issues[0].project.name
    : PROJECT_ISSUES_INITIAL_STATE.projectName
}

export default (state = PROJECT_ISSUES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECT_ISSUES:
      let issuesInfo = action.payload
      return {
        ...issuesInfo,
        threshold: action.payload.threshold,
        totalCount: action.payload.totalCount,
        projectName: getProjectName(issuesInfo),
        filteredIssues: [],
        resetIssuesList: true,
        projectId: action.payload.projectId
      }
    case UPDATE_PROJECT_ISSUES:
      let updatedIssuesInfo = action.payload
      updatedIssuesInfo.issues = state.issues.concat(updatedIssuesInfo.issues)

      return {
        ...updatedIssuesInfo,
        threshold: action.payload.threshold,
        totalCount: action.payload.totalCount,
        projectName: getProjectName(updatedIssuesInfo),
        filteredIssues: [],
        resetIssuesList: true,
        projectId: action.payload.projectId
      }
    case ERROR_TO_GET_PROJECT_ISSUES:
      return {
        ...state,
        error: action.error
      }
    case LOG_TIME_ENTRY_OK:
      return {
        ...state,
        loggedIssueId: action.payload.loggedIssueId,
        loggedTimeEntryId: action.payload.loggedTimeEntryId
      }
    case LOG_TIME_ENTRY_DONE:
      return {
        ...state,
        loggedIssueId: '',
        loggedTimeEntryId: ''
      }
    case SEARCH_PROJECT_ISSUES:
      const text = action.payload.text

      if (text === '') {
        return {
          ...state,
          filteredIssues: [],
          resetIssuesList: true
        }
      }

      let filteredIssues = _.filter(state.issues, issue => {
        if (issue.id === parseInt(text)) {
          return issue
        }
        if (_.includes(_.toLower(issue.subject), _.toLower(text))) {
          return issue
        }
      })

      return {
        ...state,
        filteredIssues: filteredIssues,
        resetIssuesList: false
      }

    default:
      return state
  }
}
