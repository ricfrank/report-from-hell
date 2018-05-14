import {
  AUTHENTICATE,
  REQUIRE_AUTHENTICATION
} from '../actions/authentication.action'

const INITIAL_STATE = {
  apiKey: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUIRE_AUTHENTICATION:
      return INITIAL_STATE
    case AUTHENTICATE:
      return {
        ...state,
        apiKey: action.apiKey
      }
    default:
      return state
  }
}
