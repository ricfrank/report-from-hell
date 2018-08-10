import React from 'react'
import { View, StyleSheet } from 'react-native'
import DayInfoHeader from './DayInfoHeader'
import DayInfoLogs from './DayInfoLogs'

const DayInfo = ({ day: { name, date, logs } }) => (
  <View style={styles.wrapper}>
    <DayInfoHeader name={name} date={date} />
    <DayInfoLogs logs={logs} />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  }
})

export default DayInfo
