import React from 'react'
import { View, Text } from 'react-native'
import { prevMonth, nextMonth } from '../utils'

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
