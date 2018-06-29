import React from 'react'
import { shallow } from 'enzyme'
import NewLogButton from './NewLogButton'

describe('NewLogButton', () => {
  const onPress = jest.fn()
  test('should render without crashing', () => {
    shallow(<NewLogButton onPress={onPress} />)
  })

  test('should contain an LinearGradient', () => {
    const wrapper = shallow(<NewLogButton onPress={onPress} />)

    expect(wrapper.find('LinearGradient')).toHaveLength(1)
  })

  test('should contain the correct Icon', () => {
    const wrapper = shallow(<NewLogButton onPress={onPress} />)

    expect(wrapper.find('Icon').props().name).toBe('ios-add')
  })

  test('should change call a function when pressed', () => {
    const wrapper = shallow(<NewLogButton onPress={onPress} />)

    wrapper.find('TouchableOpacity').simulate('press')

    expect(onPress).toHaveBeenCalled()
  })
})
