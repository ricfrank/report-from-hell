import axios from 'axios';
import createRedmineApiUrl from '../factories/RedmineApiUrl';
import {AUTH_LOCAL_STORAGE_KEY, ISSUES_INFINITE_SCROLL_LIMIT, ISSUES_INFINITE_SCROLL_THRESHOLD} from '../constants'
import storage from '../services/LocalStorage';

export const SHOW_PROJECT_ISSUES = 'SHOW_PROJECT_ISSUES';
export const SEARCH_PROJECT_ISSUES = 'SEARCH_PROJECT_ISSUES ';
export const SHOW_PROJECTS = 'SHOW_PROJECTS';
export const ERROR_TO_GET_PROJECT_ISSUES = 'ERROR_TO_GET_PROJECT_ISSUES';
export const ERROR_TO_GET_PROJECTS = 'ERROR_TO_GET_PROJECTS';
export const REQUIRE_AUTHENTICATION = 'REQUIRE_AUTHENTICATION';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_TIME_ENTRY_OK = 'LOG_TIME_ENTRY_OK';
export const LOG_TIME_ENTRY_DONE = 'LOG_TIME_ENTRY_DONE';
export const SAVE_LOGGED_USER = 'SAVE_LOGGED_USER';
export const ERROR_TO_GET_LOGGED_USER = 'ERROR_TO_GET_LOGGED_USER';
export const SHOW_USER_LOG_TIME_ENTRIES = 'SHOW_USER_LOG_TIME_ENTRIES';
export const ERROR_TO_GET_USER_LOG_TIME_ENTRIES = 'ERROR_TO_GET_USER_LOG_TIME_ENTRIES';

axios.defaults.headers.common['X-Redmine-API-Key'] = storage.getItem(AUTH_LOCAL_STORAGE_KEY);
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const showProjectIssues = (issues, threshold = ISSUES_INFINITE_SCROLL_THRESHOLD) => {
  return {
    type: SHOW_PROJECT_ISSUES,
    payload: {
      ...issues,
      threshold: threshold
    }
  }
};

export const searchProjectIssues = (text) => {
  return {
    type: SEARCH_PROJECT_ISSUES,
    payload: {text}
  }
};

export const showProjects = (projects) => {
  return {
    type: SHOW_PROJECTS,
    payload: {
      ...projects
    }
  }
};

export const errorToGetProjectIssues = (error) => {
  return {
    type: ERROR_TO_GET_PROJECT_ISSUES,
    error: error
  }
};

export const errorToGetProjects = (error) => {
  return {
    type: ERROR_TO_GET_PROJECTS,
    error: error
  }
};

export function getProjectIssues(id,
                                 offset = 0,
                                 threshold = ISSUES_INFINITE_SCROLL_THRESHOLD,
                                 limit = ISSUES_INFINITE_SCROLL_LIMIT) {
  return dispatch =>
    axios.get(createRedmineApiUrl('/issues.json', '?project_id=' + id +
      '&status_id=open&limit=' + limit +
      '&offset=' + offset +
      '&sort=id:desc'
    ))
      .then(res => {
        dispatch(showProjectIssues(res.data, threshold));
      })
      .catch(error => {
        if (error.response) {
          dispatch(errorToGetProjectIssues(error.response));
        }
      });
}

export function requireAuthentication() {
  return {
    type: REQUIRE_AUTHENTICATION
  }
}

export function authenticate(apiKey) {
  return {
    type: AUTHENTICATE,
    apiKey: apiKey
  }
}

export function logTimeEntryOk(issueId, loggedTimeEntryId) {
  return {
    type: LOG_TIME_ENTRY_OK,
    payload: {
      loggedIssueId: issueId,
      loggedTimeEntryId: loggedTimeEntryId,
    }
  }
}

export function saveApiKey(apiKey) {
  return dispatch => {
    storage.setItem(AUTH_LOCAL_STORAGE_KEY, apiKey);
    axios.defaults.headers.common['X-Redmine-API-Key'] = storage.getItem(AUTH_LOCAL_STORAGE_KEY);

    dispatch(authenticate(apiKey));
    dispatch(getProjects());
  }
}

export function getProjects() {
  return dispatch => {

    if (storage.getItem(AUTH_LOCAL_STORAGE_KEY)) {
      dispatch(authenticate(storage.getItem(AUTH_LOCAL_STORAGE_KEY)));
    }

    axios.get(createRedmineApiUrl('/projects.json'))
      .then(res => dispatch(showProjects(res.data)))
      .catch(error => {

        if (error.response.status == 401) {
          dispatch(requireAuthentication());
          return
        }

        if (error.response) {
          dispatch(errorToGetProjects(error.response));
        }
      });
  }
}

export function logTimeEntry(issueId, timeEntryDate, hours, comment) {
  return (dispatch, getState) => {

    axios.post(createRedmineApiUrl('/time_entries.json'), {
      time_entry: {
        issue_id: issueId,
        spent_on: timeEntryDate,
        hours: hours,
        comments: comment
      }
    })
      .then(function (response) {
        dispatch(logTimeEntryOk(issueId, response.data.time_entry.id));
        dispatch(getUserLogTimeEntries(getState().user.id))
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          dispatch(requireAuthentication());
          return
        }

        console.error(error.response);
      });
  };
}

export function logTimeEntryDone() {
  return {
    type: LOG_TIME_ENTRY_DONE
  }
}

export const getLoggedUser = () => {
  return dispatch => {
    return axios.get(createRedmineApiUrl('/users/current.json'))
      .then(res => {
        dispatch(saveLoggedUser(res.data.user));
      })
      .catch(error => {
        if (error.response) {
          dispatch(errorToGetLoggedUser(error.response));
        }
      });
  };
};

export const saveLoggedUser = (user) => {
  return {
    type: SAVE_LOGGED_USER,
    payload: {user: user}
  };
};

export const errorToGetLoggedUser = (error) => {
  return {
    type: ERROR_TO_GET_LOGGED_USER,
    error: error
  }
};


export const getUserLogTimeEntries = loggedUserId => {
  return dispatch => {
    axios.get(createRedmineApiUrl('/time_entries.json', '?user_id=' + loggedUserId + '&limit=10'))
      .then(res => {
        const logTimeEntriesPromises = res.data.time_entries.map((timeEntry) => {
          return axios.get(createRedmineApiUrl('/issues/' + timeEntry.issue.id + '.json'))
            .then((res) => {
              return {
                ...timeEntry,
                issue: res.data.issue
              }
            });
        });

        Promise.all(logTimeEntriesPromises).then(function(logTimeEntries) {
          dispatch(showUserLogTimeEntries(logTimeEntries));
        });
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(errorToGetUserLogTimeEntries(error.response));
        }
      });
  };
};

export const showUserLogTimeEntries = timeEntries => {
  return {
    type: SHOW_USER_LOG_TIME_ENTRIES,
    payload: {logTimeEntries: timeEntries}
  }
};

export const errorToGetUserLogTimeEntries = error => {
  return {
    type: ERROR_TO_GET_USER_LOG_TIME_ENTRIES,
    error: error
  }
};
