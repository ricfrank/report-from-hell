import React from 'react'
import {
  Router,
  Route,
  browserHistory,
  hashHistory,
  IndexRoute
} from 'react-router'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import ProjectIssuesList from './pages/ProjectIssuesList.jsx'

const Root = React.createClass({
  render() {
    console.log('IS_DESKTOP', IS_DESKTOP)
    return (
      <Router history={IS_DESKTOP === true ? hashHistory : browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/issues/:projectId" component={ProjectIssuesList} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    )
  }
})

const NotFound = () => <h1>404.. This page is not found!</h1>

export default Root
