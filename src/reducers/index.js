import {
  SAVE_LOGGED_USER,
  ERROR_TO_GET_LOGGED_USER,
  SHOW_USER_LOG_TIME_ENTRIES
} from 'src/actions'

export const user = (state = {}, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...action.payload.user
      }
    case ERROR_TO_GET_LOGGED_USER:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export const userLogTimeEntries = (state = [], action) => {
  switch (action.type) {
    case SHOW_USER_LOG_TIME_ENTRIES:
      return action.payload.logTimeEntries
    case ERROR_TO_GET_LOGGED_USER:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
