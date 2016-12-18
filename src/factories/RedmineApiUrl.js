import storage from '../services/LocalStorage'

const createRedmineApiUrl = (url) => {
    return url + '?key=' + storage.getItem('ideatoApiKey');
};

export default createRedmineApiUrl;