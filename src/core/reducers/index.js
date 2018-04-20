import { combineReducers } from 'redux'
import userLogTimeEntries from './userLogTimeEntries.reducer'
import authentication from './authentication.reducer'
import projectIssues from './projectIssues.reducer'
import projects from './projects.reducer'
import globalActivities from './globalActivities.reducer'
import user from './user.reducer'

export default combineReducers({
  projectIssues,
  projects,
  globalActivities,
  authentication,
  user,
  userLogTimeEntries
})
