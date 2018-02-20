import axios from 'axios'
import _ from 'lodash'
import createRedmineApiUrl from 'src/factories/RedmineApiUrl'
import {
  AUTH_LOCAL_STORAGE_KEY,
  ISSUES_INFINITE_SCROLL_LIMIT,
  ISSUES_INFINITE_SCROLL_THRESHOLD
} from 'src/constants'
import storage from 'src/services/LocalStorage'
import {
  authenticate,
  requireAuthentication
} from 'src/actions/authentication.action'
import {
  errorToGetProjectIssues,
  logTimeEntryOk,
  showProjectIssues,
  updateProjectIssues
} from 'src/actions/projectIssues.action'
import { errorToGetProjects, showProjects } from 'src/actions/projects.action'
import { errorToGetLoggedUser, saveLoggedUser } from 'src/actions/user.action'
import {
  errorToGetUserLogTimeEntries,
  showUserLogTimeEntries
} from 'src/actions/userLogTimeEntries.action'

axios.defaults.headers.common['X-Redmine-API-Key'] = storage.getItem(
  AUTH_LOCAL_STORAGE_KEY
)
axios.defaults.headers.post['Content-Type'] = 'application/json'

export function getProjectIssues(
  id,
  offset = 0,
  threshold = ISSUES_INFINITE_SCROLL_THRESHOLD,
  limit = ISSUES_INFINITE_SCROLL_LIMIT
) {
  return dispatch =>
    axios
      .get(
        createRedmineApiUrl(
          '/issues.json',
          '?project_id=' +
            id +
            '&status_id=open&limit=' +
            limit +
            '&offset=' +
            offset +
            '&sort=id:desc'
        )
      )
      .then(res => {
        const issueTotalCount = _.get(res.data, 'total_count', 0)
        const issues = {
          ..._.omit(res.data, 'total_count'),
          totalCount: issueTotalCount
        }
        if (offset === 0) {
          dispatch(showProjectIssues(issues, threshold, id))
          return
        }
        dispatch(updateProjectIssues(issues, threshold, id))
      })
      .catch(error => {
        if (error.response) {
          dispatch(errorToGetProjectIssues(error.response))
        }
      })
}

export function saveApiKey(apiKey) {
  return (dispatch, getState) => {
    storage.setItem(AUTH_LOCAL_STORAGE_KEY, apiKey)
    axios.defaults.headers.common['X-Redmine-API-Key'] = storage.getItem(
      AUTH_LOCAL_STORAGE_KEY
    )

    dispatch(authenticate(apiKey))
    dispatch(getProjects())
    dispatch(getLoggedUser()).then(() => {
      dispatch(getUserLogTimeEntries(getState().user.id))
    })
  }
}

export function getProjects() {
  return dispatch => {
    //why ?
    if (storage.getItem(AUTH_LOCAL_STORAGE_KEY)) {
      dispatch(authenticate(storage.getItem(AUTH_LOCAL_STORAGE_KEY)))
    }
    //

    return axios
      .get(
        createRedmineApiUrl(
          '/projects.json',
          '?limit=100&include=time_entry_activities'
        )
      )
      .then(res => dispatch(showProjects(res.data)))
      .catch(error => {
        if (error.response.status == 401) {
          dispatch(requireAuthentication())
          return new Promise((resolve, reject) => {
            reject(error)
          })
        }

        if (error.response) {
          dispatch(errorToGetProjects(error.response))
        }
      })
  }
}

export function getActivities() {
  return dispatch => {
    axios
      .get(createRedmineApiUrl('/enumerations/time_entry_activities.json'))
      .then(res => dispatch(setActivities(res.data)))
      .catch(function(error) {
        if (error.response.status == 401) {
          dispatch(requireAuthentication())
          return
        }

        console.error(error.response)
      })
  }
}

export function logTimeEntry(
  issueId,
  timeEntryDate,
  hours,
  comment,
  activityId
) {
  return (dispatch, getState) => {
    axios
      .post(createRedmineApiUrl('/time_entries.json'), {
        time_entry: {
          issue_id: issueId,
          spent_on: timeEntryDate,
          hours: hours,
          comments: comment,
          activity_id: activityId
        }
      })
      .then(function(response) {
        dispatch(logTimeEntryOk(issueId, response.data.time_entry.id))
        dispatch(getUserLogTimeEntries(getState().user.id))
      })
      .catch(function(error) {
        if (error.response.status == 401) {
          dispatch(requireAuthentication())
          return
        }

        console.error(error.response)
      })
  }
}

export const getLoggedUser = () => {
  return dispatch => {
    return axios
      .get(createRedmineApiUrl('/users/current.json'))
      .then(res => {
        dispatch(
          saveLoggedUser({
            id: res.data.user.id,
            firstName: res.data.user.firstname
          })
        )
      })
      .catch(error => {
        if (error.response) {
          dispatch(errorToGetLoggedUser(error.response))
        }
      })
  }
}

export const getUserLogTimeEntries = loggedUserId => {
  return dispatch => {
    axios
      .get(
        createRedmineApiUrl(
          '/time_entries.json',
          '?user_id=' + loggedUserId + '&limit=10'
        )
      )
      .then(res => {
        const logTimeEntriesPromises = res.data.time_entries.map(timeEntry => {
          return axios
            .get(createRedmineApiUrl('/issues/' + timeEntry.issue.id + '.json'))
            .then(res => {
              return {
                ...timeEntry,
                issue: res.data.issue
              }
            })
        })

        Promise.all(logTimeEntriesPromises).then(function(logTimeEntries) {
          dispatch(
            showUserLogTimeEntries(
              logTimeEntries.map(entry => {
                return {
                  id: entry.id,
                  activityId: entry.activity.id,
                  projectId: entry.project.id,
                  projectName: entry.project.name,
                  issue: {
                    id: entry.issue.id,
                    subject: entry.issue.subject
                  },
                  hours: entry.hours,
                  comments: entry.comments,
                  spentOn: entry.spent_on
                }
              })
            )
          )
        })
      })
      .catch(function(error) {
        if (error.response) {
          dispatch(errorToGetUserLogTimeEntries(error.response))
        }
      })
  }
}
