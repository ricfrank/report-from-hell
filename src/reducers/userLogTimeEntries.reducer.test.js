jest.mock('../services/LocalStorage')

import storage from '../services/LocalStorage'
import userLogTimeEntries from 'src/reducers/userLogTimeEntries.reducer'
import {
  showUserLogTimeEntries,
  errorToGetUserLogTimeEntries
} from 'src/actions/userLogTimeEntries.action'

test('should save time entries log', () => {
  const timeEntries = [
    {
      id: 1,
      projectName: 'ideato banana',
      issue: {
        id: 12362,
        subject: 'Permessi e ferie'
      },
      hours: 4,
      comments: '',
      spentOn: '2018-02-19'
    },
    {
      id: 2,
      projectName: 'ideato pizza',
      issue: {
        id: 12363,
        subject: 'pizza'
      },
      hours: 5,
      comments: 'pizza margherita',
      spentOn: '2018-02-20'
    }
  ]
  const action = showUserLogTimeEntries(timeEntries)
  const newState = userLogTimeEntries({}, action)

  expect(newState).toEqual(timeEntries)
})

test('should save error', () => {
  const error = { error: 'error' }
  const action = errorToGetUserLogTimeEntries(error)
  const newState = userLogTimeEntries({}, action)

  expect(newState.error).toEqual(error)
})
