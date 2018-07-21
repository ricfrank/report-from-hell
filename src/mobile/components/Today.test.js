import React from 'react'
import { shallow } from 'enzyme'
import Today from './Today'

jest.mock('Text', () => 'text')

describe('Today', () => {
  test('should render without crashing', () => {
    shallow(<Today />)
  })

  test('should contain the correct Text', () => {
    const wrapper = shallow(<Today />)

    expect(
      wrapper
        .find('text')
        .html()
        .includes('TODAY')
    ).toBe(true)
  })
})
