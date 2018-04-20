import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from 'core/reducers'
import Root from 'web/Root.jsx'
import styles from 'web/assets/custom.css'

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
