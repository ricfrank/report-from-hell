import {
  prevMonth,
  nextMonth,
  calculateFirstDayOfVisibleDates,
  calculateLastDayOfVisibleDates
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
})
