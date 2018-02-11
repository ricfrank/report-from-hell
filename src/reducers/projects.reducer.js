import {
  SEARCH_PROJECT,
  SHOW_PROJECTS,
  ERROR_TO_GET_PROJECTS
} from 'src/actions'
import _ from 'lodash'

const PROJECT_INITIAL_STATE = {
  projects: [],
  filteredProjects: [],
  totalCount: 0
}

export default (state = PROJECT_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECTS:
      const CLOSED_PROJECT_STATUS_ID = 5
      const projects = action.payload.projects.filter(project => {
        return project.status !== CLOSED_PROJECT_STATUS_ID
      })
      return {
        ...state,
        projects: _.sortBy(projects, 'identifier'),
        totalCount: action.payload.total_count
      }
    case ERROR_TO_GET_PROJECTS:
      return {
        ...state,
        error: action.error
      }
    case SEARCH_PROJECT:
      const text = action.payload.text

      let filteredProjects = _.filter(state.projects, project => {
        if (_.includes(_.toLower(project.name), _.toLower(text))) {
          return project
        }
      })

      return {
        ...state,
        filteredProjects: filteredProjects
      }
    default:
      return state
  }
}
