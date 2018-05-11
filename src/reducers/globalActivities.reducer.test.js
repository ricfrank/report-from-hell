jest.mock('../services/LocalStorage')

import storage from '../services/LocalStorage'
import globalActivitiesReducer from 'src/reducers/globalActivities.reducer'
import { setActivities } from 'src/actions/projectIssues.action'

const MOCK_ACTIVITIES_WITH_DEFAULT = [
  { id: 8, name: 'Design' },
  { id: 9, name: 'Development', is_default: true }
]

const MOCK_STATE_GLOBAL_ACTIVITIES_WITH_DEFAULT = {
  activities: [{ id: 8, name: 'Design' }, { id: 9, name: 'Development' }],
  defaultActivityId: 9
}

const MOCK_ACTIVITIES_WITHOUT_DEFAULT = [
  { id: 8, name: 'Design' },
  { id: 9, name: 'Development' }
]

const MOCK_STATE_GLOBAL_ACTIVITIES_WITHOUT_DEFAULT = {
  activities: [{ id: 8, name: 'Design' }, { id: 9, name: 'Development' }],
  defaultActivityId: 0
}

test('with default should set global activities and default activity id', () => {
  const action = setActivities({
    time_entry_activities: MOCK_ACTIVITIES_WITH_DEFAULT
  })
  const state = {}

  const newState = globalActivitiesReducer(state, action)

  expect(newState).toEqual(MOCK_STATE_GLOBAL_ACTIVITIES_WITH_DEFAULT)
})

test('without default should set global activities and  set default activity id to 0', () => {
  const action = setActivities({
    time_entry_activities: MOCK_ACTIVITIES_WITHOUT_DEFAULT
  })
  const state = {}

  const newState = globalActivitiesReducer(state, action)

  expect(newState).toEqual(MOCK_STATE_GLOBAL_ACTIVITIES_WITHOUT_DEFAULT)
})
