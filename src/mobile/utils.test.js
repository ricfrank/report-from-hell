import { monthNames, prevMonth, nextMonth } from './utils'

describe('utils', () => {
  describe('prevMonth', () => {
    test('should calculate correctly previous month', () => {
      const currentMonthIndex = new Date().getMonth()
      const currentMonthName = monthNames[currentMonthIndex]

      const previousMonthName = monthNames[currentMonthIndex - 1]
      expect(prevMonth()).toBe(previousMonthName)
    })
  })
  describe('nextMonth', () => {
    test('should calculate correctly next month', () => {
      const currentMonthIndex = new Date().getMonth()
      const currentMonthName = monthNames[currentMonthIndex]

      const nextMonthName = monthNames[currentMonthIndex + 1]
      expect(nextMonth()).toBe(nextMonthName)
    })
  })
})
