const createRedmineApiUrl = (url, qs = '') => {
  if (typeof ENDPOINT === 'undefined') {
    return 'http://localhost:8080' + url + qs
  }
  return ENDPOINT + url + qs
}

export default createRedmineApiUrl
