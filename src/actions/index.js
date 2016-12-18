import axios from 'axios';
import createRedmineApiUrl from '../factories/RedmineApiUrl';
import {AUTH_LOCAL_STORAGE_KEY} from '../constants'
import storage from '../services/LocalStorage';

export const SHOW_PROJECT_ISSUES = 'SHOW_PROJECT_ISSUES';
export const SHOW_PROJECTS = 'SHOW_PROJECTS';
export const ERROR_TO_GET_PROJECT_ISSUES = 'ERROR_TO_GET_PROJECT_ISSUES';
export const ERROR_TO_GET_PROJECTS = 'ERROR_TO_GET_PROJECTS';
export const REQUIRE_AUTHENTICATION = 'REQUIRE_AUTHENTICATION';
export const AUTHENTICATE = 'AUTHENTICATE';

export const showProjectIssues = (issues) => {
    return {
        type: SHOW_PROJECT_ISSUES,
        issues: issues
    }
};

export const showProjects = (projects) => {
    return {
        type: SHOW_PROJECTS,
        projects: projects
    }
};

export const errorToGetProjectIssues = (error) => {
    return {
        type: ERROR_TO_GET_PROJECT_ISSUES,
        error: error
    }
};

export const errorToGetProjects = (error) => {
    return {
        type: ERROR_TO_GET_PROJECTS,
        error: error
    }
};

export function getProjectIssues(id) {
    return dispatch =>
        axios.get(createRedmineApiUrl('/public/project_issues_' + id + '.json'))
            .then(res => dispatch(showProjectIssues(res.data)))
            .catch(error => {
                if (error.response) {
                    dispatch(errorToGetProjectIssues(error.response));
                }
            });
}

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

export function saveApiKey(apiKey) {
    return dispatch => {
        storage.setItem(AUTH_LOCAL_STORAGE_KEY, apiKey);

        dispatch(authenticate(apiKey));
        dispatch(getProjects());
    }
}

export function getProjects() {
    return dispatch => {

        if(storage.getItem(AUTH_LOCAL_STORAGE_KEY)){
            dispatch(authenticate(storage.getItem(AUTH_LOCAL_STORAGE_KEY)));
        }

        // axios.get('/public/projectss.json')
        axios.get(createRedmineApiUrl('/public/projects.json'))
            .then(res => dispatch(showProjects(res.data)))
            .catch(error => {

                //for test
                // error.response.status = 401;

                if (error.response.status == 401) {
                    dispatch(requireAuthentication());
                    return
                }

                if (error.response) {
                    dispatch(errorToGetProjects(error.response));
                }
            });
    }
}