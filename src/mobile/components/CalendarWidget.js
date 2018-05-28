import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import Arrow from './Arrow'

class CalendarWidget extends Component {
  getUserLogTimeEntries() {
    const logEntries = {}
    for (let log of this.props.userLogTimeEntries) {
      logEntries[log.spentOn] = { marked: true }
    }

    return logEntries
  }

  render() {
    return (
      <View>
        <Calendar
          theme={themes.overrides}
          firstDay={1}
          renderArrow={direction => <Arrow direction={direction} />}
          markedDates={this.getUserLogTimeEntries()}
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
    dayTextColor: '#FAFAFA',
    textDisabledColor: '#d9e1e8',
    dotColor: '#ffffff',
    selectedDotColor: '#ffffff',
    monthTextColor: '#ffffff',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textMonthFontWeight: 'bold',
    textDayFontSize: 14,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 9,
    'stylesheet.day.basic': {
      todayText: {
        color: '#F13153',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F13153',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
        paddingRight: 3
      }
    }
  }
}

const mapStateToProps = state => {
  if (!_.isEmpty(state.user.error)) {
    alert(state.user.error.data + '\n' + state.user.error.status + '\n')
    return
  }
  if (!_.isEmpty(state.userLogTimeEntries.error)) {
    alert(
      state.user.userLogTimeEntries.data +
        '\n' +
        state.user.userLogTimeEntries.status +
        '\n'
    )
    return
  }

  return {
    user: state.user,
    projects: state.projects,
    userLogTimeEntries: state.userLogTimeEntries,
    loggedIssueId: state.projectIssues.loggedIssueId,
    loggedTimeEntryId: state.projectIssues.loggedTimeEntryId
  }
}

export default connect(mapStateToProps, null)(CalendarWidget)
