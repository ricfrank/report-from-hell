import moment from 'moment'
import {
  NOT_BILLABLE_PROJECT_IDS,
  HOLIDAY_ISSUE_IDS,
  mandatoryDailyWorkHours
} from './constants'

export const isBrowser = () => typeof document !== 'undefined'
export const isReactNative = () =>
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative'

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

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const calculateFirstDayOfVisibleDates = date => {
  const firstDay = moment(date).startOf('month')

  switch (days[firstDay.weekday()]) {
    case 'Sunday':
      return firstDay.subtract(6, 'days').format('YYYY-MM-DD')
    case 'Monday':
      return firstDay.format('YYYY-MM-DD')
    case 'Tuesday':
      return firstDay.subtract(1, 'days').format('YYYY-MM-DD')
    case 'Wednesday':
      return firstDay.subtract(2, 'days').format('YYYY-MM-DD')
    case 'Thursday':
      return firstDay.subtract(3, 'days').format('YYYY-MM-DD')
    case 'Friday':
      return firstDay.subtract(4, 'days').format('YYYY-MM-DD')
    case 'Saturday':
      return firstDay.subtract(5, 'days').format('YYYY-MM-DD')
  }
}

export const calculateLastDayOfVisibleDates = date => {
  const lastDay = moment(date).endOf('month')

  switch (days[lastDay.weekday()]) {
    case 'Sunday':
      return lastDay.format('YYYY-MM-DD')
    case 'Monday':
      return lastDay.add(6, 'days').format('YYYY-MM-DD')
    case 'Tuesday':
      return lastDay.add(5, 'days').format('YYYY-MM-DD')
    case 'Wednesday':
      return lastDay.add(4, 'days').format('YYYY-MM-DD')
    case 'Thursday':
      return lastDay.add(3, 'days').format('YYYY-MM-DD')
    case 'Friday':
      return lastDay.add(2, 'days').format('YYYY-MM-DD')
    case 'Saturday':
      return lastDay.add(1, 'days').format('YYYY-MM-DD')
  }
}

const isHolidayEntry = issueId => {
  return HOLIDAY_ISSUE_IDS.includes(issueId)
}

const isBillableEntry = projectId => {
  return !NOT_BILLABLE_PROJECT_IDS.includes(projectId)
}

const hasMissingHours = (total, base) => {
  return total < base
}

const getBillableAndTotalHours = entries => {
  let billable = 0
  let total = 0
  for (let entry of entries) {
    if (isBillableEntry(entry.projectId)) {
      billable += entry.hours
    }
    total += entry.hours
  }

  return {
    billable,
    total
  }
}

const calculateHourPercentage = (billable, base) => {
  return billable / base
}

const isGood = percentage => {
  return percentage >= 0.8
}

const isWarning = percentage => {
  return percentage >= 0.6 && percentage < 0.8
}

const isBad = percentage => {
  return percentage < 0.6
}

export const colorize = dayEntries => {
  if (isHolidayEntry(dayEntries[0].issue.id)) {
    return 'purple'
  }

  const { billable, total } = getBillableAndTotalHours(dayEntries)

  if (hasMissingHours(total, mandatoryDailyWorkHours)) {
    return 'red'
  }

  const percentage = calculateHourPercentage(billable, mandatoryDailyWorkHours)

  if (isGood(percentage)) {
    return 'green'
  }

  if (isWarning(percentage)) {
    return 'yellow'
  }

  if (isBad(percentage)) {
    return 'orange'
  }
}
