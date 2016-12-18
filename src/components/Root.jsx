import React from 'react'
import {Router, Route, hashHistory} from 'react-router'
import App from './containers/App.jsx'

const Root = React.createClass({
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App} />
                <Route path='*' component={NotFound} />
            </Router>
        )
    }
});

const NotFound = () => (
    <h1>404.. This page is not found!</h1>
);

export default Root


