import {combineReducers, createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {projectIssues, projects} from './reducers'
import Root from './components/Root.jsx'
import {getProjectIssues, getProjects} from './actions'
import thunk from 'redux-thunk'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const reducers = combineReducers({
    projectIssues,
    projects
});


const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
// store.dispatch(getProjectIssues());
store.dispatch(getProjects());

render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('report-from-hell-container')
);
