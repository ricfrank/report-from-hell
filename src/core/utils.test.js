import {
  prevMonth,
  nextMonth,
  calculateFirstDayOfVisibleDates,
  calculateLastDayOfVisibleDates,
  colorize
} from './utils'

describe('utils', () => {
  describe('prevMonth', () => {
    test('should calculate correctly previous month', () => {
      const currentMonthIndex = 12

      expect(prevMonth(currentMonthIndex)).toBe('NOV')

      const currentMonthIndex2 = 1

      expect(prevMonth(currentMonthIndex2)).toBe('DEC')

      const currentMonthIndex3 = 2

      expect(prevMonth(currentMonthIndex3)).toBe('JAN')
    })
  })

  describe('nextMonth', () => {
    test('should calculate correctly next month', () => {
      const currentMonthIndex = 12

      expect(nextMonth(currentMonthIndex)).toBe('JAN')

      const currentMonthIndex2 = 1

      expect(nextMonth(currentMonthIndex2)).toBe('FEB')

      const currentMonthIndex3 = 2

      expect(nextMonth(currentMonthIndex3)).toBe('MAR')
    })
  })

  describe('calculateFirstDayOfVisibleDates', () => {
    test('should calculate the first day of the visible calendar', () => {
      const currentDate = '2018-07-20'

      expect(calculateFirstDayOfVisibleDates(currentDate)).toBe('2018-06-25')

      const currentDateNextMonth = '2018-08-20'

      expect(calculateFirstDayOfVisibleDates(currentDateNextMonth)).toBe(
        '2018-07-30'
      )
    })

    test('should calculate the last day of the visible calendar', () => {
      const currentDate = '2018-07-20'

      expect(calculateLastDayOfVisibleDates(currentDate)).toBe('2018-08-05')

      const currentDateNextMonth = '2018-08-20'

      expect(calculateLastDayOfVisibleDates(currentDateNextMonth)).toBe(
        '2018-09-02'
      )
    })
  })

  describe('colorize', () => {
    test('should give us green if billable hours are more than 80% of daily hours', () => {
      const entries = [
        {
          id: 40810,
          activityId: 9,
          projectId: 208,
          projectName: 'Wally',
          issue: {
            id: 12863,
            subject: 'Attività progetto eidoo'
          },
          hours: 8,
          comments: '',
          spentOn: '2018-08-08'
        }
      ]

      expect(colorize(entries)).toBe('green')
    })

    test('should give us yellow if billable hours are more than 60% and less than 80% of daily hours', () => {
      const entries = [
        {
          id: 40807,
          activityId: 9,
          projectId: 4,
          projectName: 'ideato office',
          issue: {
            id: 11297,
            subject: 'Academy - formazione interna'
          },
          hours: 2,
          comments: 'Outatime app',
          spentOn: '2018-08-08'
        },
        {
          id: 40810,
          activityId: 9,
          projectId: 208,
          projectName: 'Wally',
          issue: {
            id: 12863,
            subject: 'Attività progetto eidoo'
          },
          hours: 6,
          comments: '',
          spentOn: '2018-08-08'
        }
      ]

      expect(colorize(entries)).toBe('yellow')
    })

    test('should give us orange if daily work hours are more than 60% of daily hours', () => {
      const entries = [
        {
          id: 40807,
          activityId: 9,
          projectId: 4,
          projectName: 'ideato office',
          issue: {
            id: 11297,
            subject: 'Academy - formazione interna'
          },
          hours: 6,
          comments: 'Outatime app',
          spentOn: '2018-08-08'
        },
        {
          id: 40810,
          activityId: 9,
          projectId: 208,
          projectName: 'Wally',
          issue: {
            id: 12863,
            subject: 'Attività progetto eidoo'
          },
          hours: 2,
          comments: '',
          spentOn: '2018-08-08'
        }
      ]

      expect(colorize(entries)).toBe('orange')
    })

    test('should give us red if daily work hours are less than 8', () => {
      const entries = [
        {
          id: 40807,
          activityId: 9,
          projectId: 4,
          projectName: 'ideato office',
          issue: {
            id: 11297,
            subject: 'Academy - formazione interna'
          },
          hours: 2,
          comments: 'Outatime app',
          spentOn: '2018-08-08'
        },
        {
          id: 40810,
          activityId: 9,
          projectId: 208,
          projectName: 'Wally',
          issue: {
            id: 12863,
            subject: 'Attività progetto eidoo'
          },
          hours: 3,
          comments: '',
          spentOn: '2018-08-08'
        }
      ]

      expect(colorize(entries)).toBe('red')
    })

    test('should give us purple for vacation', () => {
      const entries = [
        {
          id: 40884,
          activityId: 9,
          projectId: 4,
          projectName: 'ideato office',
          issue: {
            id: 12362,
            subject: 'Permessi e ferie'
          },
          hours: 8,
          comments: 'Ferie',
          spentOn: '2018-08-17'
        }
      ]

      expect(colorize(entries)).toBe('purple')
    })
  })
})
