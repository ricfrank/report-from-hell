import {
  transformToMultipleDailyLogEntries,
  transformToMarkedDatesWithAppropriateColors
} from './helpers'

describe('transformToMultipleDailyLogEntries', () => {
  test('should enable multiple entries per day', () => {
    const entries = [
      {
        projectId: 4,
        issue: {
          id: 11297
        },
        hours: 2,
        spentOn: '2018-08-08'
      },
      {
        projectId: 208,
        issue: {
          id: 12863
        },
        hours: 6,
        spentOn: '2018-08-08'
      },
      {
        projectId: 208,
        issue: {
          id: 12863
        },
        hours: 8,
        spentOn: '2018-08-07'
      }
    ]

    expect(transformToMultipleDailyLogEntries(entries)).toEqual({
      '2018-08-08': [
        {
          projectId: 4,
          issue: {
            id: 11297
          },
          hours: 2,
          spentOn: '2018-08-08'
        },
        {
          projectId: 208,
          issue: {
            id: 12863
          },
          hours: 6,
          spentOn: '2018-08-08'
        }
      ],
      '2018-08-07': [
        {
          projectId: 208,
          issue: {
            id: 12863
          },
          hours: 8,
          spentOn: '2018-08-07'
        }
      ]
    })
  })
})

describe('transformToMarkedDatesWithAppropriateColors', () => {
  test('should colorize appropriately the marked dates', () => {
    const entries = [
      {
        projectId: 4,
        issue: {
          id: 11297
        },
        hours: 2,
        spentOn: '2018-08-08'
      },
      {
        projectId: 208,
        issue: {
          id: 12863
        },
        hours: 6,
        spentOn: '2018-08-08'
      },
      {
        projectId: 208,
        issue: {
          id: 12863
        },
        hours: 8,
        spentOn: '2018-08-07'
      }
    ]

    const multipleDayEntries = transformToMultipleDailyLogEntries(entries)

    expect(
      transformToMarkedDatesWithAppropriateColors(multipleDayEntries)
    ).toEqual({
      '2018-08-07': {
        customStyles: {
          container: {
            backgroundColor: 'transparent'
          },
          text: {
            color: 'green',
            fontWeight: 'bold'
          }
        }
      },
      '2018-08-08': {
        customStyles: {
          container: {
            backgroundColor: 'transparent'
          },
          text: {
            color: 'yellow',
            fontWeight: 'bold'
          }
        }
      }
    })
  })
})
