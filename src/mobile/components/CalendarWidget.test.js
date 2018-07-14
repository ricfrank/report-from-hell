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
    shallow(<CalendarWidget user={{}} userLogTimeEntries={[]} />)
  })

  test('should change NewLogButton icon when NewLogButton is pressed', () => {
    const wrapper = shallow(
      <CalendarWidget user={{}} userLogTimeEntries={[]} />
    )
    expect(wrapper.find('NewLogButton').props().pressed).toBe(false)

    wrapper.find('NewLogButton').simulate('press')
    expect(wrapper.find('NewLogButton').props().pressed).toBe(true)
  })

  test('should highlight any day that is clicked', () => {
    const wrapper = mount(<CalendarWidget user={{}} userLogTimeEntries={[]} />)
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
})
