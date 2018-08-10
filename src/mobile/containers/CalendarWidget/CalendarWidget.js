import React, { Component } from 'react'
import { ScrollView, Platform } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { getUserLogTimeEntries } from '../../../core/actions'
import Header from '../../components/Header'
import NewLogButton from '../../components/NewLogButton'
import Padding from '../../components/Padding'
import LatestLogs from '../../components/LatestLogs'
import DayInfo from '../../components/DayInfo'
import Arrow from '../../components/Arrow'
import {
  calculateFirstDayOfVisibleDates,
  calculateLastDayOfVisibleDates
} from '../../../core/utils'

export class CalendarWidget extends Component {
  state = {
    currentMonth: new Date().getMonth() % 12 + 1,
    startOfVisibleDates: calculateFirstDayOfVisibleDates(
      this.props.currentTime
    ),
    endOfVisibleDates: calculateLastDayOfVisibleDates(this.props.currentTime),
    selectedDay: {},
    newLogPressed: false,
    markedDates: null
  }

  getUserLogTimeEntries() {
    const logEntries = {}
    for (let log of this.props.userLogTimeEntries) {
      logEntries[log.spentOn] = {
        customStyles: {
          container: {
            backgroundColor: 'red'
          },
          text: {
            color: 'white'
          }
        }
      }
    }

    return logEntries
  }

  highlightSelectedDay(day) {
    const logEntries = this.getUserLogTimeEntries()
    logEntries[day.dateString] = {
      customStyles: {
        container: {
          backgroundColor: 'blue'
        },
        text: {
          color: 'white'
        }
      }
    }

    this.setState({
      markedDates: logEntries,
      selectedDay: {
        name: moment(day.dateString).format('dddd'),
        date: day.day,
        logs: this.props.userLogTimeEntries.filter(
          log => log.spentOn === day.dateString
        )
      }
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
            this.setState(
              {
                startOfVisibleDates: calculateFirstDayOfVisibleDates(
                  month.dateString
                ),
                endOfVisibleDates: calculateLastDayOfVisibleDates(
                  month.dateString
                )
              },
              () => {
                this.props.getUserLogTimeEntries(this.props.user.id, {
                  start: this.state.startOfVisibleDates,
                  finish: this.state.endOfVisibleDates
                })
              }
            )
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
          markingType={'custom'}
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
          <Padding>
            <LatestLogs logs={this.props.userLogTimeEntries} />
          </Padding>
        )}
        {!isEmpty(this.state.selectedDay) &&
          !this.state.newLogPressed && (
            <Padding>
              <DayInfo day={this.state.selectedDay} />
            </Padding>
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
    return null
  }
  if (!isEmpty(state.userLogTimeEntries.error)) {
    alert(
      state.user.userLogTimeEntries.data +
        '\n' +
        state.user.userLogTimeEntries.status +
        '\n'
    )
    return null
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

export default connect(mapStateToProps, { getUserLogTimeEntries })(
  CalendarWidget
)
