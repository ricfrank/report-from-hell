export const SHOW_USER_LOG_TIME_ENTRIES = 'SHOW_USER_LOG_TIME_ENTRIES'
export const ERROR_TO_GET_USER_LOG_TIME_ENTRIES =
  'ERROR_TO_GET_USER_LOG_TIME_ENTRIES'

export const showUserLogTimeEntries = timeEntries => {
  return {
    type: SHOW_USER_LOG_TIME_ENTRIES,
    payload: timeEntries
  }
}

export const errorToGetUserLogTimeEntries = error => {
  return {
    type: ERROR_TO_GET_USER_LOG_TIME_ENTRIES,
    error: error
  }
}
