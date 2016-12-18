import {
    SHOW_PROJECT_ISSUES,
    ERROR_TO_GET_PROJECT_ISSUES,
    SHOW_PROJECTS,
    ERROR_TO_GET_PROJECTS
} from '../actions'

export const projectIssues = (state = {}, action) => {
    switch (action.type) {
        case SHOW_PROJECT_ISSUES:
            return {
                ...state,
                issues: action.issues.issues,
                error: {}

            };
        case ERROR_TO_GET_PROJECT_ISSUES:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export const projects = (state = {}, action) => {
    console.log(action.type,state);
    switch (action.type) {
        case SHOW_PROJECTS:
            console.log("SHOW_PROJECTS", state);
            return {
                ...state,
                projects: action.projects.projects,
                error: {}

            };
        case ERROR_TO_GET_PROJECTS:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};