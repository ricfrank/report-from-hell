import { colorize } from '../../../core/utils'

export const transformToMultipleDailyLogEntries = entries => {
  const newEntries = {}
  for (let entry of entries) {
    if (!newEntries[entry.spentOn]) {
      newEntries[entry.spentOn] = []
    }
    newEntries[entry.spentOn].push(entry)
  }

  return newEntries
}

export const transformToMarkedDatesWithAppropriateColors = multipleDayEntries => {
  const newEntries = {}
  for (let spentOn in multipleDayEntries) {
    newEntries[spentOn] = {
      customStyles: {
        container: {
          backgroundColor: 'transparent'
        },
        text: {
          color: colorize(multipleDayEntries[spentOn]),
          fontWeight: 'bold'
        }
      }
    }
  }

  return newEntries
}
