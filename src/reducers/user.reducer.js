import { ERROR_TO_GET_LOGGED_USER, SAVE_LOGGED_USER } from 'src/actions'

const INITIAL_STATE = {
  id: null,
  firstName: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...action.payload
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
