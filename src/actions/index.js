import axios from 'axios';

export const SHOW_PROJECT_ISSUES = 'SHOW_PROJECT_ISSUES';
export const ERROR_TO_SHOW_PROJECT_ISSUES = 'ERROR_TO_SHOW_PROJECT_ISSUES';

export const showProjectIssues = (issues) => {
    return {
        type: SHOW_PROJECT_ISSUES,
        issues: issues
    }
};

export const errorToGetProjectIssues = (error) => {
    return {
        type: ERROR_TO_SHOW_PROJECT_ISSUES,
        error: error
    }
};

export function getProjectIssues() {
    return dispatch =>
        axios.get('/public/project_issues.json')
            .then(res => dispatch(showProjectIssues(res.data)))
            .catch(error => {
                if (error.response) {
                    dispatch(errorToGetProjectIssues(error.response));
                }
            });
}