/**
 * @jest-environment jsdom
 */
import React from 'react'
import { shallow, mount } from 'enzyme'
import DayInfo from './DayInfo'

describe('DayInfo', () => {
  test('should render without crashing', () => {
    shallow(
      <DayInfo
        day={{
          name: 'Wednesday',
          date: 1
        }}
      />
    )
  })

  describe('should display the necessary components', () => {
    const wrapper = mount(
      <DayInfo
        day={{
          name: 'Wednesday',
          date: 1
        }}
      />
    )

    test('like DayInfoHeader', () => {
      expect(wrapper.find('DayInfoHeader').length).toBe(1)
    })

    test('like DayInfoLogs', () => {
      expect(wrapper.find('DayInfoLogs').length).toBe(1)
    })
  })
})
