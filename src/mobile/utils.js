export const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
]

export const prevMonth = () => monthNames[new Date().getMonth() % 12 - 1]
export const nextMonth = () => monthNames[new Date().getMonth() % 12 + 1]
