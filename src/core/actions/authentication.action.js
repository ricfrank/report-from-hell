export const REQUIRE_AUTHENTICATION = 'REQUIRE_AUTHENTICATION'
export const AUTHENTICATE = 'AUTHENTICATE'

export function requireAuthentication() {
  return {
    type: REQUIRE_AUTHENTICATION
  }
}

export function authenticate(apiKey) {
  return {
    type: AUTHENTICATE,
    apiKey: apiKey
  }
}
