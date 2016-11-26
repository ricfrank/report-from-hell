import {createStore} from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import {render} from 'react-dom'
import {projectIssues} from './reducers'
import App from './components/App.jsx'

const store = createStore(projectIssues, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
