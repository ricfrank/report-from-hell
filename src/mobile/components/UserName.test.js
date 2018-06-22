import React from 'react'
import { shallow, mount } from 'enzyme'
import UserName from './UserName'

describe('UserName', () => {
  test('should render without crashing', () => {
    shallow(<UserName />)
  })
})
