import {getProjectIssues, GET_PROJECT_ISSUES} from '../actions'

export const projectIssues = (state = [], action) => {
    switch (action.type) {
        // case LOAD_PROJECT_ISSUES_SUCCESS:
        //     return {
        //         ...state,
        //         issues : action.issues,
        //         projectIssuesRequestStatus: 'success'
        //
        //     };
        // case LOAD_PROJECT_ISSUES_FAILED:
        //     return {
        //         ...state,
        //         issues : action.error,
        //         projectIssuesRequestStatus: 'failed'
        //     };
        case GET_PROJECT_ISSUES:
            return {
                ...state,
                projectIssuesRequestStatus: 'pending'
            };
        default:
            return state;
    }
};