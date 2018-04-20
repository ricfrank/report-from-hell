import React, { Component } from 'react'
import { View } from 'react-native'
import CalendarWidget from './components/CalendarWidget'

export default class Root extends Component {
  render() {
    return (
      <View>
        <CalendarWidget />
      </View>
    )
  }
}
