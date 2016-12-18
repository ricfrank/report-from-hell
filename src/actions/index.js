import axios from 'axios';

export const SHOW_PROJECT_ISSUES = 'SHOW_PROJECT_ISSUES';
export const SHOW_PROJECTS = 'SHOW_PROJECTS';
export const ERROR_TO_GET_PROJECT_ISSUES = 'ERROR_TO_GET_PROJECT_ISSUES';
export const ERROR_TO_GET_PROJECTS = 'ERROR_TO_GET_PROJECTS';

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
        axios.get('/public/project_issues_' + id + '.json')
            .then(res => dispatch(showProjectIssues(res.data)))
            .catch(error => {
                if (error.response) {
                    dispatch(errorToGetProjectIssues(error.response));
                }
            });
}

export function getProjects() {
    return dispatch =>
        axios.get('/public/projects.json')
            .then(res => dispatch(showProjects(res.data)))
            .catch(error => {
                if (error.response) {
                    dispatch(errorToGetProjects(error.response));
                }
            });
}