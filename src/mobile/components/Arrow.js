import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { prevMonth, nextMonth } from '../utils'

const Arrow = props =>
  props.direction === 'left' ? (
    <View>
      <Text style={styles.arrow}>{prevMonth()}</Text>
    </View>
  ) : (
    <View>
      <Text style={styles.arrow}>{nextMonth()}</Text>
    </View>
  )

const styles = StyleSheet.create({
  arrow: {
    opacity: 0.6,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 40,
    textAlign: 'center'
  }
})

export default Arrow
