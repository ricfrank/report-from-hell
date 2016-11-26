import {SHOW_PROJECT_ISSUES, ERROR_TO_SHOW_PROJECT_ISSUES} from '../actions'

export const projectIssues = (state = [], action) => {
    switch (action.type) {
        case SHOW_PROJECT_ISSUES:
            return {
                ...state,
                issues: action.issues,

            };
        case ERROR_TO_SHOW_PROJECT_ISSUES:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};