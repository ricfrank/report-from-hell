import React, { Component } from 'react'
import { View } from 'react-native'
import Authentication from './components/Authentication'
import CalendarWidget from './components/CalendarWidget'

export default class Root extends Component {
  render() {
    return (
      <View>
        <Authentication />
        <CalendarWidget />
      </View>
    )
  }
}
