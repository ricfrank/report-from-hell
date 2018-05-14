import { ISSUES_INFINITE_SCROLL_THRESHOLD } from '../../constants'

export const ERROR_TO_GET_PROJECT_ISSUES = 'ERROR_TO_GET_PROJECT_ISSUES'
export const LOG_TIME_ENTRY_DONE = 'LOG_TIME_ENTRY_DONE'
export const LOG_TIME_ENTRY_OK = 'LOG_TIME_ENTRY_OK'
export const SHOW_PROJECT_ISSUES = 'SHOW_PROJECT_ISSUES'
export const UPDATE_PROJECT_ISSUES = 'UPDATE_PROJECT_ISSUES'
export const SEARCH_PROJECT_ISSUES = 'SEARCH_PROJECT_ISSUES '
export const SET_ACTIVITIES = 'SET_ACTIVITIES'

export const errorToGetProjectIssues = error => {
  return {
    type: ERROR_TO_GET_PROJECT_ISSUES,
    error: error
  }
}

export function logTimeEntryDone() {
  return {
    type: LOG_TIME_ENTRY_DONE
  }
}

export function logTimeEntryOk(issueId, loggedTimeEntryId) {
  return {
    type: LOG_TIME_ENTRY_OK,
    payload: {
      loggedIssueId: issueId,
      loggedTimeEntryId: loggedTimeEntryId
    }
  }
}

export const searchProjectIssues = text => {
  return {
    type: SEARCH_PROJECT_ISSUES,
    payload: { text }
  }
}

export const showProjectIssues = (
  issues,
  threshold = ISSUES_INFINITE_SCROLL_THRESHOLD,
  id
) => {
  return {
    type: SHOW_PROJECT_ISSUES,
    payload: {
      ...issues,
      threshold: threshold,
      projectId: id
    }
  }
}

export const updateProjectIssues = (
  issues,
  threshold = ISSUES_INFINITE_SCROLL_THRESHOLD,
  id
) => {
  return {
    type: UPDATE_PROJECT_ISSUES,
    payload: {
      ...issues,
      threshold: threshold,
      projectId: id
    }
  }
}

export const setActivities = activities => {
  return {
    type: SET_ACTIVITIES,
    payload: {
      activities: activities.time_entry_activities
    }
  }
}
