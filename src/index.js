import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {projectIssues} from './reducers'
import App from './components/App.jsx'
import {getProjectIssues} from './actions'
import thunk from 'redux-thunk'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

const store = createStore(
    projectIssues,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
store.dispatch(getProjectIssues());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('report-from-hell-container')
);
