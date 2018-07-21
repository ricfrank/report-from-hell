import React from 'react'
import { shallow } from 'enzyme'
import NewLogButton from './NewLogButton'

describe('NewLogButton', () => {
  const mockCallback = jest.fn()

  test('should render without crashing', () => {
    shallow(<NewLogButton onPress={mockCallback} pressed={false} />)
  })

  test('should contain an LinearGradient', () => {
    const wrapper = shallow(
      <NewLogButton onPress={mockCallback} pressed={false} />
    )

    expect(wrapper.find('LinearGradient')).toHaveLength(1)
  })

  test('should contain the correct Icon', () => {
    const wrapper = shallow(
      <NewLogButton onPress={mockCallback} pressed={false} />
    )

    expect(wrapper.find('Icon').props().name).toBe('ios-add')
  })

  test('should call the callback passed down when pressed', () => {
    const wrapper = shallow(
      <NewLogButton onPress={mockCallback} pressed={false} />
    )

    wrapper.find('TouchableOpacity').simulate('press')

    expect(mockCallback).toHaveBeenCalled()
  })
})
