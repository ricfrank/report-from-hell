import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Arrow from './Arrow'

export default class CalendarWidget extends Component {
  render() {
    return (
      <View>
        <Calendar
          theme={themes.overrides}
          firstDay={1}
          renderArrow={direction => <Arrow direction={direction} />}
        />
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
    textDayFontSize: 14,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 9
  }
}
