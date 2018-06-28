export const prevMonth = currentMonth => {
  switch (currentMonth) {
    case 1:
      return 'DEC'
    case 2:
      return 'JAN'
    case 3:
      return 'FEB'
    case 4:
      return 'MAR'
    case 5:
      return 'APR'
    case 6:
      return 'MAY'
    case 7:
      return 'JUN'
    case 8:
      return 'JUL'
    case 9:
      return 'AUG'
    case 10:
      return 'SEP'
    case 11:
      return 'OCT'
    case 12:
      return 'NOV'
  }
}
export const nextMonth = currentMonth => {
  switch (currentMonth) {
    case 1:
      return 'FEB'
    case 2:
      return 'MAR'
    case 3:
      return 'APR'
    case 4:
      return 'MAY'
    case 5:
      return 'JUN'
    case 6:
      return 'JUL'
    case 7:
      return 'AUG'
    case 8:
      return 'SEP'
    case 9:
      return 'OCT'
    case 10:
      return 'NOV'
    case 11:
      return 'DEC'
    case 12:
      return 'JAN'
  }
}
