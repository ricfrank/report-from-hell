import React from 'react'
import { shallow } from 'enzyme'
import PieChart from './PieChart'

describe('NewLogButton', () => {
  const onPress = jest.fn()
  test('should render without crashing', () => {
    shallow(<PieChart />)
  })

  test('should contain the correct Icon', () => {
    const wrapper = shallow(<PieChart />)

    expect(wrapper.find('Icon').props().name).toBe('pie-chart')
  })
})
