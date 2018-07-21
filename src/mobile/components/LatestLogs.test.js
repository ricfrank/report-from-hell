import React from 'react'
import { shallow } from 'enzyme'
import LatestLogs from './LatestLogs'

describe('LatestLogs', () => {
  test('should render without crashing', () => {
    shallow(<LatestLogs logs={[]} />)
  })
})
