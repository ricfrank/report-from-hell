/**
 * @jest-environment jsdom
 */
import React from 'react'
import { shallow, mount } from 'enzyme'
import DayInfoLogs from './DayInfoLogs'

describe('DayInfoLogs', () => {
  test('should render without crashing', () => {
    shallow(
      <DayInfoLogs
        logs={[
          {
            id: 40618,
            activityId: 9,
            projectId: 4,
            projectName: 'ideato office',
            issue: {
              id: 11297,
              subject: 'Academy - formazione interna'
            },
            hours: 8,
            comments: 'Outatime app',
            spentOn: '2018-08-03'
          }
        ]}
      />
    )
  })

  describe('should display the necessary info', () => {
    const wrapper = mount(
      <DayInfoLogs
        logs={[
          {
            id: 40618,
            activityId: 9,
            projectId: 4,
            projectName: 'ideato office',
            issue: {
              id: 11297,
              subject: 'Academy - formazione interna'
            },
            hours: 8,
            comments: 'Outatime app',
            spentOn: '2018-08-03'
          }
        ]}
      />
    )

    test('like each log of the time logs for this day', () => {
      expect(wrapper.find('Log').length).toBe(1)
    })
  })
})
