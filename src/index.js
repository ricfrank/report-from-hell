import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import userLogTimeEntries from 'src/reducers/userLogTimeEntries.reducer'
import authentication from 'src/reducers/authentication.reducer'
import projectIssues from 'src/reducers/projectIssues.reducer'
import projects from 'src/reducers/projects.reducer'
import user from 'src/reducers/user.reducer'
import Root from './Root.jsx'
import styles from './assets/custom.css'

const reducers = combineReducers({
  projectIssues,
  projects,
  authentication,
  user,
  userLogTimeEntries
})

const loggerMiddleware = createLogger({
  collapsed: true
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(loggerMiddleware))
)

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('report-from-hell-container')
)
