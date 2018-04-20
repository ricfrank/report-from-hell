import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

export default class CalendarWidget extends Component<Props> {
  render() {
    return (
      <View>
        <Calendar />
      </View>
    )
  }
}
