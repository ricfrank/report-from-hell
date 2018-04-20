import React from 'react'
import {
  Router,
  Route,
  browserHistory,
  hashHistory,
  IndexRoute
} from 'react-router'
import App from 'web/App.jsx'
import Home from 'web/pages/Home.jsx'
import ProjectIssuesList from 'web/pages/ProjectIssuesList.jsx'
class Root extends React.Component {
  render() {
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
}

const NotFound = () => <h1>404.. This page is not found!</h1>

export default Root
