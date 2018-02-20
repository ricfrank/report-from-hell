import {
  SEARCH_PROJECT,
  SHOW_PROJECTS,
  ERROR_TO_GET_PROJECTS
} from 'src/actions/projects.action'
import _ from 'lodash'

const PROJECT_INITIAL_STATE = {
  projects: [],
  filteredProjects: [],
  totalCount: 0
}

const getProjects = projects => {
  const CLOSED_PROJECT_STATUS_ID = 5
  return projects
    .filter(p => {
      return p.status !== CLOSED_PROJECT_STATUS_ID
    })
    .map(p => {
      const toReturn = {
        ...p,
        activities: p.time_entry_activities || []
      }
      delete toReturn.time_entry_activities
      return toReturn
    })
}

export default (state = PROJECT_INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PROJECTS:
      const projects = getProjects(action.payload.projects)
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
