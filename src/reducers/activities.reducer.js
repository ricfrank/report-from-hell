import { SET_ACTIVITIES } from 'src/actions'

const ACTIVITIES_INITIAL_STATE = {
  activities: []
}

export default (state = ACTIVITIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload.activities
      }
    default:
      return state
  }
}
