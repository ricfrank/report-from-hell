import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  test('should render without crashing', () => {
    shallow(<Header name="Bob" />)
  })
})
