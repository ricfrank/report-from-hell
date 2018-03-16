jest.mock('../services/LocalStorage')

import storage from '../services/LocalStorage'
import activitiesReducer from 'src/reducers/activities.reducer'
import { setActivities } from 'src/actions'

const MOCK_ACTIVITIES = [
  { id: 8, name: 'Design' },
  { id: 9, name: 'Development', is_default: true }
]

test('should set activities', () => {
  const action = setActivities({
    time_entry_activities: MOCK_ACTIVITIES
  })
  const state = {}

  const newState = activitiesReducer(state, action)

  expect(newState.activities).toBe(MOCK_ACTIVITIES)
})
