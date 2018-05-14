const createRedmineApiUrl = (url, qs = '') => {
  if (typeof ENDPOINT === 'undefined') {
    // you need to put your local IP address in order to connect to your localhost redmine service
    return 'http://192.168.1.108:8080' + url + qs
  }
  return ENDPOINT + url + qs
}

export default createRedmineApiUrl
