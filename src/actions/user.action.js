export const SAVE_LOGGED_USER = 'SAVE_LOGGED_USER'
export const ERROR_TO_GET_LOGGED_USER = 'ERROR_TO_GET_LOGGED_USER'

export const saveLoggedUser = user => {
  return {
    type: SAVE_LOGGED_USER,
    payload: user
  }
}

export const errorToGetLoggedUser = error => {
  return {
    type: ERROR_TO_GET_LOGGED_USER,
    error: error
  }
}
