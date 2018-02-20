import userReducer from 'src/reducers/user.reducer'
import { saveLoggedUser, errorToGetLoggedUser } from 'src/actions/user.action'

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
