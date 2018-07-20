import React from 'react'
import { shallow } from 'enzyme'
import { Authentication } from './Authentication'

describe('Authentication', () => {
  test('should render without crashing', () => {
    shallow(<Authentication />)
  })

  test('should send the api key when the send button is pressed', () => {
    const mockSend = jest.fn()
    const wrapper = shallow(<Authentication onApiKeySend={mockSend} />)

    wrapper.find('Button').simulate('press')

    expect(mockSend).toHaveBeenCalled()
  })

  test('should update the input text properly', () => {
    const mockChangeText = jest.fn()
    const wrapper = shallow(<Authentication onChangeText={mockChangeText} />)

    wrapper
      .find('TextInput')
      .props()
      .onChangeText('text')

    expect(mockChangeText).toHaveBeenCalled()
  })
})