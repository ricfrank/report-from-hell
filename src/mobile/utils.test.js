import { prevMonth, nextMonth } from './utils'

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
})
