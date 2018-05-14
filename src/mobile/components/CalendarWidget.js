import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

export default class CalendarWidget extends Component<Props> {
  render() {
    return (
      <View>
        <Calendar theme={themes.overrides} />
      </View>
    )
  }
}

const themes = {
  overrides: {
    backgroundColor: '#38324e',
    calendarBackground: '#38324e',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#ffffff',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#ffffff',
    dayTextColor: '#ffffff',
    textDisabledColor: '#d9e1e8',
    dotColor: '#ffffff',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    monthTextColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textMonthFontWeight: 'bold',
    textDayFontSize: 16,
    textMonthFontSize: 24,
    textDayHeaderFontSize: 16
  }
}
