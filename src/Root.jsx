import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import ProjectIssuesList from './pages/ProjectIssuesList.jsx';

const Root = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/issues/:projectId" component={ProjectIssuesList} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
});

const NotFound = () => <h1>404.. This page is not found!</h1>;

export default Root;
