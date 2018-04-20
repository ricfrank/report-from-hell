import { combineReducers } from 'redux'
import userLogTimeEntries from 'core/reducers/userLogTimeEntries.reducer'
import authentication from 'core/reducers/authentication.reducer'
import projectIssues from 'core/reducers/projectIssues.reducer'
import projects from 'core/reducers/projects.reducer'
import globalActivities from 'core/reducers/globalActivities.reducer'
import user from 'core/reducers/user.reducer'

export default combineReducers({
  projectIssues,
  projects,
  globalActivities,
  authentication,
  user,
  userLogTimeEntries
})
