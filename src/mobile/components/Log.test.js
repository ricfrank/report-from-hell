import React from 'react'
import { shallow } from 'enzyme'
import Log from './Log'

describe('LatestLogs', () => {
  test('should render without crashing', () => {
    shallow(
      <Log
        log={{
          projectName: 'ideato office',
          issue: {
            subject: 'Academy - formazione interna'
          },
          comments: 'Outatime app'
        }}
      />
    )
  })
})
