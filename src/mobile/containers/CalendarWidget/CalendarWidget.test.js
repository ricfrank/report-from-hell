/**
 * @jest-environment jsdom
 */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { CalendarWidget } from './CalendarWidget'

jest.mock('View', () => 'view')
jest.mock('Text', () => 'text')

describe('CalendarWidget', () => {
  test('should render without crashing', () => {
    shallow(
      <CalendarWidget
        currentTime={new Date()}
        user={{}}
        userLogTimeEntries={[]}
      />
    )
  })

  test('should change NewLogButton icon when NewLogButton is pressed', () => {
    const wrapper = shallow(
      <CalendarWidget
        currentTime={new Date()}
        user={{}}
        userLogTimeEntries={[]}
      />
    )
    expect(wrapper.find('NewLogButton').props().pressed).toBe(false)

    wrapper.find('NewLogButton').simulate('press')
    expect(wrapper.find('NewLogButton').props().pressed).toBe(true)
  })

  test('should highlight any day that is clicked', () => {
    const wrapper = mount(
      <CalendarWidget
        currentTime={new Date()}
        user={{}}
        userLogTimeEntries={[]}
      />
    )
    const datestring = '2018-06-25'

    const bgColorBefore = wrapper.find('Calendar').props().theme
      .selectedDayBackgroundColor
    wrapper
      .find('Calendar')
      .find('Day')
      .at(0)
      .props()
      .onPress(datestring)

    const bgColorAfter = wrapper.state('markedDates')[datestring].selectedColor

    expect(bgColorBefore).not.toBe(bgColorAfter)
  })

  test('should display visual info about log entries for any day that is clicked', () => {
    const datestring = '2018-06-25'
    const wrapper = mount(
      <CalendarWidget
        currentTime={'2018-07-10'}
        user={{}}
        userLogTimeEntries={[]}
      />
    )

    expect(wrapper.find('DayInfo').length).toBe(0)

    wrapper
      .find('Calendar')
      .find('Day')
      .at(0)
      .props()
      .onPress(datestring)

    wrapper.update()

    expect(wrapper.find('DayInfo').length).toBe(1)
  })

  test('should display different colors according to how many hours someone worked daily', () => {
    const wrapper = mount(
      <CalendarWidget
        currentTime={'2018-07-10'}
        user={{}}
        userLogTimeEntries={[
          {
            id: 40807,
            activityId: 9,
            projectId: 4,
            projectName: 'ideato office',
            issue: {
              id: 11297,
              subject: 'Academy - formazione interna'
            },
            hours: 8,
            comments: 'Outatime app',
            spentOn: '2018-08-10'
          },
          {
            id: 40811,
            activityId: 9,
            projectId: 208,
            projectName: 'Wally',
            issue: {
              id: 12863,
              subject: 'Attività progetto eidoo'
            },
            hours: 4,
            comments: '',
            spentOn: '2018-08-09'
          },
          {
            id: 40810,
            activityId: 9,
            projectId: 208,
            projectName: 'Wally',
            issue: {
              id: 12863,
              subject: 'Attività progetto eidoo'
            },
            hours: 4,
            comments: '',
            spentOn: '2018-08-08'
          },
          {
            id: 40809,
            activityId: 9,
            projectId: 4,
            projectName: 'Wally',
            issue: {
              id: 11297,
              subject: 'Academy - formazione interna'
            },
            hours: 4,
            comments: 'Outatime app',
            spentOn: '2018-08-08'
          }
        ]}
      />
    )

    // console.log(wrapper.props())
  })

  test('should keep track of the start and end of the current visible dates', () => {
    const wrapper = mount(
      <CalendarWidget
        currentTime={new Date()}
        user={{}}
        userLogTimeEntries={[]}
      />
    )

    expect(wrapper.state().startOfVisibleDates).toBe(
      wrapper
        .find('Day')
        .first()
        .props().date.dateString
    )
    expect(wrapper.state().endOfVisibleDates).toBe(
      wrapper
        .find('Day')
        .last()
        .props().date.dateString
    )

    const wrapperNextMonth = mount(
      <CalendarWidget
        currentTime={new Date(new Date().setMonth(new Date().getMonth() + 1))}
        user={{}}
        userLogTimeEntries={[]}
      />
    )

    expect(wrapperNextMonth.state().startOfVisibleDates).toBe(
      wrapperNextMonth
        .find('Day')
        .first()
        .props().date.dateString
    )
    expect(wrapperNextMonth.state().endOfVisibleDates).toBe(
      wrapperNextMonth
        .find('Day')
        .last()
        .props().date.dateString
    )
  })
})
