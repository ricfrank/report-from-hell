import React, { Component } from 'react'
import { View, ScrollView, Platform } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import Header from './Header'
import NewLogButton from './NewLogButton'
import LatestLogs from './LatestLogs'
import Arrow from './Arrow'

export class CalendarWidget extends Component {
  state = {
    currentMonth: (new Date().getMonth() % 12) + 1,
    startOfVisibleDates: '2018-06-25',
    endOfVisibleDates: '2018-08-05',
    newLogPressed: false,
    markedDates: null
  }

  getUserLogTimeEntries() {
    const logEntries = {}
    for (let log of this.props.userLogTimeEntries) {
      logEntries[log.spentOn] = {
        selected: true,
        color: 'green',
        selectedColor: 'green'
      }
    }

    return logEntries
  }

  highlightSelectedDay(day) {
    const logEntries = this.getUserLogTimeEntries()
    logEntries[day.dateString] = {
      ...logEntries[day.dateString],
      selected: true,
      selectedColor: 'blue'
    }

    this.setState({
      markedDates: logEntries
    })
  }

  render() {
    return (
      <ScrollView>
        <Header name={this.props.user.fullName} />
        <Calendar
          current={this.props.currentTime}
          theme={themes.overrides}
          firstDay={1}
          onMonthChange={month => {
            console.log('month changed', month)
          }}
          disableMonthChange={true}
          onDayPress={day => {
            this.highlightSelectedDay(day)
          }}
          renderArrow={direction => (
            <Arrow
              direction={direction}
              currentMonth={this.state.currentMonth}
            />
          )}
          onPressArrowLeft={substractMonth => {
            substractMonth()
            this.setState({
              currentMonth:
                this.state.currentMonth === 1
                  ? this.state.currentMonth + 11
                  : this.state.currentMonth - 1
            })
          }}
          onPressArrowRight={addMonth => {
            addMonth()
            this.setState({
              currentMonth:
                this.state.currentMonth === 12
                  ? this.state.currentMonth - 11
                  : this.state.currentMonth + 1
            })
          }}
          markedDates={
            !this.state.markedDates
              ? this.getUserLogTimeEntries()
              : this.state.markedDates
          }
        />
        <NewLogButton
          onPress={() => {
            this.setState({
              newLogPressed: !this.state.newLogPressed
            })
          }}
          pressed={this.state.newLogPressed}
        />
        {this.state.newLogPressed && (
          <View style={{ padding: 32 }}>
            <LatestLogs logs={this.props.userLogTimeEntries} />
          </View>
        )}
      </ScrollView>
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
    dotColor: 'transparent',
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
      base: {
        width: 32,
        height: 32,
        alignItems: 'center'
      },
      text: {
        marginTop: Platform.OS === 'android' ? 6 : 8,
        color: '#FAFAFA',
        borderRadius: 16
      },
      alignedText: {},
      today: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F13153',
        borderRadius: 16
      },
      todayText: {
        marginTop: Platform.OS === 'android' ? 5 : 7,
        color: '#F13153'
      }
    }
  }
}

const mapStateToProps = state => {
  if (!isEmpty(state.user.error)) {
    alert(state.user.error.data + '\n' + state.user.error.status + '\n')
    return
  }
  if (!isEmpty(state.userLogTimeEntries.error)) {
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
    loggedTimeEntryId: state.projectIssues.loggedTimeEntryId,
    currentTime: '' // workaround due to lib bug: check issues for current
  }
}

export default connect(
  mapStateToProps,
  null
)(CalendarWidget)
