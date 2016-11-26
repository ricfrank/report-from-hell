import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import ProjectIssuesList from './ProjectIssuesList.jsx'

const App = React.createClass({
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/issues' component={ProjectIssuesList} />
                <Route path='*' component={NotFound} />
            </Router>
        )
    }
});

const NotFound = () => (
    <h1>404.. This page is not found!</h1>
);

export default App


