jest.mock('../../services/LocalStorage')

import storage from '../../services/LocalStorage'
import authReducer from './authentication.reducer'
import { authenticate, requireAuthentication } from '../actions'

test('should authenticate', () => {
  const apiKey = 'banana-joe'
  const action = authenticate(apiKey)
  const state = {}

  const newState = authReducer(state, action)

  expect(newState.apiKey).toBe('banana-joe')
})

test('should require authentication', () => {
  const action = requireAuthentication()
  const state = {}

  const newState = authReducer(state, action)

  expect(newState.apiKey).toBe(null)
})
