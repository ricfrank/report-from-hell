export const SHOW_PROJECTS = 'SHOW_PROJECTS'
export const SEARCH_PROJECT = 'SEARCH_PROJECT'
export const ERROR_TO_GET_PROJECTS = 'ERROR_TO_GET_PROJECTS'

export const searchProject = text => {
  return {
    type: SEARCH_PROJECT,
    payload: { text }
  }
}

export const showProjects = projects => {
  return {
    type: SHOW_PROJECTS,
    payload: {
      ...projects
    }
  }
}

export const errorToGetProjects = error => {
  return {
    type: ERROR_TO_GET_PROJECTS,
    error: error
  }
}
