import React from 'react'
import { View, Text } from 'react-native'

const monthNames = [
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
const prevMonth = () => monthNames[new Date().getMonth() % 12 - 1]
const nextMonth = () => monthNames[new Date().getMonth() % 12 + 1]

const Arrow = props =>
  props.direction === 'left' ? (
    <View>
      <Text>{prevMonth()}</Text>
    </View>
  ) : (
    <View>
      <Text>{nextMonth()}</Text>
    </View>
  )

export default Arrow
