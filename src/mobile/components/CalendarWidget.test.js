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
        currentTime={new Date(Date.now())}
        user={{}}
        userLogTimeEntries={[]}
      />
    )
  })

  test('should change NewLogButton icon when NewLogButton is pressed', () => {
    const wrapper = shallow(
      <CalendarWidget
        currentTime={new Date(Date.now())}
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
        currentTime={new Date(Date.now())}
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

  test('should keep track of the start and end of the current visible dates', () => {
    const wrapper = mount(
      <CalendarWidget
        currentTime={new Date(Date.now())}
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

    const currentTime = wrapper.prop('currentTime')
    const nextMonth = new Date(currentTime.setMonth(currentTime.getMonth() + 1))

    wrapper.setProps({
      currentTime: nextMonth
    })

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
  })
})
