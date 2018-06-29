import React from 'react'
import { shallow } from 'enzyme'
import { CalendarWidget } from './CalendarWidget'

describe('CalendarWidget', () => {
  test('should render without crashing', () => {
    shallow(
      <CalendarWidget user={{ firstName: 'Bob' }} userLogTimeEntries={[]} />
    )
  })

  test('should change NewLogButton icon when NewLogButton is pressed', () => {
    const wrapper = shallow(
      <CalendarWidget user={{ firstName: 'Bob' }} userLogTimeEntries={[]} />
    )
    expect(wrapper.find('NewLogButton').props().pressed).toBe(false)

    wrapper.find('NewLogButton').simulate('press')
    expect(wrapper.find('NewLogButton').props().pressed).toBe(true)
  })
})
