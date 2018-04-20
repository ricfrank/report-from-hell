import { SET_ACTIVITIES } from '../actions'

const ACTIVITIES_INITIAL_STATE = {
  activities: [],
  defaultActivityId: 0
}

const mapActivity = activities =>
  activities.map(a => {
    return {
      id: a.id,
      name: a.name
    }
  })

const getDefaultActivityId = activities => {
  const defaultActivity = activities.find(a => a.is_default === true)
  return defaultActivity ? defaultActivity.id : 0
}

export default (state = ACTIVITIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return {
        ...state,
        activities: mapActivity(action.payload.activities),
        defaultActivityId: getDefaultActivityId(action.payload.activities)
      }
    default:
      return state
  }
}
