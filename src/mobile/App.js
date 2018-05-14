import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../core/reducers'
import Root from './Root'

const loggerMiddleware = createLogger({
  collapsed: true
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
)

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
