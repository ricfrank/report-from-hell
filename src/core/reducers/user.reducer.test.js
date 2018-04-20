jest.mock('src/services/LocalStorage')

import storage from 'src/services/LocalStorage'
import userReducer from 'core/reducers/user.reducer'
import { saveLoggedUser, errorToGetLoggedUser } from 'core/actions'

test('should save user data after login', () => {
  const expectedUser = {
    id: 120,
    firstName: 'Riccardo'
  }
  const action = saveLoggedUser(expectedUser)
  const newState = userReducer({}, action)

  expect(newState).toEqual(expectedUser)
})

test('should save error when login fail', () => {
  const error = { error: 'error' }
  const action = errorToGetLoggedUser(error)
  const newState = userReducer(
    {
      id: 120,
      firstName: 'Riccardo'
    },
    action
  )

  expect(newState.error).toEqual(error)
})
