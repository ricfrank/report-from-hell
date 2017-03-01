const createRedmineApiUrl = (url, qs = '') => {
    return 'https://redmine-stage.ideato.it' + url + qs;
};

export default createRedmineApiUrl;