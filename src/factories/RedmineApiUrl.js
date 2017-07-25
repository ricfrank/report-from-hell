const createRedmineApiUrl = (url, qs = '') => {
  return ENDPOINT + url + qs
}

export default createRedmineApiUrl
