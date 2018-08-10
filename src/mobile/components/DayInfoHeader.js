import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DayInfoHeader = ({ name, date }) => (
  <View styles={styles.wrapper}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.date}>{date}</Text>
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  name: {
    textAlign: 'center',
    fontSize: 12
  },
  date: {
    fontSize: 60,
    textAlign: 'center'
  }
})

export default DayInfoHeader
