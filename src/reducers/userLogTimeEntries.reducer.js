import {
  ERROR_TO_GET_LOGGED_USER,
  SHOW_USER_LOG_TIME_ENTRIES
} from 'src/actions'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_USER_LOG_TIME_ENTRIES:
      return action.payload
    case ERROR_TO_GET_LOGGED_USER:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
