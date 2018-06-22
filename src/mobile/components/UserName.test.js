import React from 'react'
import { shallow } from 'enzyme'
import UserName from './UserName'

jest.mock('Text', () => 'text')

describe('UserName', () => {
  test('should render without crashing', () => {
    shallow(<UserName name={'Bob'} />)
  })

  test('should contain an Icon', () => {
    const wrapper = shallow(<UserName name={'Bob'} />)

    expect(wrapper.find('Icon')).toHaveLength(1)
  })

  test('should print the user name', () => {
    const wrapper = shallow(<UserName name={'Bob'} />)

    expect(
      wrapper
        .find('text')
        .at(1)
        .html()
        .includes('Bob')
    ).toBe(true)
  })
})
