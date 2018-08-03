/**
 * @jest-environment jsdom
 */
import React from 'react'
import { shallow, mount } from 'enzyme'
import DayInfoHeader from './DayInfoHeader'

describe('DayInfoHeader', () => {
  test('should render without crashing', () => {
    shallow(<DayInfoHeader name={'Wednesday'} date={1} />)
  })

  describe('should display the necessary info', () => {
    const wrapper = mount(<DayInfoHeader name={'Wednesday'} date={1} />)

    test("like the selected day's name and date", () => {
      const text = wrapper.text()
      expect(text.match(/Wednesday/)).not.toBe(null)
      expect(text.match(/1/)).not.toBe(null)
    })
  })
})
