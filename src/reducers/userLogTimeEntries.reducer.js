import {
  SHOW_USER_LOG_TIME_ENTRIES,
  ERROR_TO_GET_USER_LOG_TIME_ENTRIES
} from 'src/actions/userLogTimeEntries.action'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_USER_LOG_TIME_ENTRIES:
      return action.payload
    case ERROR_TO_GET_USER_LOG_TIME_ENTRIES:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
